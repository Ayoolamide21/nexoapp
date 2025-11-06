<div class="col-md-6">
  <label for="name" class="form-label">Name</label>
  <input type="text" name="name" class="form-control" required>
</div>

<div class="col-md-6">
  <label for="min_amount" class="form-label">Min Amount</label>
  <input type="number" step="0.01" name="min_amount" class="form-control" required>
</div>

<div class="col-md-6">
  <label for="max_amount" class="form-label">Max Amount</label>
  <input type="number" step="0.01" name="max_amount" class="form-control" required>
</div>

<div class="col-md-6">
  <label for="profit_rate" class="form-label">Profit Rate (%)</label>
  <input type="number" step="0.01" name="profit_rate" class="form-control" required>
</div>

<div class="col-md-6">
  <label for="profit_interval" class="form-label">Profit Interval</label>
  <select name="profit_interval" class="form-select">
    <option value="daily">Daily</option>
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
  </select>
</div>

<div class="col-md-6">
  <label for="duration" class="form-label">Duration (days)</label>
  <input type="number" name="duration" class="form-control" required>
</div>

<div class="col-md-6">
  <label for="category" class="form-label">Category</label>
  <input type="text" name="category" class="form-control" required>
</div>

<div class="col-md-6">
  <label for="status" class="form-label">Status</label>
  <select name="status" class="form-select">
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
</div>

<div class="col-12">
  <label for="description" class="form-label">Description</label>
  <textarea name="description" class="form-control" rows="3"></textarea>
</div>
