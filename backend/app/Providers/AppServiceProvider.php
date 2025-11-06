<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Settings;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Site name
        $site_name = Cache::rememberForever('app.site_name', function () {
            return Settings::where('key', 'app.site_name')->value('value') ?? 'Default Site Name';
        });

        // Logos
        $logo = Cache::rememberForever('app.logo', function () {
            return Settings::where('key', 'app.logo')->value('value') ?? asset('assets/images/logo.png');
        });

        $logo_light = Cache::rememberForever('app.logo_light', function () {
            return Settings::where('key', 'app.logo_light')->value('value') ?? asset('assets/images/logo-light.png');
        });

        $logo_icon = Cache::rememberForever('app.logo_icon', function () {
            return Settings::where('key', 'app.logo_icon')->value('value') ?? asset('assets/images/logo-icon.png');
        });

        $favicon = Cache::rememberForever('app.favicon', function () {
            return Settings::where('key', 'app.favicon')->value('value') ?? asset('assets/images/favicon.ico');
        });

        // Share with all views
        View::share([
            'site_name'  => $site_name,
            'appLogo'    => $logo,
            'appLogoLight' => $logo_light,
            'appLogoIcon'  => $logo_icon,
            'appFavicon' => $favicon,
        ]);
    }
}
