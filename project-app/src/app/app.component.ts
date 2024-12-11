import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from "./test/test.component";
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';
import { FooterComponent } from "./core/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'project-app';
}
