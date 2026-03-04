import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRequest, BookResponse } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../../../services/services';
import { ToastrService } from 'ngx-toastr';
import { KeycloakService } from '../../../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-manage-book',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit{

  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    sharable: false ,
    synopsis: '',
    title: '',
    createdByName: ''
  }

  errorMsg: Array<string> = [];
  selectedBookCover: any;
  selectedPicture: string | undefined;


  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private keycloak: KeycloakService
  ) {}

  ngOnInit(): void {
    this.bookRequest.createdByName =
    this.keycloak.profile?.username as string;
    
    const firstName = this.keycloak.profile?.firstName ?? '';
    const lastName = this.keycloak.profile?.lastName ?? '';
    this.bookRequest.createdByName = `${firstName} ${lastName}`.trim();

    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.findBookId({
        'book-id': bookId
      }).subscribe({
        next: (book: BookResponse):void => {
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            sharable: book.shareable,
            createdByName: `${firstName} ${lastName}`.trim() as string,
          }
          if (book.cover) {
            this.selectedPicture = 'data:image/jpg;base64,' + book.cover;
          }
        }
      })
    }
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);
    if (this.selectedBookCover) {
      const reader:FileReader = new FileReader();
      reader.onload = ():void => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }

  }

  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId:number): void => {
        this.bookService.uploadBookCoverPicture({
          'book-id': bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next: ():void => {
            this.toastrService.success('Post information has been successfully saved', 'Done!');
            this.router.navigate(['/books/my-books']);
          }
        })
      },
      error: (err):void => {
        this.toastrService.error('Something went wrong', 'Oups!');
        this.errorMsg = err.error.validationError;
      }
    })
  }
}
