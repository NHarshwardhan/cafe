import { Component } from '@angular/core';
import { FoodService } from '../food.service';
import { switchMap,Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-waiter-dashboard',
  templateUrl: './waiter-dashboard.component.html',
  styleUrls: ['./waiter-dashboard.component.css']
})
export class WaiterDashboardComponent {
  orderDetails:any
  btnAcceptDisable =  false
  btnPrepareDisable =  false
  btnDeliverDisable =  false
  orderTokenId = 0
  subscription !: Subscription;
  constructor(private foodService:FoodService){}

  ngOnInit(): void {
    this.subscription = timer(0, 2000).pipe(
      switchMap(() => this.foodService.getOrderSummary())
    ).subscribe({
      next:(response)=>{
          this.orderDetails = response

      },
      error:(reject)=>{
              console.log(reject)
      }
   })
  }

  orderProcessInfo(orderInfo: any, status:string){
    console.log(status)
        this.orderTokenId = orderInfo.id
        if(status=='accept'){
             orderInfo.order_accepted= true
          }
          else if(status=='prepare'){
            orderInfo.order_preparing= true
          }
          else{
            orderInfo.order_delivered= true
          }

        orderInfo.orderCompleted = status
        this.foodService.updateOrderStatus(orderInfo).subscribe({
          next:()=>{

          },
          error:(reason=>{
            console.log(reason)
          })
        })
  }

  customer_attended(orderInfo:any){

      orderInfo.calling_waiter = false
      this.foodService.updateOrderStatus(orderInfo).subscribe({
        next:()=>{

        },
        error:(reason=>{
          console.log(reason)
        })
      })
  }

  paid(orderInfo:any){
    orderInfo.paid_status = true
    this.foodService.updateOrderStatus(orderInfo).subscribe({
      next:()=>{

      },
      error:(reason=>{
        console.log(reason)
      })
    })
  }
}
