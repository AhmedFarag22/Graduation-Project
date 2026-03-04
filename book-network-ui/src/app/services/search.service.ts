import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponseBookResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly API_URL = 'http://localhost:8088/api/v1/books/search';

  constructor(private http: HttpClient) {}

searchBooks(params: {
  page: number;
  size: number;
  title?: string;
}) {
  return this.http.get<PageResponseBookResponse>(
    'http://localhost:8088/api/v1/books/search',
    { params }
  );
}

searchMyBooks(params: {
  page: number;
  size: number;
  title?: string;
}) {
  return this.http.get<PageResponseBookResponse>(
    'http://localhost:8088/api/v1/books/my-books/search',
    { params }
  );
}



}
