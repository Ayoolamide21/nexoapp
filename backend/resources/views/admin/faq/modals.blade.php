<!-- Add FAQ Modal -->
<div class="modal fade" id="addFaqModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content radius-16 bg-base">
      <div class="modal-header py-16 px-24 border-0">
        <h5 class="modal-title">Add New FAQ</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-24">
        <form id="addFaqForm">
          @csrf
          <div class="mb-3">
            <label class="form-label fw-semibold">Question</label>
            <input type="text" class="form-control" id="faqQuestion" placeholder="Enter question">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Answer</label>
            <textarea class="form-control" id="faqAnswer" rows="4" placeholder="Enter answer"></textarea>
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save FAQ</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Edit FAQ Modal -->
<div class="modal fade" id="editFaqModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content radius-16 bg-base">
      <div class="modal-header py-16 px-24 border-0">
        <h5 class="modal-title">Edit FAQ</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-24">
        <form id="editFaqForm" data-id="">
          @csrf
          @method('PUT')
          <div class="mb-3">
            <label class="form-label fw-semibold">Question</label>
            <input type="text" class="form-control" id="editFaqQuestion">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Answer</label>
            <textarea class="form-control" id="editFaqAnswer" rows="4"></textarea>
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Update FAQ</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
@section('script')
<script>
   function showFlashMessage(message, isSuccess = true) {
    $('#ajax-flash-text').text(message);
    $('#ajax-flash-message')
        .removeClass('d-none alert-success alert-danger')
        .addClass(isSuccess ? 'alert-success' : 'alert-danger')
        .fadeIn();

    setTimeout(() => $('#ajax-flash-message').fadeOut(), 4000);
}

$(document).ready(function() {

    // Add FAQ
    $('#addFaqForm').submit(function(e){
        e.preventDefault();
        let question = $('#faqQuestion').val().trim();
        let answer = $('#faqAnswer').val().trim();

        if (!question || !answer) {
            showFlashMessage('Please fill in both question and answer.', false);
            return;
        }

        $.ajax({
            url: '{{ route("admin.faq.store") }}',
            type: 'POST',
            data: {
                _token: '{{ csrf_token() }}',
                question: question,
                answer: answer
            },
            success: function(res) {
    showFlashMessage(res.message, true);
    setTimeout(() => location.reload(), 1500);
},
error: function(xhr) {
    let message = xhr.responseJSON?.message || 'Something went wrong.';
    showFlashMessage(message, false);
}
        });
    });

    // Edit modal populate
    $('.edit-faq').click(function(){
        let id = $(this).data('id');
        let question = $(this).data('question');
        let answer = $(this).data('answer');

        $('#editFaqForm').attr('data-id', id);
        $('#editFaqQuestion').val(question);
        $('#editFaqAnswer').val(answer);
    });

    // Update FAQ
    $('#editFaqForm').submit(function(e){
        e.preventDefault();
        let id = $(this).attr('data-id');
        let question = $('#editFaqQuestion').val().trim();
        let answer = $('#editFaqAnswer').val().trim();

        if (!question || !answer) {
            showFlashMessage('Please fill in both question and answer.', false);
            return;
        }

        $.ajax({
            url: '/admin/faqs/' + id,
            type: 'POST',
            data: {
                _token: '{{ csrf_token() }}',
                _method:'PUT',
                question: question,
                answer: answer
            },
            success: function(res){
                showFlashMessage(res.message, true);
                $('#editFaqForm')[0].reset();
                $('#editFaqModal').modal('hide');
                setTimeout(() => location.reload(), 1500);
            },
            error: function(xhr){
                let msg = xhr.responseJSON?.message || 'Error updating FAQ';
                showFlashMessage(msg, false);
            }
        });
    });

    // Delete FAQ
    $('.delete-faq').click(function(){
        if(!confirm('Are you sure you want to delete this FAQ?')) return;
        let id = $(this).data('id');

        $.ajax({
            url: '/admin/faqs/' + id,
            type: 'DELETE',
            data: { _token: '{{ csrf_token() }}' },
            success: function(res){
                showFlashMessage(res.message, true);
                setTimeout(() => location.reload(), 1000);
            },
            error: function(xhr){
                let msg = xhr.responseJSON?.message || 'Error deleting FAQ';
                showFlashMessage(msg, false);
            }
        });
    });

    // Flash Message Display Helper
    window.showFlashMessage = function(message, isSuccess) {
        let box = $('#ajax-flash-message');
        if (!box.length) {
            $('body').append('<div id="ajax-flash-message" class="alert position-fixed top-0 end-0 m-3 p-3" style="z-index:9999;"></div>');
            box = $('#ajax-flash-message');
        }
        box.removeClass('alert-success alert-danger d-none')
           .addClass(isSuccess ? 'alert-success' : 'alert-danger')
           .text(message)
           .fadeIn()
           .delay(2500)
           .fadeOut();
    };
});
</script>
@endsection
