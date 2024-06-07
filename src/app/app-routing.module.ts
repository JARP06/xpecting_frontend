import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { Pregnancy101Component } from './pages/pregnancy101/pregnancy101.component';
import { AppointmentTrackerComponent } from './pages/appointment-tracker/appointment-tracker.component';
import { ViewAppointmentComponent } from './pages/appointment-tracker/view-appointment/view-appointment.component';
import { EditAppointmentComponent } from './pages/appointment-tracker/edit-appointment/edit-appointment.component';
import { AddAppointmentComponent } from './pages/appointment-tracker/add-appointment/add-appointment.component';
import { DeleteAppointmentComponent } from './pages/appointment-tracker/delete-appointment/delete-appointment.component';
import { LogSymptomComponent } from './pages/symptom-tracker/log-symptom/log-symptom.component';
import { ViewSymptomLoggedComponent } from './pages/symptom-tracker/view-symptom-logged/view-symptom-logged.component';
import { SymptomTrackerComponent } from './pages/symptom-tracker/symptom-tracker.component';
import { EditSymptomLoggedComponent } from './pages/symptom-tracker/edit-symptom-logged/edit-symptom-logged.component';
import { DeleteSymptomLoggedComponent } from './pages/symptom-tracker/delete-symptom-logged/delete-symptom-logged.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './guard/auth.guard';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  { path: '', title: 'Home', component:HomeComponent},
  { path: 'login-signup',
    title: 'Login - Sign Up',
    component: LoginSignupComponent
  },
  { path: 'pregnancy-101',
    title: 'Pregnancy 101',
    component: Pregnancy101Component
  },
  { path: 'faqs',
    title: 'FAQs',
    component: FaqComponent
  },
 
  { path: 'create-appointment',
    title: 'Schedule Appointment',
    component: AddAppointmentComponent
  },
  { path: 'appointment/view-appointment/:aId',
    title: 'View Appointment',
    component: ViewAppointmentComponent,
    canActivate: [AuthGuard]

  },
  { path: 'all-appointments',
    title: 'All Appointment',
    component: AppointmentTrackerComponent,
    canActivate: [AuthGuard]

  },
  { path: 'appointment/edit-appointment/:aId',
    title: 'Edit Appointment',
    component: EditAppointmentComponent,
    canActivate: [AuthGuard]

  },
  { path: 'delete-appointment/:aId',
    title: 'Delete Appointment',
    component: DeleteAppointmentComponent,
    canActivate: [AuthGuard]
  },
  
  //symptom routes
  { path: 'log-symptom',
  title: 'Log Symptom',
  component: LogSymptomComponent,
  canActivate: [AuthGuard]
},
{ path: 'symptom-tracker/view-symptom/:slId',
  title: 'View Logged Symptom',
  component: ViewSymptomLoggedComponent,
  canActivate: [AuthGuard]

},
{ path: 'all-logged-symptoms',
  title: 'All Symptom Logged',
  component: SymptomTrackerComponent,
  canActivate: [AuthGuard]
},
{ path: 'symptom-tracker/edit-symptom/:slId',
  title: 'Edit Logged Symptom',
  component: EditSymptomLoggedComponent,
  canActivate: [AuthGuard]
},
{ path: 'delete-symptom/:sId',
  title: 'Delete Logged Symptom',
  component: DeleteSymptomLoggedComponent,
  canActivate: [AuthGuard]

},
{
  path: 'login-signup',
  title: 'Login - Sign Up',
  component: LoginSignupComponent,
  
},
{
  path: 'user-profile/:id',
  title: 'My Profile',
  component: UserProfileComponent,
  canActivate: [AuthGuard],
},
{
  path: 'about-us',
  title: 'About Us',
  component: AboutUsComponent,
  
},
// {
//   path: '**',
//   title: 'Page Not Found',
//   component: NotFoundComponent,
// },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
