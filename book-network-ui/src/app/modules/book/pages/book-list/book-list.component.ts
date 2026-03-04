import { Component, OnInit } from '@angular/core';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from "../../components/book-card/book-card.component";
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../../../../services/search.service';
@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookCardComponent, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{

  bookResponse: PageResponseBookResponse = {};
  page:number = 0;
  size:number = 20;
  message: string = '';
  level:string = 'success';

  constructor(
    private bookService: BookService,
    private service: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService
  ) {

  }

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.page = +params['page'] || 0;
    this.size = +params['size'] || 10;
    const title = params['title'];

    this.loadBooks(title);
  });
}

private loadBooks(title?: string) {

  // لو مفيش تايتل أو فاضي أو All
  if (!title || title.trim() === '' || title === 'All') {
    this.findAllBooks();
    return;
  }

  // غير كده Search
  this.searchBooks(title);
}


searchTitle: string = '';
searchCategory: string = '';


onSearch() {
  this.router.navigate(['/books'], {
    queryParams: {
      page: 0,
      size: 10,
      title: this.searchTitle?.trim() || null
    }
  });
}

private searchBooks(title?: string) {
  this.service.searchBooks({
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
    this.bookService.findAllBooks({
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

  borrowBook(book: BookResponse) {
    this.message = '';
    this.bookService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: ():void => {
        this.toasterService.success('Post Successfully added to your list', "Done!");
      },
      error: (err):void => {
        console.log(err);
        this.toasterService.error(err.error.error, 'Oups!!');


      }
    })
}

}
