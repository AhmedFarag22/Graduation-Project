import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageResponseBookResponse } from '../../../../services/models/page-response-book-response';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { BookResponse } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from "../../components/book-card/book-card.component";
import { RouterModule } from '@angular/router';
import { SearchService } from '../../../../services/search.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-books',
  imports: [CommonModule, BookCardComponent, RouterModule, FormsModule],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit{

 bookResponse: PageResponseBookResponse = {};
  page:number = 0;
  size:number = 20;


  constructor(
    private bookService: BookService,
    private router: Router,
   
    private service: SearchService,

    private route: ActivatedRoute,
    private toasterService: ToastrService
  ) {

  }

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.page = +params['page'] || 0;
    this.size = +params['size'] || 10;
    const title = params['title'];

    this.loadMyBooks(title);
  });
}

private loadMyBooks(title?: string) {

  // لو مفيش تايتل أو فاضي أو All
  if (!title || title.trim() === '' || title === 'All') {
    this.findAllBooks();
    return;
  }

  // غير كده Search
  this.searchMyBooks(title);
}



searchTitle: string = '';



onSearch() {
  this.router.navigate(['/books/my-books'], {
    queryParams: {
      page: 0,
      size: 10,
      title: this.searchTitle?.trim() || null
    }
  });
}


private searchMyBooks(title?: string) {
  this.service.searchMyBooks({   
    page: this.page,
    size: this.size,
    title: title
  }).subscribe({
    next: (books) => {
      this.bookResponse = books;
    }
  });
}




  private findAllBooks() {
    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books: PageResponseBookResponse): void => {
        this.bookResponse = books;
      }
    })
  }


  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }
  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }
  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }
  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id]);
  }

  shareBook(book: BookResponse) {
    this.bookService.updateShareableStatus({
      'book-id': book.id as number
    }).subscribe({
      next: ():void => {
        book.shareable = !book.shareable;

      }
    });
  }

  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number
    }).subscribe({
      next: (): void => {
        book.archived = !book.archived;
      }
    });
  }

}
