<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    public function run()
    {
        $languages = [
            ['code' => 'en', 'name' => 'English', 'direction' => 'ltr'],
            ['code' => 'fr', 'name' => 'French', 'direction' => 'ltr'],
            ['code' => 'es', 'name' => 'Spanish', 'direction' => 'ltr'],
            ['code' => 'de', 'name' => 'German', 'direction' => 'ltr'],
            ['code' => 'pt', 'name' => 'Portuguese', 'direction' => 'ltr'],
            ['code' => 'ar', 'name' => 'Arabic', 'direction' => 'rtl'],
            ['code' => 'zh', 'name' => 'Chinese', 'direction' => 'ltr'],
            ['code' => 'ru', 'name' => 'Russian', 'direction' => 'ltr'],
            ['code' => 'hi', 'name' => 'Hindi', 'direction' => 'ltr'],
        ];

        foreach ($languages as $language) {
            Language::updateOrCreate(['code' => $language['code']], $language);
        }
    }
}
