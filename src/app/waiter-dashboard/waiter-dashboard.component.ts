import { Component } from '@angular/core';
import { FoodService } from '../food.service';

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
  constructor(private foodService:FoodService){}

  ngOnInit(): void {
    this.foodService.getOrderSummary().subscribe({

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
}
