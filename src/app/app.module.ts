import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/partials/header/header.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
import { Pregnancy101Component } from './pages/pregnancy101/pregnancy101.component';
import { AppointmentTrackerComponent } from './pages/appointment-tracker/appointment-tracker.component';
import { SymptomTrackerComponent } from './pages/symptom-tracker/symptom-tracker.component';
import { LogSymptomComponent } from './pages/symptom-tracker/log-symptom/log-symptom.component';
import { EditSymptomLoggedComponent } from './pages/symptom-tracker/edit-symptom-logged/edit-symptom-logged.component';
import { ViewSymptomLoggedComponent } from './pages/symptom-tracker/view-symptom-logged/view-symptom-logged.component';
import { DeleteSymptomLoggedComponent } from './pages/symptom-tracker/delete-symptom-logged/delete-symptom-logged.component';
import { AddAppointmentComponent } from './pages/appointment-tracker/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './pages/appointment-tracker/edit-appointment/edit-appointment.component';
import { ViewAppointmentComponent } from './pages/appointment-tracker/view-appointment/view-appointment.component';
import { DeleteAppointmentComponent } from './pages/appointment-tracker/delete-appointment/delete-appointment.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PaginatorComponent } from './shared/components/paginator.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    Pregnancy101Component,
    AppointmentTrackerComponent,
    LogSymptomComponent,
    EditSymptomLoggedComponent,
    ViewSymptomLoggedComponent,
    DeleteSymptomLoggedComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    ViewAppointmentComponent,
    DeleteAppointmentComponent,
    LoginSignupComponent,
    SymptomTrackerComponent,
    UserProfileComponent,
    AboutUsComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
