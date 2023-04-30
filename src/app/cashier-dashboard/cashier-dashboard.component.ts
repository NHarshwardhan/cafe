import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { switchMap } from 'rxjs/operators';
import { Subscription, interval, timer } from 'rxjs';
@Component({
  selector: 'app-cashier-dashboard',
  templateUrl: './cashier-dashboard.component.html',
  styleUrls: ['./cashier-dashboard.component.css']
})
export class CashierDashboardComponent implements OnInit, OnDestroy{

  orderDetails:any
  subscription !: Subscription;
  constructor(private foodService:FoodService){}


  ngOnInit(): void {
  //   this.foodService.getOrderSummary().subscribe({

  //     next:(response)=>{
  //         this.orderDetails = response

  //     },
  //     error:(reject)=>{
  //             console.log(reject)
  //     }
  //  })

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

    //  interval(2000).subscribe(()=>{
    //   this.foodService.getOrderSummary().subscribe({

    //         next:(response)=>{
    //             this.orderDetails = response

    //         },
    //         error:(reject)=>{
    //                 console.log(reject)
    //         }
    //      })
    //  })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
