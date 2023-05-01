import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from '../food.service';
import { Router } from '@angular/router';
import { DialogBoxContentComponent } from '../dialog-box-content/dialog-box-content.component';
import { Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  OrderTokenInfo:any
  subscription !: Subscription;
  call_waiter_status = false
  paid_amount_status = false
  tokenId:any
  payment_mode:any
  payment_mode_btn_status:any
  thank_you_msg = false

  constructor(public dialog: MatDialog,private foodService:FoodService,private router:Router) {}


  ngOnInit(): void {

            this.subscription = timer(0, 2000).pipe(
              switchMap(() => {

                 return  this.OrderTokenInfo? this.foodService.getOrderInfoById(this.tokenId):''

              })
            ).subscribe({
              next:(response)=>{
                  this.OrderTokenInfo = response
                  this.call_waiter_status =  this.OrderTokenInfo.calling_waiter? true:false
                  this.paid_amount_status =  this.OrderTokenInfo.paid_status

              },
              error:(reject)=>{
                      console.log(reject)
              }
          })

  }




  order_status(){
    const dialogRef = this.dialog.open(DialogBoxContentComponent,
      {
      //  disableClose: true ,
      width: '40vw',
      data:{
            mode: 'check_order_status',

        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
        if(result){
              this.tokenId = result
               this.foodService.getOrderInfoById(this.tokenId).subscribe({
                      next:(response=>{
                            this.OrderTokenInfo = response
                            this.call_waiter_status =  this.OrderTokenInfo.calling_waiter? true:false
                      }),
                      error:(reject=>{
                          console.log(reject)
                      })
              })
        }
        else{
           alert('Please Enter Token Number')
        }

   });
  }

  callWaiter(){
    this.OrderTokenInfo.calling_waiter = true
    this.foodService.updateOrderStatus(this.OrderTokenInfo).subscribe({
      next:(response=>{
            this.call_waiter_status=true
      }),
      error:(reject=>{
          console.log(reject)
      })
})
  }

  pay_bill(){
    const dialogRef = this.dialog.open(DialogBoxContentComponent,
      {
      //  disableClose: true ,
      width: '30vw',
      data:{
            mode: 'pay_bill',

        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if(result){

            this.payment_mode_btn_status=`${result} mode Selected, Please wait..`
            this.OrderTokenInfo.payment_mode =  result
            this.foodService.updateOrderStatus(this.OrderTokenInfo).subscribe({
              next:(response=>{
                    this.paid_amount_status=true

              }),
              error:(reject=>{
                  console.log(reject)
              })
            })
      }
      else{
         alert('Please Enter Payment Mode')
      }

     });

  }
  share_experience(){
    const dialogRef = this.dialog.open(DialogBoxContentComponent,
      {
      //  disableClose: true ,
      width: '30vw',
      data:{
            mode: 'share_exp',

        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      this.foodService.rating.subscribe({
         next:(params=>{
          this.OrderTokenInfo.rating = params

          this.foodService.updateOrderStatus(this.OrderTokenInfo).subscribe({
            next:(response=>{
                  this.thank_you_msg = true

            }),
            error:(reject=>{
                console.log(reject)
            })
          })
         })
      })



     });


  }

}
