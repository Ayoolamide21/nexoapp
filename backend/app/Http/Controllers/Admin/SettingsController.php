<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\Language;
use App\Models\PaymentGateway;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;


class SettingsController extends Controller
{
    public function companySettings()
    {
        $data['page_title'] = 'Company Settings';
        $data['settings'] = Settings::where('group', 'app')->get();
        $data['currencies'] = Currency::all();

        return view('admin.settings.app_settings', compact('data'));
    }

    /**
     * Update settings dynamically.
     */
    public function updateSettings(Request $request)
    {
        $settings = Settings::where('group', 'app')->get()->keyBy('key');
        $requestData = $request->all();

        // Ensure unchecked booleans get false
        foreach ($settings as $key => $setting) {
            if ($setting->type === 'boolean' && !isset($requestData[$key])) {
                $requestData[$key] = false;
            }
        }

        foreach ($requestData as $key => $value) {
            if ($key === '_token') continue;

            $dbKey = preg_replace('/^app_/', 'app.', $key);

            if (!$settings->has($dbKey)) continue;

            $setting = $settings->get($dbKey);

            // Handle boolean type cast
            if ($setting->type === 'boolean') {
                $value = filter_var($value, FILTER_VALIDATE_BOOLEAN);
            }

            // Handle file uploads
            if ($request->hasFile($key)) {
                $file = $request->file($key);

                if ($file->isValid()) {
                    $folder = Str::contains($key, 'logo') ? 'logos' : 'images';
                    $filename = time() . '_' . $file->getClientOriginalName();

                    // Ensure folder exists
                    $destination = public_path('storage/' . $folder);
                    if (!file_exists($destination)) {
                        mkdir($destination, 0755, true);
                    }

                    $file->move($destination, $filename);
                    $value = '/public/storage/' . $folder . '/' . $filename;
                }
            }

            // Save setting
            $setting->value = $value;
            if ($setting->save()) {
                Cache::forget($dbKey);
            }
        }

        return back()->with('success', 'Settings updated successfully.');
    }



    /**
     * Update email settings.
     */

    public function emailSettings()
    {
        // Fetch email settings and keyBy 'key'

        $settings = Settings::where('group', 'email')->get()->keyBy('key');

        $data['email'] = [
            'mailer' => $settings['email.mailer']->value ?? '',
            'host' => $settings['email.host']->value ?? '',
            'port' => $settings['email.port']->value ?? '',
            'username' => $settings['email.username']->value ?? '',
            'password' => $settings['email.password']->value ?? '',
            'encryption' => $settings['email.encryption']->value ?? '',
            'from' => $settings['email.from']->value ?? '',
            'name' => $settings['email.name']->value ?? '',
        ];

        $data['page_title'] = 'Email Settings';

        return view('admin.settings.email_settings', compact('data'));
    }


    public function updateEmailSettings(Request $request)
    {
        $settings = Settings::where('group', 'email')->get()->keyBy('key');

        $requestData = $request->all();

        foreach ($requestData as $inputKey => $value) {
            if ($inputKey === '_token') {
                continue;
            }

            // Convert input names like email_host to email.host
            $settingKey = str_replace('_', '.', $inputKey);

            if ($settings->has($settingKey)) {
                $setting = $settings->get($settingKey);

                // If boolean type, cast properly (not typical for email settings, but good to keep)
                if ($setting->type === 'boolean') {
                    $value = filter_var($value, FILTER_VALIDATE_BOOLEAN);
                }

                $setting->value = $value;
                $saveResult = $setting->save();

                if ($saveResult) {
                    Cache::forget($settingKey);
                }
            }
        }

        return back()->with('success', 'Email settings updated successfully.');
    }

    public function gatewaySettings()
    {
        $data['gateways'] = PaymentGateway::all();
        $data['page_title'] = 'Payment Gateways';
        return view('admin.settings.gateway', compact('data'));
    }

    public function editGateway(PaymentGateway $gateway)
    {
        $data['page_title'] = 'Edit Payment Gateway';
        $data['gateway'] = $gateway;
        return view('admin.settings.gateway_edit', compact('data'));
    }

    public function updateGateway(Request $request, PaymentGateway $gateway)
    {
        // Validate the request
        $validated = $request->validate([
            'public_key' => 'nullable|string',
            'secret_key' => 'nullable|string',
            'status' => 'nullable|boolean',
            'environment' => 'required|in:sandbox,production,both',
            'currency' => 'required|string|max:10',
            'logo' => 'nullable|image|max:2048',
        ]);

        // Handle the 'status' checkbox manually if it's provided
        if ($request->has('status')) {
            $validated['status'] = $request->input('status') ? 1 : 0;
        }

        // Handle logo upload if provided
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('payment-logos', 'public');
            $validated['logo'] = $path;
        }

        // Update the gateway record in the database
        $gateway->update($validated);

        // If it's an AJAX request, return a JSON response
        if ($request->ajax()) {
            return response()->json(['success' => true]);
        }

        // Redirect back with success message
        return redirect()->route('admin.gateway.settings')->with('success', "{$gateway->name} payment gateway updated successfully.");
    }

    // Show all languages
    public function languageIndex()
    {
        $data['page_title'] = 'Languages';
        $data['languages'] = Language::orderBy('id', 'asc')->paginate(10);

        return view('admin.settings.language', compact('data'));
    }

    public function storeLanguage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:languages,code',
            'direction' => 'required|in:ltr,rtl',
        ]);

        $language = Language::create($validated);

        return response()->json([
            'success' => true,
            'message' => "{$language->name} added successfully.",
            'language' => $language
        ]);
    }


    public function updateLanguage(Request $request, Language $language)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'code' => 'sometimes|required|string|max:10|unique:languages,code,' . $language->id,
            'direction' => 'sometimes|required|in:ltr,rtl',
            'is_active' => 'nullable|boolean',
            'is_default' => 'nullable|boolean',
        ]);

        if ($request->has('is_default') && $request->is_default) {
            Language::where('is_default', true)->update(['is_default' => false]);
        }

        $language->update($validated);

        return response()->json([
            'success' => true,
            'message' => "{$language->name} updated successfully."
        ]);
    }

    public function deleteLanguage(Language $language)
    {
        if ($language->is_default) {
            return response()->json(['success' => false, 'message' => 'Cannot delete default language.'], 403);
        }

        $name = $language->name;
        $language->delete();

        return response()->json([
            'success' => true,
            'message' => "{$name} language deleted successfully."
        ]);
    }

    // Show all Currencies
    public function currencyIndex()
    {
        $data['page_title'] = 'Available Currencies';
        $data['currencies'] = Currency::orderBy('id', 'asc')->paginate(10);

        return view('admin.settings.currency', compact('data'));
    }

    public function storeCurrency(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:3',
            'symbol' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $currency = Currency::create($validated);

        return response()->json([
            'success' => true,
            'message' => "{$currency->name} added successfully.",
            'currency' => $currency
        ]);
    }


    public function updateCurrency(Request $request, Currency $currency)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'code' => 'sometimes|string|max:3',
            'symbol' => 'sometimes|string|max:255',
            'country' => 'sometimes|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        $currency->update($validated);

        return response()->json([
            'success' => true,
            'message' => "{$currency->name} updated successfully."
        ]);
    }

    public function deleteCurrency(Currency $currency)
    {

        $name = $currency->name;
        $currency->delete();

        return response()->json([
            'success' => true,
            'message' => "Currency {$name} deleted successfully."
        ]);
    }
}
