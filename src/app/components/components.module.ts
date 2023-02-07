import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomComponent } from './classroom/classroom.component';
import { GradeComponent } from './grade/grade.component';
import { SubjectComponent } from './subject/subject.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectRouteComponent } from './subject-route/subject-route.component';
import { TimetableComponent } from './timetable/timetable.component';
import { StudentComponent } from './student/student.component';
import { PaymentComponent } from './payment/payment.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ExamComponent } from './exam/exam.component';
import { FriendComponent } from './friend/friend.component';
import { IncampusEventComponent } from './incampus-event/incampus-event.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ClassroomComponent,
    GradeComponent,
    SubjectComponent,
    TeacherComponent,
    SubjectRouteComponent,
    TimetableComponent,
    StudentComponent,
    PaymentComponent,
    AttendanceComponent,
    ExamComponent,
    FriendComponent,
    IncampusEventComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
