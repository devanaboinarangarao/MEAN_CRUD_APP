import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { createComponent } from '@angular/compiler/src/core';
import { CreateuserComponent } from './createuser/createuser.component';
import { FetchuserComponent } from './fetchuser/fetchuser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';

const routes: Routes = [
  {path: 'create', component : CreateuserComponent},
  {path: 'fetch', component : FetchuserComponent},
  {path: 'update', component : UpdateuserComponent},
  {path: 'delete', component : DeleteuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
