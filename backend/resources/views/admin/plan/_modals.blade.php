<!-- Add Plan Modal -->
<div class="modal fade" id="addPlanModal" tabindex="-1" aria-labelledby="addPlanModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <form method="POST" action="{{ route('admin.plans.add') }}" class="modal-content">
      @csrf
      <div class="modal-header">
        <h5 class="modal-title" id="addPlanModalLabel">Add New Plan</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body row g-3">
        @include('admin.plan._form')
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Create Plan</button>
      </div>
    </form>
  </div>
</div>

<!-- Edit Plan Modal -->
<div class="modal fade" id="editPlanModal" tabindex="-1" aria-labelledby="editPlanModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <form method="POST" action="admin.plans.update" id="editPlanForm" class="modal-content">
      @csrf
      @method('PUT')
      <div class="modal-header">
        <h5 class="modal-title" id="editPlanModalLabel">Edit Plan</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body row g-3">
        @include('admin.plan._form')
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-success">Update Plan</button>
      </div>
    </form>
  </div>
</div>

@section('script')
<script>
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.editPlanBtn').forEach(button => {
      button.addEventListener('click', () => {
        const plan = JSON.parse(button.getAttribute('data-plan'));
        const form = document.getElementById('editPlanForm');

        form.action = `/admin/plans/${plan.id}`;

        form.querySelector('[name="name"]').value = plan.name;
        form.querySelector('[name="min_amount"]').value = plan.min_amount;
        form.querySelector('[name="max_amount"]').value = plan.max_amount;
        form.querySelector('[name="description"]').value = plan.description ?? '';
        form.querySelector('[name="profit_rate"]').value = plan.profit_rate;
        form.querySelector('[name="profit_interval"]').value = plan.profit_interval;
        form.querySelector('[name="duration"]').value = plan.duration;
        form.querySelector('[name="category"]').value = plan.category;
        form.querySelector('[name="status"]').value = plan.status;
      });
    });
  });
</script>
@endsection

