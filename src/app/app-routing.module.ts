import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:"", redirectTo:'signin',pathMatch:'full'},
{path:'signin',component:SigninComponent , title:'Notes-signin'},
{path:'signup',component:SignupComponent , title:'Notes-signup'},
{path:'notes',canActivate:[authGuard], component:NotesComponent , title:'Notes'},
{path:"**",component:NotfoundComponent,title:"page not found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  