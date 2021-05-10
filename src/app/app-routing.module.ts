import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
{path: 'admin-page', component: AdminPageComponent },
{ path: 'register', component: RegisterComponent },
{path: "", component: MainPageComponent},
{path: 'login', component: LoginComponent },
{path: 'profile', component: UserProfileComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
