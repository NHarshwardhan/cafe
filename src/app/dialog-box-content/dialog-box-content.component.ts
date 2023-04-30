import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box-content',
  templateUrl: './dialog-box-content.component.html',
  styleUrls: ['./dialog-box-content.component.css']
})
export class DialogBoxContentComponent {
  
  agree ='yes'
  constructor(public dialogRef: MatDialogRef<DialogBoxContentComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}


  closeDialog(){
    this.dialogRef.close();
  }
}
