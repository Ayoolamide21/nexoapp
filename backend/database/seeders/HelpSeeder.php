<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HelpArticle;
use App\Models\Faq;


class HelpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HelpArticle::create([
            'title' => 'Account Statement',
            'summary' => 'Overview your transaction history and downloads.',
        ]);

        HelpArticle::create([
            'title' => 'Recover Your Account',
            'summary' => 'Lost access? Learn how to recover your account.',
        ]);

        HelpArticle::create([
            'title' => 'What is KYC?',
            'summary' => 'How to complete Know Your Customer verification.',
        ]);

        HelpArticle::create([
            'title' => 'Missing Crypto Transaction',
            'summary' => 'Steps to resolve missing funds issues.',
        ]);

        Faq::create([
            'question' => 'How can I withdraw my earnings?',
            'answer' => 'You can request withdrawal from your dashboard any time. It is processed in 24–48 hours.',
        ]);

        Faq::create([
            'question' => 'Is my capital safe?',
            'answer' => 'Yes. We use diversified portfolios, risk management tools, and industry-grade security to protect your funds.',
        ]);

        Faq::create([
            'question' => 'What’s the minimum amount to start?',
            'answer' => '$100',
        ]);

        Faq::create([
            'question' => 'Can I invest from any country?',
            'answer' => 'Yes. We are a global company with digital operations.',
        ]);
    }
}
