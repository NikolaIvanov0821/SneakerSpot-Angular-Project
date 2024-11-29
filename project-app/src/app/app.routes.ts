import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsCatalogComponent }
];
