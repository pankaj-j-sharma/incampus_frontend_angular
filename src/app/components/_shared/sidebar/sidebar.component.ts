import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-success', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-success', class: '' },
    { path: '/classroom', title: 'Classroom',  icon: 'ni-single-copy-04 text-success', class: '' },
    { path: '/grade', title: 'Grade',  icon: 'ni-hat-3 text-success', class: '' },
    { path: '/subject', title: 'Subject',  icon: 'fa fa-book text-success', class: '' },
    { path: '/teacher', title: 'Teacher',  icon: 'ni-bulb-61 text-success', class: '' },
    { path: '/subject-routing', title: 'Subject Routing',  icon: 'ni-books text-success', class: '' },
    { path: '/timetable', title: 'Timetable',  icon: 'ni-time-alarm text-success', class: '' },
    { path: '/student', title: 'Student',  icon: 'ni-satisfied text-success', class: '' },
    { path: '/payment', title: 'Payment',  icon: 'ni-credit-card text-success', class: '' },
    { path: '/attendance', title: 'Attendance',  icon: 'ni-badge text-success', class: '' },
    { path: '/exam', title: 'Exam',  icon: 'ni-box-2 text-success', class: '' },
    { path: '/friend', title: 'Friend',  icon: 'ni-chat-round text-success', class: '' },
    { path: '/incampus-event', title: 'Event',  icon: 'ni-notification-70 text-success', class: '' },
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

  logoutUser(){
    localStorage.clear();
    console.log("logout");
    this.router.navigate(['login']);
  }

}
