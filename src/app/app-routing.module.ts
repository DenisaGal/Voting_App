import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ElectionsPageComponent } from './elections-page/elections-page.component';
import { AddElectionComponent } from './add-election/add-election.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { VotingPageComponent } from './voting-page/voting-page.component';

const routes: Routes = [
{path: 'admin-page', component: AdminPageComponent },
{ path: 'register', component: RegisterComponent },
{path: "", component: MainPageComponent},
{path: 'login', component: LoginComponent },
{path: 'elections', component: ElectionsPageComponent },
{path: 'profile', component: UserProfileComponent },
{path: 'add-election', component: AddElectionComponent },
{path: 'forgot-pwd', component: ForgotPwdComponent },
{path: 'manage-users', component: ManageUsersComponent },
{path: 'voting-page', component: VotingPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
