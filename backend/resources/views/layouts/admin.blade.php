<!-- meta tags and other links -->
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>@yield('title') | {{ $site_name }}</title>
  <link rel="icon" href="{{ $appFavicon }}" type="image/png" sizes="16x16">
<link rel="shortcut icon" href="{{ $appFavicon }}">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <!-- remix icon font css -->
  <link rel="stylesheet" href="{{ asset('assets/css/remixicon.css') }}" />
  
  <!-- BootStrap css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/bootstrap.min.css') }}" />
  
  <!-- Apex Chart css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/apexcharts.css') }}" />
  
  <!-- Data Table css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/dataTables.min.css') }}" />
  
  <!-- Text Editor css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/editor-katex.min.css') }}" />
  <link rel="stylesheet" href="{{ asset('assets/css/lib/editor.atom-one-dark.min.css') }}" />
  <link rel="stylesheet" href="{{ asset('assets/css/lib/editor.quill.snow.css') }}" />
  
  <!-- Date picker css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/flatpickr.min.css') }}" />
  
  <!-- Calendar css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/full-calendar.css') }}" />
  
  <!-- Vector Map css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/jquery-jvectormap-2.0.5.css') }}" />
  
  <!-- Popup css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/magnific-popup.css') }}" />
  
  <!-- Slick Slider css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/slick.css') }}" />
  
  <!-- prism css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/prism.css') }}" />
  
  <!-- file upload css -->
  <link rel="stylesheet" href="{{ asset('assets/css/lib/file-upload.css') }}" />
  
  <link rel="stylesheet" href="{{ asset('assets/css/lib/audioplayer.css') }}" />
  
  <!-- main css -->
<link rel="stylesheet" href="{{ asset('assets/css/style.css') }}" />
</head>
<body>
@auth
        @include ('includes.asidemenu')
@endauth

<main class="dashboard-main">
  @auth
  @include('includes.navbar')
  @endauth

 @if(session('success'))
    <div class="alert alert-success mt-3">
        {{ session('success') }}
    </div>
@endif
 
@yield('content')

@auth
   @include('includes.footer')
@endauth

</main>

@include ('includes.scripts')

</body>
</html>
