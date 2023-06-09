import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../interfaces/patient.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Patient
  ) { }

  onNoClick():void{
    this.dialogRef.close(false);
  }

  onConfirm():void{
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
