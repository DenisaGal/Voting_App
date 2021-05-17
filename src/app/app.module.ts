import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    RegisterComponent,
    MainPageComponent,
    LoginComponent,
    UserProfileComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
            apiKey: "AIzaSyAsmiDyTM6FSxei6Nt-XvLjFOYzsRIKGPc",
            authDomain: "e-voter-d06bb.firebaseapp.com",
            projectId: "e-voter-d06bb",
            storageBucket: "e-voter-d06bb.appspot.com",
            messagingSenderId: "873043226372",
            appId: "1:873043226372:web:958f84dbfca06c1124aa51"
            }),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
