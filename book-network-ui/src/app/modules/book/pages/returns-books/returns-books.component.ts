import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-returns-books',
  imports: [CommonModule, FormsModule],
  templateUrl: './returns-books.component.html',
  styleUrl: './returns-books.component.scss'
})
export class ReturnsBooksComponent implements OnInit {

  returnedBooks: PageResponseBorrowedBookResponse = {};
    page: number = 0;
    size: number = 3;
    message: string = '';
    level: string = 'success';
    constructor(
      private bookService: BookService,
      private toastrService: ToastrService

    ) {

    }

    ngOnInit(): void {
      this.findAllReturnedBooks();
    }



    private findAllReturnedBooks() {
      this.bookService
        .findAllReturnedBooks({
          page: this.page,
          size: this.size,
        })
        .subscribe({
          next: (resp: PageResponseBorrowedBookResponse): void => {
            this.returnedBooks = resp;
          },
        });
    }
      goToLastPage() {
   this.page = this.returnedBooks.totalPages as number - 1;
      this.findAllReturnedBooks();
    }
    goToNextPage() {
      this.page++;
      this.findAllReturnedBooks();
    }
    goToPage(page: number) {
      this.page = page;
      this.findAllReturnedBooks();
    }
    goToPreviousPage() {
      this.page--;
      this.findAllReturnedBooks();
    }
    goToFirstPage() {
      this.page = 0;
      this.findAllReturnedBooks();
    }

    get isLastPage(): boolean {
      return this.page == this.returnedBooks.totalPages as number - 1;
    }


    approveBookReturn(book: BorrowedBookResponse):void {
      if(!book.returned) {
        this.level = 'error';
        this.message = 'The post is not yet rated';
        return;
      }

      this.bookService.approveReturnBorrowBook({
        'book-id': book.id as number
      }).subscribe({
        next: ():void => {
          this.toastrService.success('Post rate approved', "Done!");
          this.findAllReturnedBooks();
        }
      });
    }
}
