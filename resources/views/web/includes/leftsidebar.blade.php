<nav class="sports-category" data-simplebar>
     <div class="sports-category__list">
     @if (count($sports) > 0)
    @foreach ($sports as $sport)
        @php
            $totalMatches = 0;
            foreach ($sport->leagues as $league) {
                $totalMatches += $league->matches->count();
            }
        @endphp
        <a class="sports-category__link {{ ($sp->id == $sport->id) ? 'active' : '' }}" href="{{ url('/fmain/' . $sport->id) }}">
            <span class="sports-category__notification"> {{ $totalMatches }} </span>
            <span class="sports-category__icon">
                <i class="{{ $sport->icon }}"></i>
            </span>
            <span class="sports-category__text"> {{ $sport->name }} </span>
        </a>
    @endforeach
@else
    <span class="sports-category__text"> Please Add Sports </span>
@endif
       <!-- <a class="sports-category__link  active " href="https://script.viserlab.com/betlab/category/cricket">
         <span class="sports-category__notification"> 228 </span>
         <span class="sports-category__icon">
           <i class="fas fa-cricket"></i>
         </span>
         <span class="sports-category__text"> Cricket </span>
       </a>
       <a class="sports-category__link " href="https://script.viserlab.com/betlab/category/basketball">
         <span class="sports-category__notification"> 851 </span>
         <span class="sports-category__icon">
           <i class="fas fa-basketball-ball"></i>
         </span>
         <span class="sports-category__text"> Basketball </span>
       </a>
       <a class="sports-category__link " href="https://script.viserlab.com/betlab/category/football">
         <span class="sports-category__notification"> 1033 </span>
         <span class="sports-category__icon">
           <i class="fas fa-futbol"></i>
         </span>
         <span class="sports-category__text"> Football </span>
       </a>
       <a class="sports-category__link " href="https://script.viserlab.com/betlab/category/tennis">
         <span class="sports-category__notification"> 774 </span>
         <span class="sports-category__icon">
           <i class="fas fa-tennis-ball"></i>
         </span>
         <span class="sports-category__text"> Tennis </span>
       </a> -->
     </div>
   </nav>
   <nav class="sports-sub-category" data-simplebar>
     <div class="sports-category__list">
      @if(isset($sp))
        @foreach($sports as $sport)
          @if($sport->id == $sp->id)
            @foreach($sport->leagues as $league)
            <a class="sub-category-drawer__link  {{ ($lp->id == $league->id) ? 'active' : '' }} " href="{{ url('/fmain/' . $sport->id.'/'.$league->id) }}">
              <span class="sub-category-drawer__flag">
                <img class="sub-category-drawer__flag-img" src="{{ asset( $league->img) }}" alt="image">
              </span>
              @php
                $totalMatches1 = $league->matches->count();
                 
              @endphp
              <span class="sub-category-drawer__text" title="{{$league->long_name}}"> {{$league->s_name}} </span>
              <span class="league-game-count">{{$totalMatches1}}</span>
            </a>
            @endforeach
          
          @endif
        @endforeach
      @endif
       
       
     </div>
   </nav>

   <div class="sub-category-drawer">
     <div class="container-fluid p-0">
       <div class="row g-0">
         <div class="col-12">
           <div class="sub-category-drawer__head">
             <span class="sub-category-drawer__head-content"></span>
             <button class="sub-category-drawer__head-close" type="button">
               <i class="las la-times"></i>
             </button>
           </div>
         </div>
       </div>
     </div>
     <div class="container-fluid">
       <div class="row">
         <div class="col-12">
           <div class="sub-category-drawer__body" data-simplebar>
             <ul class="list sub-category-drawer__list">
             @if(isset($sp))
              @foreach($sports as $sport)
                @if($sport->id == $sp->id)
                  @foreach($sport->leagues as $league)
                  <li>
                    <a class="sub-category-drawer__link  {{ ($lp->id == $league->id) ? 'active' : '' }}" href="{{ url('/fmain/' . $sport->id.'/'.$league->id) }}">
                      <span class="sub-category-drawer__flag">
                        <img class="sub-category-drawer__flag-img" src="{{asset($league->img)}}" alt="image">
                      </span>
                      <span class="sub-category-drawer__text" title="{{$league->long_name}}"> {{$league->s_name}} </span>
                    </a>
                    @php
                      $totalMatches2 = $league->matches->count();
                      
                    @endphp
                    <span class="league-game-count">{{$totalMatches2}}</span>
                  </li>
                  @endforeach
                
                @endif
              @endforeach
             @endif     
              
             </ul>
           </div>
         </div>
       </div>
     </div>
   </div>