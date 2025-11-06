<?php

namespace App\Http\Controllers;

use App\Models\HelpArticle;
use App\Models\Faq;
use App\Models\HelpRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SupportMail;

class HelpController extends Controller
{
    public function articles()
    {
        return response()->json(HelpArticle::latest()->take(6)->get());
    }

    public function faqs()
    {
        return response()->json(Faq::latest()->take(10)->get());
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'message' => 'required|string',
        ]);

        $helpRequest = HelpRequest::create($validated);

        // Get support email from DB or fallback
        $settings = applyMailSettings();
        $supportEmail = $settings['email.from'] ?? config('mail.from.address');
        $supportName  = $settings['email.name'] ?? config('mail.from.name');

        // Send notification to support team
        Mail::to($supportEmail)->send(
            new SupportMail($helpRequest, $supportName)
        );

        // (Optional) Send acknowledgment to user
        Mail::to($validated['email'])->send(
            new SupportMail($helpRequest, $supportName, true)
        );
        return response()->json(['message' => 'Help request submitted successfully.']);
    }
    public function articleBySlug($slug)
    {
        $article = HelpArticle::where('slug', $slug)->first();

        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }

        return response()->json([
            'title'      => $article->title,
            'content'    => $article->content,
            'slug'       => $article->slug,
            'updated_at' => $article->updated_at,
        ]);
    }
}
