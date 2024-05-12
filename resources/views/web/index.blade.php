@extends('web.layouts.master')
@section('title', 'New Page Title')

@section('content')
<main class="home-page">
    
  @include('web.includes.leftsidebar')
  
  
   <div class="sports-body">
     <div class="container-fluid">
       <div class="row g-3">
         <div class="col-12">
           <div class="banner-slider hero-slider mb-3">
             <div class="banner_slide">
               <img class="banner_image" src="https://script.viserlab.com/betlab/assets/images/frontend/banner/64a557065f66a1688557318.jpg">
             </div>
             <div class="banner_slide">
               <img class="banner_image" src="https://script.viserlab.com/betlab/assets/images/frontend/banner/64a5572a3e7991688557354.jpg">
             </div>
             <div class="banner_slide">
               <img class="banner_image" src="https://script.viserlab.com/betlab/assets/images/frontend/banner/64a55730164b11688557360.jpg">
             </div>
           </div>
         </div>
         <div class="col-12">
           <div class="betting-body">
             <div class="row g-3">
              @if(isset($lp))
                @foreach($sports as $sport)
                  @if($sport->id == $sp->id)
                    @foreach($sport->leagues as $league)
                      @if($league->id == $lp->id)
                      <div class="col-12">
                        <div class="league-title">
                          <span class="league-title__flag">
                            <img class="league-title__flag-img" src="{{$league->img}}" alt="image">
                          </span>
                          <span class="league-title__name"> {{$league->long_name}} </span>
                        </div>
                      </div>
                      @if(count($league->matches)>0)
                        @foreach($league->matches as $match)
                        <div class="col-sm-6 col-lg-6 col-md-4 col-xl-4 col-xxl-3 col-msm-6">
                          <div class="sports-card position-relative">
                            <span class="sports-card__head">
                              <span class="sports-card__team">
                                <span class="sports-card__team-flag">
                                  <img class="sports-card__team-flag-img" src="{{$match->team1->img}}" alt="image">
                                </span>
                                <span class="sports-card__team-name"> {{$match->team1->name}}</span>
                              </span>
                              @php
                                  // Convert date and time strings to timestamps
                                  $matchDateTime = strtotime($match->date . ' ' . $match->time);
                                  $currentDateTime = time();

                                  // Compare timestamps
                                  $isFutureMatch = $matchDateTime >= $currentDateTime;
                              @endphp
                              @if ($isFutureMatch)
                              <span class="sports-card__info text-center">
                                <span class="sports-card__stream">
                                  <i class="fas fa-play text--danger"></i>
                                </span>
                                <span class="sports-card__info-text">Live Now</span>
                              </span>
                              @else
                              <span class="sports-card__info text-center">
                                <span class="sports-card__stream">
                                  <i class="fas fa-play-circle"></i>
                                </span>
                                <span class="sports-card__info-text">Completed</span>
                              </span>
                              @endif
                              
                              <span class="sports-card__team">
                                <span class="sports-card__team-flag">
                                  <img class="sports-card__team-flag-img" src="{{$match->team2->img}}" alt="image">
                                </span>
                                <span class="sports-card__team-name"> {{$match->team2->name}} </span>
                              </span>
                            </span>
                            <div class="custom-dropdown">
                              <div class="d-flex justify-content-between">
                                <span class="custom-dropdown-selected">Full Time Result</span>
                                <a href="https://script.viserlab.com/betlab/markets/icc-mens-cricket-world-cup-england-cricket-team-vs-comilla-victorians-2023-09-13-02-35-pm" class="text--small">Markets</a>
                              </div>
                              <div class="custom-dropdown-list">
                                <div class="custom-dropdown-list-item  disabled  " data-reference="8149">Full Time Result</div>
                                <div class="custom-dropdown-list-item  " data-reference="19099">1st Ball Wicket in 1st Innings</div>
                                <div class="custom-dropdown-list-item  " data-reference="19100">1st Ball Wicket in 2nd Innings</div>
                                <div class="custom-dropdown-list-item  " data-reference="19101">1st Batting Team Will Win</div>
                                <div class="text-center mt-1">
                                  <a href="https://script.viserlab.com/betlab/markets/icc-mens-cricket-world-cup-england-cricket-team-vs-comilla-victorians-2023-09-13-02-35-pm?more=2" class="text--small"> +2 More</a>
                                </div>
                              </div>
                            </div>
                            <div class="option-odd-list">
                              <div class="option-odd-list__item">
                                <div>
                                  <button class="btn btn-sm btn-light text--small border oddBtn  " data-option_id="24445">3.1 </button>
                                  <span class="text--extra-small d-block text-center">ENG</span>
                                </div>
                              </div>
                              <div class="option-odd-list__item">
                                <div>
                                  <button class="btn btn-sm btn-light text--small border oddBtn  " data-option_id="24446">1.5 </button>
                                  <span class="text--extra-small d-block text-center">DRAW</span>
                                </div>
                              </div>
                              <div class="option-odd-list__item">
                                <div>
                                  <button class="btn btn-sm btn-light text--small border oddBtn  " data-option_id="24447">1.8 </button>
                                  <span class="text--extra-small d-block text-center">CV</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        @endforeach
                      @endif
                      @endif
                    @endforeach
                  @endif
                @endforeach
              @endif


               
               
               

             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
   <div class="betslip">
     <div class="betslip__head">
       <h6 class="m-0 text-white">
         <i class="fas fa-clipboard-list"></i> Bet Slip
       </h6>
     </div>
     <div class="list-group bet-type">
       <button class="bet-type__btn active bet-tab-single betTypeBtn" data-type="1" type="button">Single Bet</button>
       <button class="bet-type__btn bet-tab-multi betTypeBtn" data-type="2" type="button">Multi Bet</button>
     </div>
     <div class="betslip__body" data-simplebar="init">
       <div class="simplebar-wrapper">
         <div class="simplebar-height-auto-observer-wrapper">
           <div class="simplebar-height-auto-observer"></div>
         </div>
         <div class="simplebar-mask">
           <div class="simplebar-offset">
             <div class="simplebar-content-wrapper" role="region" aria-label="scrollable content" tabindex="0">
               <div class="simplebar-content">
                 <ul class="list betslip__list">
                   <li data-option_id="21946" data-option_odds="2.38000000">
                     <button class="betslip__list-close text--danger removeFromSlip" data-option_id="21946" type="button">
                       <i class="fas fa-trash-alt"></i>
                     </button>
                     <div class="betslip__list-content">
                       <span class="betslip__list-team">BAR vs CHL</span>
                       <span class="betslip__list-question">Full Time Result</span>
                       <span class="betslip__list-match">BAR</span>
                       <div class="betslip__list-text">2.38</div>
                     </div>
                     <div class="betslip-right">
                       <div class="betslip__list-ratio">
                         <input class="investAmount" name="invest_amount" type="number" autocomplete="off" step="any" placeholder="0.0">
                         <span>STAKE</span>
                       </div>
                       <small class="text--danger validation-msg"></small>
                       <span class="betslip-return">Returns: $ <span class="bet-return-amount">0.00</span>
                       </span>
                     </div>
                   </li>
                 </ul>
                 <span class="empty-slip-message">
                   <span class="d-flex justify-content-center align-items-center">
                     <img src="https://script.viserlab.com/betlab/assets/templates/basic/images/empty_list.png" alt="image">
                   </span> Your selections will be displayed here </span>
               </div>
             </div>
           </div>
         </div>
         <div class="simplebar-placeholder"></div>
       </div>
       <div class="simplebar-track simplebar-horizontal">
         <div class="simplebar-scrollbar"></div>
       </div>
       <div class="simplebar-track simplebar-vertical">
         <div class="simplebar-scrollbar"></div>
       </div>
     </div>
     <div class="betslip__footer" id="betSlipBody">
       <ul class="list betslip__footer-list">
         <li>
           <div class="betslip__list-content">
             <div class="betslip__list-match">Singles (x <span class="bet-slip-count">8</span>) </div>
             <div class="betslip__list-bet">
               <span class="betslip__list-odd">Stake Per Bet</span>
             </div>
           </div>
           <div class="betslip-righ">
             <div class="betslip__list-ratio">
               <input class="amount" name="total_invest" type="number" step="any" placeholder="0.0">
               <span>STAKE</span>
             </div>
             <div class="bet-return">
               <small class="text--danger total-stake-amount"></small>
               <small class="text--danger total-validation-msg"></small>
               <span>Returns: $ <span class="total-return-amount">0.00</span>
               </span>
             </div>
           </div>
         </li>
       </ul>
       <div class="betslip__footer-bottom d-flex align-items-center">
         <input class="form-control form--control betslip-form" type="number" placeholder="Enter Amount">
         <button class="delete-btn deleteAll">
           <i class="fas fa-trash-alt"></i>
         </button>
         <div class="place-btn">
           <button class="btn btn--base btn--md sm-text betslip__footer-btn bet-place-btn betPlaceBtn" type="button"> PLACE BET </button>
         </div>
       </div>
     </div>
   </div>
   <div class="app-nav">
     <div class="container-fluid">
       <div class="row g-0">
         <div class="col-12">
           <ul class="app-nav__menu list list--row justify-content-between align-items-center">
             <li>
               <a class="app-nav__menu-link active" href="https://script.viserlab.com/betlab">
                 <span class="app-nav__menu-icon">
                   <img src="https://script.viserlab.com/betlab/assets/templates/basic/images/bet-now.png" alt="image">
                 </span>
                 <span class="app-nav__menu-text"> Bet Now </span>
               </a>
             </li>
             <li>
               <a class="app-nav__menu-link" href="https://script.viserlab.com/betlab/user/my-bets">
                 <span class="app-nav__menu-icon">
                   <img src="https://script.viserlab.com/betlab/assets/templates/basic/images/my_bets.png" alt="image">
                 </span>
                 <span class="app-nav__menu-text"> My Bets </span>
               </a>
             </li>
             <li class="app-nav__menu-link-important-container">
               <a class="app-nav__menu-link-important" href="javascript:void(0)">
                 <i class="fas fa-bars"></i>
               </a>
             </li>
             <li>
               <a class="app-nav__menu-link open-betslip header-button" href="javascript:void(0)">
                 <span class="bet-count">8</span>
                 <span class="app-nav__menu-icon">
                   <i class="fa-thin fa-clipboard-list-check"></i>
                 </span>
                 <span class="app-nav__menu-text">Bet Slip</span>
               </a>
             </li>
             <li>
               <a class="app-nav__menu-link" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#loginModal">
                 <span class="app-nav__menu-icon">
                   <img src="https://script.viserlab.com/betlab/assets/templates/basic/images/user.png" alt="image">
                 </span>
                 <span class="app-nav__menu-text"> Login </span>
               </a>
             </li>
           </ul>
         </div>
       </div>
     </div>
     <div class="app-nav__drawer" data-simplebar>
       <ul class="list app-nav__drawer-list">
         <li>
           <a class="app-nav__drawer-link" href="https://script.viserlab.com/betlab">
             <span class="app-nav__drawer-icon">
               <i class="las la-home"></i>
             </span>
             <span class="app-nav__drawer-text"> Home </span>
           </a>
         </li>
         <li>
           <a class="app-nav__drawer-link" href="https://script.viserlab.com/betlab/news">
             <span class="app-nav__drawer-icon">
               <i class="las la-newspaper"></i>
             </span>
             <span class="app-nav__drawer-text"> News & Updates </span>
           </a>
         </li>
         <li>
           <a class="app-nav__drawer-link" href="https://script.viserlab.com/betlab/contact">
             <span class="app-nav__drawer-icon">
               <i class="las la-headset"></i>
             </span>
             <span class="app-nav__drawer-text"> Contact </span>
           </a>
         </li>
         <li>
           <div class="select-lang--container">
             <div class="select-lang">
               <span class="select-lang__icon">
                 <i class="las la-percent"></i>
               </span>
               <select class="form-select oddsType">
                 <option value="" disabled>Select Odds Type</option>
                 <option value="decimal">Decimal</option>
                 <option value="fraction">Fraction</option>
                 <option value="american">American Odds</option>
               </select>
             </div>
           </div>
         </li>
         <li>
           <div class="select-lang--container">
             <div class="select-lang">
               <span class="select-lang__icon">
                 <i class="fas fa-globe"></i>
               </span>
               <select class="form-select langSel">
                 <option value="en" selected>English</option>
                 <option value="hn">Hindi</option>
                 <option value="es">Spanish</option>
               </select>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </main>
@endsection

@section('js')
@include('web.includes.indexJS')
@endsection
