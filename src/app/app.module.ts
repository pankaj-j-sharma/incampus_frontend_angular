import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/en-IN';
import localeDeExtra from '@angular/common/locales/extra/en-IN';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';

import {EventCalendarComponent} from './components/_shared/event-calendar/event-calendar.component';

registerLocaleData(localeDe, 'en-IN', localeDeExtra);

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ApiInterceptorService } from 'src/services/api-interceptor/api-interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    EventCalendarComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-IN'},
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'INR'
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: ApiInterceptorService, 
      multi: true }      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
