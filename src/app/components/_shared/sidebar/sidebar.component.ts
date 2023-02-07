import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/classroom', title: 'Classroom',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/grade', title: 'Grade',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/subject', title: 'Subject',  icon: 'fa fa-book text-primary', class: '' },
    { path: '/teacher', title: 'Teacher',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/subject-routing', title: 'Subject Routing',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/timetable', title: 'Timetable',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/student', title: 'Student',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/payment', title: 'Payment',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/attendance', title: 'Attendance',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/exam', title: 'Exam',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/friend', title: 'Friend',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/incampus-event', title: 'Event',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
