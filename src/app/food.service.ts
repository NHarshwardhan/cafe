import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, share, tap, timer,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  // url = 'http://localhost:3000'
  url = 'https://json-server-five-green.vercel.app/'

  constructor(private http: HttpClient) { }
  rating = new BehaviorSubject<any>(0)

  getFoodsMenu():Observable<any>{
     return this.http.get(`${this.url}/foodsMenu`)
  }

  saveOrderSummary(orderInfo:any):Observable<any>{
     return this.http.post(
           `${this.url}/orderedMenu`,
            orderInfo,
            {
              headers: new HttpHeaders({'content-type':'application/json'})
            }

            )
  }

  getOrderInfoById(token:number):Observable<any>{
    return this.http.get(`${this.url}/orderedMenu/${token}`)
 }

  getOrderSummary():Observable<any>{
    return this.http.get(`${this.url}/orderedMenu`)
 }

// getOrderSummary():Observable<any>{
//   return this.http.get(`${this.url}/orderedMenu`).pipe(tap((data:any) => this.data = data),
//     switchMap((data:any) => forkJoin(data.map(this.getSingleEntry)));
//   )
// }

 updateOrderStatus(orderInfo:any):Observable<any>{
  return this.http.put(
        `${this.url}/orderedMenu/${orderInfo.id}`,
         orderInfo,
         {
           headers: new HttpHeaders({'content-type':'application/json'})
         }

         )
}
}
