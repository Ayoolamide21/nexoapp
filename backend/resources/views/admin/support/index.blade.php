@extends('layouts.admin')
@section('title', $data['page_title'])

@section('content')
<div class="dashboard-main-body">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <!-- Page Heading -->
        <h6 class="fw-semibold mb-0">{{ $data['page_title'] }}</h6>
        <!-- Breadcrumb -->
        <ul class="d-flex align-items-center gap-2">
            <li class="fw-medium">
                <a href="" class="d-flex align-items-center gap-1 hover-text-primary">
                    <iconify-icon icon="solar:home-smile-angle-outline" class="icon text-lg"></iconify-icon>
                    Dashboard
                </a>
            </li>
            <li>-</li>
            <li class="fw-medium text-muted">{{ $data['page_title'] }}</li>
        </ul>
    </div>
<div class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name / Email</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Submitted At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach($data['requests'] as $request)
                    <tr>
                        <td>{{ $request->id }}</td>
                        <td>
                            {{ $request->name }}<br>
                            <small>{{ $request->email }}</small>
                        </td>
                        <td>{{ $request->message }}</td>
                        <td>
                            @if($request->status === 'replied')
                                <span class="badge bg-success">Replied</span>
                            @else
                                <span class="badge bg-warning">Pending</span>
                            @endif
                        </td>
                        <td>{{ $request->created_at->format('d M Y H:i') }}</td>
                        <td>
                            <!-- Reply Button triggers modal -->
                            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#replyModal{{ $request->id }}">
                                Reply
                            </button>

                            <!-- Reply Modal -->
                            <div class="modal fade" id="replyModal{{ $request->id }}" tabindex="-1" aria-labelledby="replyModalLabel{{ $request->id }}" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <form action="{{ route('admin.support.reply', $request->id) }}" method="POST">
                                    @csrf
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="replyModalLabel{{ $request->id }}">Reply to {{ $request->name }}</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <textarea name="message" class="form-control" rows="5" placeholder="Type your reply here..." required></textarea>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="submit" class="btn btn-primary">Send Reply</button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>

                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="mt-3">
        {{ $data['requests']->links() }}
    </div>
</div>
@endsection