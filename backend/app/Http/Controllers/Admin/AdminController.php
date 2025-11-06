<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Services\Admin\AdminDashboardService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;



class AdminController extends Controller
{
    protected AdminDashboardService $dashboardService;

    public function __construct(AdminDashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index(Request $request)
    {
        $data = $this->dashboardService->getDashboardData();
        $data['users'] = User::orderBy('created_at', 'desc')->paginate(5);

        $timeRange = $request->input('range', 'yearly');
        $chartData = $this->dashboardService->getEarningsAndWithdrawalsByRange($timeRange);

        $data['page_title'] = 'Admin Dashboard';

        return view('admin.home', compact('data', 'chartData', 'timeRange'));
    }

    public function userList(Request $request)
    {
        $data['page_title'] = 'User List';

        // Start query
        $query = User::orderBy('created_at', 'desc');

        // Search filter
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $status = $request->input('status');
            if (in_array($status, ['Active', 'Inactive'])) {
                $query->where('status', $status);
            }
        }

        // Rows per page (default to 5)
        $perPage = (int) $request->input('per_page', 10);
        if ($perPage < 1) {
            $perPage = 10;
        }

        // Paginate with query string preserved
        $data['users'] = $query->paginate($perPage)->withQueryString();
        
        return view('admin.userlist', compact('data'));
    }

    public function addUser(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'status' => 'required|in:Active,Inactive',
            'balance' => 'nullable|numeric',
            'loyalty_points' => 'nullable|integer',
        ]);

        User::create([
            'username' => $validated['username'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'status' => $validated['status'],
            'balance' => $validated['balance'] ?? 0,
            'loyalty_points' => $validated['loyalty_points'] ?? 0,
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'status' => 'required|in:Active,Inactive',
            'balance' => 'nullable|numeric',
            'loyalty_points' => 'nullable|integer',
        ]);

        $user->update($validated);

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }

}
