import { AfterViewChecked, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-dialog-box-content',
  templateUrl: './dialog-box-content.component.html',
  styleUrls: ['./dialog-box-content.component.css']
})
export class DialogBoxContentComponent implements OnInit {

  agree ='yes'
  token:any
  rating = 3
  totalStar: number = 5;
  ratingArray: number[] = [];
  new = 0

  constructor(public dialogRef: MatDialogRef<DialogBoxContentComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private foodService:FoodService) {}




  ngOnInit(): void {
    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);
    }
  }


  closeDialog(){
    this.dialogRef.close();
  }

  counter(i: number) {
    return new Array(i);
  }

  calculateRating(rating: number) {
    // console.log(rating)
    this.foodService.rating.next(rating)
  }

  iconStatus(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
