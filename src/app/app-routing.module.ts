import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [{ path: 'register', component: RegisterComponent }, {path: "", component: MainPageComponent}, {path: 'login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
