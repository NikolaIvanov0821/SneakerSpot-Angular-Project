import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';
import { TestComponent } from './test/test.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'test', component: TestComponent },
    {
        path: 'products',
        children: [
            {
                path: '', component: ProductsCatalogComponent
            },
            {
                path: ':productId', component: ProductDetailsComponent
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: UserProfileComponent }
];
