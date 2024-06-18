import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ContactviewComponent } from './contactview/contactview.component';
import { ContacteditComponent } from './contactedit/contactedit.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'contactlist',
    component: ContactlistComponent
  },
  {
    path:'contactview/:id',
    component: ContactviewComponent
  },
  {
    path:'contactedit/:id',
    component: ContacteditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }