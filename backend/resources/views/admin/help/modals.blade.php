<!-- Add Help Article Modal -->
<div class="modal fade" id="addHelpModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content radius-16 bg-base">
      <div class="modal-header py-16 px-24 border-0">
        <h5 class="modal-title">Add New Article</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-24">
        <form id="addHelpForm">
          @csrf
          <div class="mb-3">
            <label class="form-label fw-semibold">Title</label>
            <input type="text" class="form-control" id="helpTitle" placeholder="Enter title">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Slug</label>
            <input type="text" class="form-control" id="helpSlug" placeholder="Enter slug (optional)">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Summary</label>
            <textarea class="form-control" id="helpSummary" rows="2" placeholder="Enter summary"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Content</label>
            <textarea class="form-control" id="helpContent" rows="4" placeholder="Enter content"></textarea>
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Article</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Edit Help Article Modal -->
<div class="modal fade" id="editHelpModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content radius-16 bg-base">
      <div class="modal-header py-16 px-24 border-0">
        <h5 class="modal-title">Edit Article</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-24">
        <form id="editHelpForm" data-id="">
          @csrf
          @method('PUT')
          <div class="mb-3">
            <label class="form-label fw-semibold">Title</label>
            <input type="text" class="form-control" id="editHelpTitle">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Slug</label>
            <input type="text" class="form-control" id="editHelpSlug">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Summary</label>
            <textarea class="form-control" id="editHelpSummary" rows="2"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Content</label>
            <textarea class="form-control" id="editHelpContent" rows="4"></textarea>
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Update Article</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


@section('script')
<script>
$(document).ready(function() {

    function showFlashMessage(message, isSuccess = true) {
        $('#ajax-flash-text').text(message);
        $('#ajax-flash-message')
            .removeClass('d-none alert-success alert-danger')
            .addClass(isSuccess ? 'alert-success' : 'alert-danger')
            .fadeIn();
        setTimeout(() => $('#ajax-flash-message').fadeOut(), 4000);
    }

    // Add Article
    $('#addHelpForm').submit(function(e){
        e.preventDefault();
        let title = $('#helpTitle').val().trim();
        let summary = $('#helpSummary').val().trim();
        let content = $('#helpContent').val().trim();
        let slug = $('#helpSlug').val().trim();
if (!slug) {
    slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}
        if (!title || !content) {
            showFlashMessage('Please fill in Title and Content.', false);
            return;
        }
        


        $.ajax({
            url: '{{ route("admin.help.store") }}',
            type: 'POST',
            data: {
                _token: '{{ csrf_token() }}',
                title: title,
                slug: slug,
                summary: summary,
                content: content
            },
            success: function(res) {
                showFlashMessage('Article added successfully.', true);
                setTimeout(() => location.reload(), 1500);
            },
            error: function(xhr) {
                let message = xhr.responseJSON?.message || 'Something went wrong.';
                showFlashMessage(message, false);
            }
        });
    });

    // Edit modal populate
    $('.edit-article').click(function(){
        let id = $(this).data('id');
        $('#editHelpForm').attr('data-id', id);
        $('#editHelpTitle').val($(this).data('title'));
        $('#editHelpSummary').val($(this).data('summary'));
        $('#editHelpContent').val($(this).data('content'));
    });

    // Update Article
    $('#editHelpForm').submit(function(e){
        e.preventDefault();
        let id = $(this).attr('data-id');
        let title = $('#editHelpTitle').val().trim();
        let slug = $('#editHelpSlug').val().trim();
        let summary = $('#editHelpSummary').val().trim();
        let content = $('#editHelpContent').val().trim();

        if (!title || !content) {
            showFlashMessage('Please fill in Title and Content.', false);
            return;
        }
        

        $.ajax({
            url: '/admin/help-articles/' + id,
            type: 'POST',
            data: {
                _token: '{{ csrf_token() }}',
                _method:'PUT',
                title: title,
                slug: slug,
                summary: summary,
                content: content
            },
            success: function(res){
                showFlashMessage('Article updated successfully.', true);
                $('#editHelpForm')[0].reset();
                $('#editHelpModal').modal('hide');
                setTimeout(() => location.reload(), 1500);
            },
            error: function(xhr){
                let msg = xhr.responseJSON?.message || 'Error updating article';
                showFlashMessage(msg, false);
            }
        });
    });

    // Delete Article
    $('.delete-article').click(function(){
        if(!confirm('Are you sure you want to delete this article?')) return;
        let id = $(this).data('id');

        $.ajax({
            url: '/admin/help-articles/' + id,
            type: 'DELETE',
            data: { _token: '{{ csrf_token() }}' },
            success: function(res){
                showFlashMessage('Article deleted successfully.', true);
                setTimeout(() => location.reload(), 1000);
            },
            error: function(xhr){
                let msg = xhr.responseJSON?.message || 'Error deleting article';
                showFlashMessage(msg, false);
            }
        });
    });
});
</script>
@endsection
