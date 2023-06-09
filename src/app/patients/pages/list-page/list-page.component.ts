import { Component, OnInit } from '@angular/core';
import { Patient } from '../../interfaces/patient.interface';
import { PatientServiceService } from '../../services/patient-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public patients: Patient[]=[];
  columnas: string[] = ['dni', 'first_name',
  'last_name',
  'email',
  'phones',
  'edad',
  'ciudad',
  'acciones'];


  constructor(private patientsService:PatientServiceService) { }
  dataSource:any;

  ngOnInit(): void {

    this.patientsService.getPatients()
      .subscribe(patients => {
        this.patients = patients;
        this.dataSource = new MatTableDataSource(patients);
      });

    

  }

  calculateAge(fechaNacimiento: string):number{
    let nacimiento = new Date(fechaNacimiento);
    let timeDiff = Math.abs(Date.now()  - nacimiento.getTime());
    return Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

}
