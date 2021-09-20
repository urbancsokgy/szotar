import { LoginComponent } from './page/login/login.component';
import { UserupdateComponent } from './page/userupdate/userupdate.component';
import { RegisterComponent } from './page/register/register.component';
import { UserdetailComponent } from './page/userdetail/userdetail.component';
import { HomeComponent } from './page/home/home.component';
import { UsersComponent } from './page/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'userdetail/:id',
    component: UserdetailComponent,
  },
  {
    path: 'userupdate/:id',
    component: UserupdateComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register/:add',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
