import { Component } from '@angular/core';
import { BookRoutingModule } from "../../book-routing.module";
import { RouterModule } from '@angular/router';
import { MenuComponent } from "../../components/menu/menu.component";

@Component({

  selector: 'app-main',
  imports: [BookRoutingModule, MenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
