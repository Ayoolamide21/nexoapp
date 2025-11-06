<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Transaction;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function planList(Request $request)
    {
        // Start query
        $query = Plan::orderBy('created_at', 'desc');

        // Search filter
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $status = $request->input('status');
            if (in_array($status, ['active', 'inactive'])) {
                $query->where('status', $status);
            }
        }

        // Rows per page (default to 5)
        $perPage = (int) $request->input('per_page', 10);
        if ($perPage < 1) {
            $perPage = 10;
        }

        // Paginate with query string preserved
        $data['plans'] = $query->paginate($perPage)->withQueryString();

        // Optional page title for breadcrumbs
        $data['page_title'] = 'Investment Plans';

        return view('admin.plan.index', compact('data'));
    }


    public function addPlan(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'min_amount' => 'required|numeric|min:0',
            'max_amount' => 'required|numeric|gte:min_amount',
            'description' => 'nullable|string',
            'profit_rate' => 'required|numeric',
            'profit_interval' => 'required|string',
            'duration' => 'required|integer',
            'category' => 'required|string',
            'status' => 'required|in:active,inactive',
        ]);

        Plan::create($validated);

        return back()->with('success', 'Plan created successfully.');
    }

    public function updatePlan(Request $request, Plan $plan)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'min_amount' => 'required|numeric|min:0',
            'max_amount' => 'required|numeric|gte:min_amount',
            'description' => 'nullable|string',
            'profit_rate' => 'required|numeric',
            'profit_interval' => 'required|string',
            'duration' => 'required|integer',
            'category' => 'required|string',
            'status' => 'required|in:active,inactive',
        ]);

        $plan->update($validated);

        return back()->with('success', 'Plan updated successfully.');
    }

    public function deletePlan(Plan $plan)
    {
        $plan->delete();

        return back()->with('success', 'Plan deleted successfully.');
    }

       public function userActivePlans(Request $request)
    {
        $query = Transaction::with('user', 'plan')
            ->where('type', 'purchase_plan')
            ->latest();

        // Optional: Search by user name or email
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $perPage = $request->input('per_page', 10);
        $data['investments'] = $query->paginate($perPage)->withQueryString();
        $data['page_title'] = 'Active Investment Plans';

        return view('admin.plan.active_plans', compact('data'));
    }

    public function deleteUserPlan($id)
    {
        $investment = Transaction::findOrFail($id);
        $investment->delete();

        return back()->with('success', 'User investment plan deleted successfully.');
    }

    public function updateUserPlan(Request $request, $id)
    {
        $investment = Transaction::findOrFail($id);

        $request->validate([
            'amount' => 'required|numeric|min:1',
            'status' => 'required|in:active,pending,completed,cancelled,locked',
        ]);

        $investment->update([
            'amount' => $request->amount,
            'status' => $request->status,
        ]);

        return back()->with('success', 'User investment plan updated successfully.');
    }
}
