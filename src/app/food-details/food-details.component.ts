import { Component, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent {
    qty  = 0
    selectedFood:any=[]
    total = 0
   @Input() foodDetails:any
   @Output() childEvent = new EventEmitter()

   changeQty(food: any ,value:any){ 
    
    if(food){
        //increment quantity
        if(value==='minus'){
            food.qty = food.qty - 1
        }
        else{
          food.qty = food.qty + 1
        }
       //check qty must be greater than 0
        if(food.qty < 0){
            food.qty = 0
            alert('Food Quantity value must be greater than 0 ')
        }
        else{
          //working on existing food quantity
            let existingFood =  this.selectedFood.find((sf:any)=>sf.name==food.name)      
            if(existingFood){
                      //remove process once qty is 0
                      let currentFoodQty = value==='minus'?existingFood.qty-1:existingFood.qty+1                   
                      if(currentFoodQty==0){
                          let currentFoodIndex = this.selectedFood.indexOf(existingFood)
                          this.selectedFood.splice(currentFoodIndex,1)
                      }
                      else{
                      
                        existingFood.qty = value==='minus'?existingFood.qty-1:existingFood.qty+1
                        existingFood.price=value==='minus'?existingFood.price-food.price:existingFood.price+food.price
                      }
                      
                      
                    
            }
            else{   
              //working on new food quantity       
                let foodSelected = {
                    qty : food.qty,
                    name: food.name,
                    price: food.price
                }
                this.selectedFood.push(foodSelected)

              }
        }
        
    }    
    this.childEvent.emit(this.selectedFood)
      
   }

   counter(i: number) {
    return new Array(i);
  }

 
}
