@yield('script')
<!-- jQuery library js -->
<script src="{{ asset('assets/js/lib/jquery-3.7.1.min.js') }}"></script>
<!-- Bootstrap js -->
<script src="{{ asset('assets/js/lib/bootstrap.bundle.min.js') }}"></script>
<!-- Apex Chart js -->
<script src="{{ asset('assets/js/lib/apexcharts.min.js') }}"></script>
<!-- Data Table js -->
<script src="{{ asset('assets/js/lib/dataTables.min.js') }}"></script>
<!-- Iconify Font js -->
<script src="{{ asset('assets/js/lib/iconify-icon.min.js') }}"></script>
<!-- jQuery UI js -->
<script src="{{ asset('assets/js/lib/jquery-ui.min.js') }}"></script>
<!-- Vector Map js -->
<script src="{{ asset('assets/js/lib/jquery-jvectormap-2.0.5.min.js') }}"></script>
<script src="{{ asset('assets/js/lib/jquery-jvectormap-world-mill-en.js') }}"></script>
<!-- Popup js -->
<script src="{{ asset('assets/js/lib/magnifc-popup.min.js') }}"></script>
<!-- Slick Slider js -->
<script src="{{ asset('assets/js/lib/slick.min.js') }}"></script>
<!-- prism js -->
<script src="{{ asset('assets/js/lib/prism.js') }}"></script>
<!-- file upload js -->
<script src="{{ asset('assets/js/lib/file-upload.js') }}"></script>
<!-- audioplayer -->
<script src="{{ asset('assets/js/lib/audioplayer.js') }}"></script>

<!-- main js -->
<script src="{{ asset('assets/js/app.js') }}"></script>


<script>
    function createChartTwo(chartId, color1, color2, earningsData, withdrawalsData) {
        var options = {
            series: [
                { name: 'Earnings', data: earningsData },
                { name: 'Withdrawals', data: withdrawalsData }
            ],
            chart: {
                type: 'area',
                height: 270,
                toolbar: { show: false },
            },
            stroke: {
                curve: 'smooth',
                width: 3,
                colors: [color1, color2]
            },
            fill: {
                type: 'gradient',
                colors: [color1, color2],
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: [color1 + '80', color2 + '80'],
                    inverseColors: false,
                    opacityFrom: 0.6,
                    opacityTo: 0.3,
                    stops: [0, 100]
                }
            },
            markers: {
                colors: [color1, color2],
                strokeWidth: 3,
                size: 0,
                hover: { size: 7 }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yaxis: {
                labels: {
                    formatter: function(val) { return '$' + val.toLocaleString(); }
                }
            },
            tooltip: {
                shared: true,
                y: {
                    formatter: function(val) { return '$' + val.toLocaleString(); }
                }
            },
            legend: { show: true }
        };

        var chart = new ApexCharts(document.querySelector('#' + chartId), options);
        chart.render();
    }

  const earningsData = @json($chartData['earnings'] ?? array_fill(0, 12, 0));
  const withdrawalsData = @json($chartData['withdrawals'] ?? array_fill(0, 12, 0));

  createChartTwo('incomeExpense', '#487FFF', '#FF9F29', earningsData, withdrawalsData);

</script>

<script>
document.getElementById('timeRangeSelect').addEventListener('change', function () {
    const selectedRange = this.value;
    // Reload page with query parameter ?range=selectedRange (or use AJAX for dynamic reload)
    window.location.href = `?range=${selectedRange}`;
});
</script>
