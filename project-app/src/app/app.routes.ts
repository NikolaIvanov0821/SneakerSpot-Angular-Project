import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';
import { TestComponent } from './test/test.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { userGuard } from './guards/user.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

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
    { path: 'login', component: LoginComponent, canActivate: [userGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [userGuard] },
    { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: '**', redirectTo: 'error' },
    { path: 'error', component: ErrorPageComponent }
];
