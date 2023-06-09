import { Component, OnInit } from '@angular/core';
import { Patient } from '../../interfaces/patient.interface';
import { PatientServiceService } from '../../services/patient-service.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public patients: Patient[]=[];



 

  constructor(private patientsService:PatientServiceService) { }

 

  ngOnInit(): void {

    this.patientsService.getPatients()
      .subscribe(patients => this.patients = patients);

  }

  calculateAge(fechaNacimiento: string):number{
    let nacimiento = new Date(fechaNacimiento);
    let timeDiff = Math.abs(Date.now()  - nacimiento.getTime());
    return Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
  }

}
