<div class="sidebar-wrapper">
	<div>
		<div class="logo-wrapper">
			<a href="{{url('/admin/dashboard')}}"><img class="img-fluid for-light" src="{{asset('/img/logo/logo.png')}}" alt=""><img class="img-fluid for-dark" src="{{asset('assets/images/logo/logo_dark.png')}}" alt=""></a>
			<div class="back-btn"><i class="fa fa-angle-left"></i></div>
			<div class="toggle-sidebar"><i class="status_toggle middle sidebar-toggle" data-feather="grid"> </i></div>
		</div>
		<div class="logo-icon-wrapper"><a href="{{url('/admin/dashboard')}}"><img class="img-fluid" src="{{asset('/img/logo/logo.png')}}" alt=""></a></div>
		<nav class="sidebar-main">
			<div class="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
			<div id="sidebar-menu">
				<ul class="sidebar-links" id="simple-bar">
					<li class="back-btn">
						<a href="{{url('/admin/dashboard')}}"><img class="img-fluid" src="{{asset('/img/logo/logo.png')}}" alt=""></a>
						<div class="mobile-back text-end"><span>Back</span><i class="fa fa-angle-right ps-2" aria-hidden="true"></i></div>
					</li>
					
					<!-- adding new comment -->
					<li class="sidebar-list">
						<a class="sidebar-link sidebar-title {{ Route::currentRouteName()=='sports.index' ? 'active' : '' }}" href="{{url('/sports')}}"><i data-feather="home"></i><span class="lan-3">sports</span>	
						</a>
					</li>
					<li class="sidebar-list">
						<a class="sidebar-link sidebar-title {{ Route::currentRouteName()=='leagues.index' ? 'active' : '' }}" href="{{url('/leagues')}}"><i data-feather="home"></i><span class="lan-3">Leagues</span>	
						</a>
					</li>
					<li class="sidebar-list">
						<a class="sidebar-link sidebar-title {{ Route::currentRouteName()=='teams.index' ? 'active' : '' }}" href="{{url('/teams')}}"><i data-feather="home"></i><span class="lan-3">Teams</span>	
						</a>
					</li>
					<li class="sidebar-list">
						<a class="sidebar-link sidebar-title {{ Route::currentRouteName()=='matches.index' ? 'active' : '' }}" href="{{url('/matches')}}"><i data-feather="home"></i><span class="lan-3">Matches</span>	
						</a>
					</li>
					
					<!-- <li class="sidebar-list">
							<a class="sidebar-link sidebar-title {{Route::currentRouteName()=='admin_user_list' ? 'active' : '' }}" href="#"><i data-feather="users"> </i><span class="lan-6">Users</span>
								<div class="according-menu"><i class="fa fa-angle-{{Route::currentRouteName()=='admin_user_list' ? 'down' : 'right' }}"></i></div>
							</a>
							<ul class="sidebar-submenu" style="display: {{ Route::currentRouteName()=='admin_user_list' ? 'block;' : 'none;' }}">
			                    <li><a href="{{url('/admin/users/list')}}" class="{{ Route::currentRouteName()=='admin_user_list' ? 'active' : '' }}">User List</a></li>
		                  	</ul>
					</li> -->
					
					
					
                    
					
                    
					
                    
					

					
					
					
					
					
					
					
				</ul>
			</div>
			<div class="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
		</nav>
	</div>
</div>