import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpTokenInterceptor } from '../../services/interceptor/http-token.interceptor';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { authGuard } from '../../services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/book-list/book-list.component').then(m => m.BookListComponent),
        //component: BookListComponent
        canActivate: [authGuard],
      },
      {
        path: 'my-books',
        loadComponent: () => import('./pages/my-books/my-books.component').then(m => m.MyBooksComponent),
        //component: MyBooksComponent
        canActivate: [authGuard],
      },
      {
        path: 'manage',
        loadComponent: () => import('./pages/manage-book/manage-book.component').then(m => m.ManageBookComponent),
        //component: ManageBookComponent
        canActivate: [authGuard],
      },
      {
        path: 'manage/:bookId',
        loadComponent: () => import('./pages/manage-book/manage-book.component').then(m => m.ManageBookComponent),
        //component: ManageBookComponent
        canActivate: [authGuard],
      },
      {
        path: 'my-borrowed-books',
        loadComponent: () => import('./pages/borrowed-book-list/borrowed-book-list.component').then(m => m.BorrowedBookListComponent),
        //component: ManageBookComponent
        canActivate: [authGuard],
      },
      {
        path: 'my-returned-books',
        loadComponent: () => import('./pages/returns-books/returns-books.component').then(m => m.ReturnsBooksComponent),
        //component: ManageBookComponent
        canActivate: [authGuard],
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
