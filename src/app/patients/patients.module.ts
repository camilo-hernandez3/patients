import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { PatientsRoutingModule } from './patients.routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    PatientPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    MaterialModule,
  
  ],
})
export class PatientsModule {}
