<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Faq;
use App\Models\HelpArticle;
use App\Models\HelpRequest;
use Illuminate\Support\Facades\Mail;
use App\Mail\SupportMail;

class SomeController extends Controller
{
    // FAQ Methods
    public function index()
    {
        $faqs = Faq::latest()->paginate(10);
        $data['page_title'] = 'Manage FAQs';
        $data['faqs'] = $faqs;

        return view('admin.faq.index', compact('data'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $faq = Faq::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'FAQ added successfully.',
            'faq' => $faq
        ]);
    }

    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $faq->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'FAQ updated successfully.'
        ]);
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return response()->json([
            'success' => true,
            'message' => 'FAQ deleted successfully.'
        ]);
    }

    //Support Email

    public function supportIndex(){

        $requests = HelpRequest::latest()->paginate(10);
        $data['page_title'] = 'Support Requests';
        $data['requests'] = $requests;

        return view('admin.support.index', compact('data'));
    }
    public function supportReply(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $helpRequest = HelpRequest::findOrFail($id);

        $helpRequest->status = 'replied';
        $helpRequest->reply = $request->message;
        $helpRequest->save();

        $settings = applyMailSettings();
        $fromName = $settings['email.name'] ?? config('mail.from.name');

        Mail::to($helpRequest->email)->send(
            new SupportMail($helpRequest, $fromName, false, $request->message)
        );

        return redirect()->back()->with('success', 'Reply sent successfully.');
    }

    // Help Article Methods (Styled like FAQ methods)
    public function helpIndex()
    {
        $articles = HelpArticle::latest()->paginate(10);
        $data['page_title'] = 'Manage Help Articles';
        $data['articles'] = $articles;

        return view('admin.help.index', compact('data'));
    }

    public function helpStore(Request $request)
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'slug'    => 'nullable|string|max:255|unique:help_articles,slug',
            'summary' => 'nullable|string',
            'content' => 'required|string',
        ]);

        $article = HelpArticle::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Help Article added successfully.',
            'article' => $article
        ]);
    }

    public function helpUpdate(Request $request, HelpArticle $article)
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'summary' => 'nullable|string',
            'content' => 'required|string',
        ]);

        $article->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Help Article updated successfully.'
        ]);
    }

    public function helpDestroy(HelpArticle $article)
    {
        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Help Article deleted successfully.'
        ]);
    }


}
