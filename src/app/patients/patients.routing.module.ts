import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';


const routes: Routes = [
  {
    path:'',
    component: LayoutPageComponent,
    children:[
      { path:'new-patient', component: NewPageComponent}, 
      { path:'edit/:id', component: NewPageComponent}, 
      { path:'list', component: ListPageComponent}, 
      { path:':id', component: PatientPageComponent}, 
      { path:'**', redirectTo:'list'}, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
