import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, catchError,  } from 'rxjs/operators';
import { City, Patient } from '../interfaces/patient.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PatientServiceService {

  private urlBase: string = environment.urlBase;
  pipe = new DatePipe('en-US');

  headers = new HttpHeaders({ 'key': 'c2330fce0ce03c10571d888c2a8d7181' });
  requestOptions = { headers: this.headers };

  constructor(private http: HttpClient) {

  }


 
 

  getPatients(): Observable<Patient[]> {
    
    return this.http .get<Patient[]>(`${this.urlBase}/patient`, this.requestOptions );
      
  }

  getPatientById(id: string):Observable<Patient>{

    return this.http.get<Patient>(`${this.urlBase}/patient/${id}`, this.requestOptions );

  }


  addPatient(patient: Patient): Observable<boolean>{

    // let newDate = new Date(patient.birthdate).toLocaleDateString();
    
    // console.log(newDate);
    patient.birthdate = this.pipe.transform(patient.birthdate, 'yyyy/MM/dd')!;
    

    return this.http.post(`${this.urlBase}/patient`, patient,{
      headers: this.headers
    })
    .pipe(
      catchError(err=>{console.log(err); return of(false);}),
      map(resp => true)
    );

  }

  updatePatient(patient: Patient):Observable<boolean>{

    if(!patient.patient_id) throw Error('Patient id is required');

    patient.birthdate = this.pipe.transform(patient.birthdate, 'yyyy/MM/dd')!;

    return this.http.put(`${this.urlBase}/patient/${patient.patient_id}`, patient,{
      headers: this.headers
    })
    .pipe(
      catchError(err=>{console.log(err); return of(false);}),
      map(resp => true)
    );;
  }


  deletePatient(id: number):Observable<boolean>{

    if(!id) throw Error('Patient id is required');

    return this.http.delete(`${this.urlBase}/patient/${id}`,{
      headers: this.headers
    })
    .pipe(
      catchError(err=> of(false)),
      map(resp => true)
    );
  }

  


  getCities(): Observable<City[]>{
    
    return this.http.get<City[]>(`${this.urlBase}/city`, this.requestOptions );
  }
}
