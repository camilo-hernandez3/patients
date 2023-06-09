import { Component, OnInit } from '@angular/core';
import { City, Patient } from '../../interfaces/patient.interface';
import { PatientServiceService } from '../../services/patient-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public cities: City[] =[];

  public patientForm  = new FormGroup({
    patient_id: new FormControl(0),
    dni: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    phones: new FormControl(''),
    birthdate: new FormControl(''),
    city_id: new FormControl(1),
  });



  constructor(
      private patientService:PatientServiceService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private snackbar: MatSnackBar,
      private dialog: MatDialog
  ) { }

  get currentPatient():Patient{

    const patient = this.patientForm.value;
    console.log(patient);
    return patient;
  }

  ngOnInit(): void {

    this.patientService.getCities()
      .subscribe(cities => this.cities = cities);

    if( !this.router.url.includes('edit'))  return;

    this.activatedRoute.params 
      .pipe(
        switchMap(({id})=> this.patientService.getPatientById(id))
      ).subscribe(patient=>{
        if(!patient.patient_id) return this.router.navigateByUrl('/patients/list');

        this.patientForm.reset(patient);
        return;
      });
      
  }

  onSubmit():void{

    if(this.patientForm.invalid) return;

    if(this.currentPatient.patient_id){

      this.patientService.updatePatient(this.currentPatient)
        .subscribe(est=> {
          this.showSnackbar(`The patient was updated`);
        });
      return;

    }

    this.patientService.addPatient(this.currentPatient)
      .subscribe(est =>{
        this.showSnackbar('The patient was created');
        this.router.navigateByUrl('/patients/list');
         
    });
    
  }

  onDeletePatient(){
    if(!this.currentPatient.patient_id ) throw Error('Patient id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: this.patientForm.value
    });

    dialogRef.afterClosed().subscribe(result =>{
        if(!result) return;

        this.patientService.deletePatient(this.currentPatient.patient_id)
          .subscribe(res=>{
              if(res)
                this.showSnackbar('The patient was deleted');
                this.router.navigate(['/patients']);
 
          });

    });

  }

  showSnackbar(message: string): void{
    this.snackbar.open(message, 'done',{
      duration: 2500,
    })
  }

}
