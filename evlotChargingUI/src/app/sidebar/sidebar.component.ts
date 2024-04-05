import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: '/vehicles', title: 'Vehicles',  icon:'pe-7s-car', class: '' },
    { path: '/search', title: 'Search',  icon:'pe-7s-search', class: '' },
    //{ path: '/ports', title: 'Charging Port Details',  icon:'pe-7s-user', class: '' },
    //{ path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    { path: '/bookings', title: 'Charging Appointments',  icon:'pe-7s-note2', class: '' },
    { path: '/contactus', title: 'Contact Us',  icon:'pe-7s-users', class: '' },
    //{ path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    //{ path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' }
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
