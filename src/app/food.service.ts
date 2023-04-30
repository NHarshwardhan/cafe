import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, share, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  url = 'https://json-server-five-green.vercel.app'

  constructor(private http: HttpClient) { }

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
