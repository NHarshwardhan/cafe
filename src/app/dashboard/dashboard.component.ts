import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxContentComponent } from '../dialog-box-content/dialog-box-content.component';
import { FoodService } from '../food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  foodsMenu:any
  foodDetailsStatus = false
  foodDetails:any
  foodSelectionForProces:any
  order_note:any
  order_button_status = false

  constructor(public dialog: MatDialog,private foodService:FoodService,private router:Router) {}

  ngOnInit(): void {
      this.foodService.getFoodsMenu().subscribe({

         next:(response)=>{
             this.foodsMenu = response
         },
         error:(reject)=>{
                 console.log(reject)
         }
      })
  }

  callDialog(selectedButton: string){
    const dialogRef = this.dialog.open(DialogBoxContentComponent,
       {
        width: '50vw',
        data:{
             mode: selectedButton
        }
       }
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showFoodDetails(foodInfo:any){
     this.foodDetailsStatus = true
     this.foodDetails=foodInfo
  }
  selectedFood(selectedFood:any){
      this.foodSelectionForProces = selectedFood
  }

  getTotal(){
     let  payableAmount = 0
     this.foodSelectionForProces.forEach((fd:any)=>{
         payableAmount+=fd.price
     })
     return payableAmount

  }
  passOrderToWaiter(){

      let orderDetails = {order_summary:[...this.foodSelectionForProces],total_amount:this.getTotal(),note:this.order_note,orderCompleted: "waiting",order_preparing: false,order_accepted: false, order_delivered: false, calling_waiter:false,payment_mode:"",paid_status:false,rating:0}
      const dialogRef = this.dialog.open(DialogBoxContentComponent,
        {
        width: '50vw',
        data:{
              mode: 'confirmation'
         }
        }
      );

    dialogRef.afterClosed().subscribe((result:any)=>{
          let agree = result
          if(agree=='yes'){
                this.foodService.saveOrderSummary(orderDetails).subscribe({
                  next:(response=>{

                        const dialogRef = this.dialog.open(DialogBoxContentComponent,
                          {
                           disableClose: true ,
                          width: '50vw',
                          data:{
                                mode: 'passed_order',
                                tokenId: response.id
                            }
                          }
                        );

                      dialogRef.afterClosed().subscribe(result => {
                         this.order_button_status= true


                         if(result=='yes'){

                             this.foodService.getFoodsMenu().subscribe({

                              next:(response)=>{
                                  this.foodsMenu = response
                                  this.foodDetailsStatus=false
                                  this.order_button_status= false
                                  this.order_note=''
                                  this.foodSelectionForProces=[]
                                  this.router.navigate(['/home'])
                              },
                              error:(reject)=>{
                                      console.log(reject)
                              }
                           })

                         }

                      });
                  }),
                  error:(reject=>{
                      console.log(reject)
                  })
              })

          }

    });
    // console.log(orderDetails)


  }

}
