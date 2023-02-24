import { Routes } from '@angular/router';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { IconsComponent } from '../../components/icons/icons.component';
import { MapsComponent } from '../../components/maps/maps.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { TablesComponent } from '../../components/tables/tables.component';
import { ClassroomComponent } from 'src/app/components/classroom/classroom.component';
import { GradeComponent } from 'src/app/components/grade/grade.component';
import { SubjectComponent } from 'src/app/components/subject/subject.component';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';
import { SubjectRouteComponent } from 'src/app/components/subject-route/subject-route.component';
import { TimetableComponent } from 'src/app/components/timetable/timetable.component';
import { StudentComponent } from 'src/app/components/student/student.component';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { AttendanceComponent } from 'src/app/components/attendance/attendance.component';
import { ExamComponent } from 'src/app/components/exam/exam.component';
import { FriendComponent } from 'src/app/components/friend/friend.component';
import { IncampusEventComponent } from 'src/app/components/incampus-event/incampus-event.component';
import { EventCalendarComponent } from 'src/app/components/_shared/event-calendar/event-calendar.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

    { path: 'classroom',      component: ClassroomComponent },
    { path: 'grade',          component: GradeComponent },
    { path: 'subject',        component: SubjectComponent },
    { path: 'teacher',        component: TeacherComponent },
    { path: 'subject-routing', component: SubjectRouteComponent },
    { path: 'timetable',      component: TimetableComponent },
    { path: 'student',        component: StudentComponent },
    { path: 'payment',        component: PaymentComponent },
    { path: 'attendance',     component: AttendanceComponent },
    { path: 'exam',           component: ExamComponent },
    { path: 'friend',         component: FriendComponent },
    { path: 'incampus-event', component: IncampusEventComponent },
    { path: 'calendar', component: EventCalendarComponent },
    { path: 'chat', component: ChatComponent },

];
