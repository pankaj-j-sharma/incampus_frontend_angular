import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
import { NavbarComponent } from './_shared/navbar/navbar.component';
import { FooterComponent } from './_shared/footer/footer.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IncampusModalComponent } from './_shared/incampus-modal/incampus-modal.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,

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
    IncampusEventComponent,
    IncampusModalComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class ComponentsModule { }
