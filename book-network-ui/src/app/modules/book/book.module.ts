import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookRoutingModule
  ],
providers: [
    

  ]

})
export class BookModule { }
