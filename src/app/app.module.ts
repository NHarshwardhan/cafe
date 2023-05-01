import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogBoxContentComponent } from './dialog-box-content/dialog-box-content.component';
import { HttpClientModule } from '@angular/common/http';
import { FoodDetailsComponent } from './food-details/food-details.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import { CashierDashboardComponent } from './cashier-dashboard/cashier-dashboard.component';
import { WaiterDashboardComponent } from './waiter-dashboard/waiter-dashboard.component';
import { HomeComponent } from './home/home.component'
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    DialogBoxContentComponent,
    FoodDetailsComponent,
    CashierDashboardComponent,
    WaiterDashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,MatIconModule,MatDialogModule,
    HttpClientModule,MatButtonToggleModule,FormsModule,MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
