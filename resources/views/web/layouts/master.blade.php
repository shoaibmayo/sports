<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    <link href="{{asset('/assets/basic/css/slick.css')}}" rel="stylesheet">
    <link href="{{asset('/assets/basic/css/magnific-popup.css')}}" rel="stylesheet">
    <link href="{{asset('/assets/basic/css/simplebar.min.css')}}" rel="stylesheet">
    <link href="{{asset('/assets/basic/css/main.css')}}" rel="stylesheet">
    <link href="{{asset('/assets/basic/css/custom.css')}}" rel="stylesheet">
    <link href="{{asset('/assets/basic/css/color.php?color=5671F5')}}" rel="stylesheet">

        <link href="{{asset('/assets/basic/css/skeleton.css')}}" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    @yield('styles')

    <title>@yield('title')</title>
  </head>
  <body>
   <div class="preloader">
        <div class="preloader__img">
            <img src="https://script.viserlab.com/betlab/assets/images/logoIcon/favicon.png?1715420352" alt="image" />
        </div>
    </div>

    <div class="back-to-top">
        <span class="back-top">
            <i class="las la-angle-double-up"></i>
        </span>
    </div>

    <div class="body-overlay" id="body-overlay"></div>

    <div class="header-overlay"></div>

        <header class="header-primary">
        <div class="container-fluid">
            
        <div class="header-fluid-custom-parent">

        

        <nav class="primary-menu-container">

            <ul class="list list--row primary-menu-lg justify-content-end justify-content-lg-start">
                                    <li>
                        <a class="bet-type__live  active " href="#"> Live </a>
                    </li>
                    <li>
                        <a class="bet-type__upcoming " href="#"> Upcoming </a>
                    </li>
            </ul>

           
        </nav>
    </div>
    
    
        </div>
    </header>
   
    @yield('content')

    
         
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

    
   <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{asset('/assets/basic/js/slick.js')}}"></script>
    <script src="{{asset('/assets/basic/js/jquery.magnific-popup.js')}}"></script>
    <script src="{{asset('/assets/basic/js/simplebar.min.js')}}"></script>
    <script src="{{asset('/assets/basic/js/jquery.stepcycle.js')}}"></script>
    <script src="{{asset('/assets/basic/js/app.js')}}"></script>

   @yield('js')
  </body>
</html>