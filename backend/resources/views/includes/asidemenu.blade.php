
<aside class="sidebar">
  <button type="button" class="sidebar-close-btn">
    <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
  </button>
  <div>
    <a href="{{ route('admin.dashboard') }}" class="sidebar-logo">
    <img src="{{ $appLogo }}" alt="site logo" class="light-logo">
    <img src="{{ $appLogoLight }}" alt="site logo" class="dark-logo">
    <img src="{{ $appLogoIcon }}" alt="site logo" class="logo-icon">
</a>
  </div>
  <div class="sidebar-menu-area">
    <ul class="sidebar-menu" id="sidebar-menu">
      <li>
        <a href="{{ route('admin.dashboard') }}">
          <iconify-icon icon="solar:home-smile-angle-outline" class="menu-icon"></iconify-icon>
          <span>Dashboard</span>
        </a>
      </li>
      <li class="dropdown">
        <a href="javascript:void(0)">
          <iconify-icon icon="flowbite:users-group-outline" class="menu-icon"></iconify-icon>
          <span>Users</span> 
        </a>
        <ul class="sidebar-submenu">
          <li>
            <a href="{{ route('admin.userlist') }}"><i class="ri-circle-fill circle-icon text-primary-600 w-auto"></i> Users List</a>
          </li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="javascript:void(0)">
          <iconify-icon icon="hugeicons:invoice-03" class="menu-icon"></iconify-icon>
          <span>Investement</span> 
        </a>
        <ul class="sidebar-submenu">
          <li>
            <a href="{{route('admin.plans.list')}}"><i class="ri-circle-fill circle-icon text-primary-600 w-auto"></i> Investment Plans</a>
          </li>
          <li>
            <a href="{{ route('admin.plans.user_active') }}"><i class="ri-circle-fill circle-icon text-warning-main w-auto"></i> Active Investments</a>
          </li>
        </ul>
      </li>
      <li class="dropdown">
<a href="javascript:void(0)"> 
   <iconify-icon icon="hugeicons:money-send-square" class="menu-icon"></iconify-icon>
  <span>Manage Deposit</span></a>
  <ul class="sidebar-submenu">
      <li>
        <a href="{{ route ('admin.deposits.pending') }}">
          <i class="ri-circle-fill circle-icon text-warning-main w-auto"></i>Pending Deposit
        </a>
      </li>
    <li>
        <a href="{{route('admin.deposits.history')}}">
     <i class="ri-circle-fill circle-icon text-primary-600 w-auto"></i>
          Deposit History
        </a>
      </li>
    </ul> 
      </li>
     
<li class="dropdown">
<a href="javascript:void(0)">
<iconify-icon icon="heroicons:document" class="menu-icon"></iconify-icon>
<span>Manage Withdrawals</span></a>
<ul class="sidebar-submenu">
<li>
  <a href="{{route('admin.withdrawals.pending')}}">
  <i class="ri-circle-fill circle-icon text-info-main w-auto"></i>Pending Withdrawals </a>
</li>
<li>
  <a href="{{route('admin.withdrawals.history')}}">
  <i class="ri-circle-fill circle-icon text-primary-600 w-auto"></i>Withdrawal History</a>
</li>
</ul>
</li>   

<li class="dropdown">
        <a href="javascript:void(0)">
          <i class="ri-news-line text-xl me-14 d-flex w-auto"></i>
          <span>Pages</span> 
        </a>
        <ul class="sidebar-submenu">
          <li>
            <a href="{{route('admin.faq.index')}}"><i class="ri-circle-fill circle-icon text-primary-600 w-auto"></i> FAQ</a>
          </li>
          <li>
            <a href="{{ route('admin.help.index') }}"><i class="ri-circle-fill circle-icon text-warning-main w-auto"></i>Help Articles</a>
          </li>
          <li>
            <a href="{{ route('admin.support.index') }}"><i class="ri-circle-fill circle-icon text-info-main w-auto"></i> Support Request</a>
          </li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="javascript:void(0)">
          <iconify-icon icon="icon-park-outline:setting-two" class="menu-icon"></iconify-icon>
          <span>Settings</span> 
        </a>
        <ul class="sidebar-submenu">
          <li>
            <a href="{{ route('admin.settings.company')}}"><i class="ri-circle-fill circle-icon text-primary-600 w-auto"></i>{{__('App Settings')}}</a>
          </li>
          <li>
            <a href="{{ route('admin.gateway.settings') }}"><i class="ri-circle-fill circle-icon text-warning-main w-auto"></i>
              {{ __('Payment Gateway') }} 
            </a>
          </li>
          <li>
            <a href="{{ route ('admin.settings.email') }}"><i class="ri-circle-fill circle-icon text-info-main w-auto"></i> {{__('Email Settings') }}</a>
          </li>
          <li>
            <a href="{{ route('admin.currency.settings') }}"><i class="ri-circle-fill circle-icon text-danger-main w-auto"></i> Currencies</a>
          </li>
          <li>
            <a href="{{ route('admin.language.settings') }}"><i class="ri-circle-fill circle-icon text-danger-main w-auto"></i> Languages</a>
          </li>
        </ul>
      </li>
      <li>
    
    <form id="logoutForm" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
    <a href="#" onclick="event.preventDefault(); document.getElementById('logoutForm').submit();">
     <iconify-icon icon="lucide:power" class="menu-icon"> </iconify-icon>   <span>Log Out</span>
    </a>
</li>

    </ul>
  </div>
</aside>