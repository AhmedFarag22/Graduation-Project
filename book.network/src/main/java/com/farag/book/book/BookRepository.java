package com.farag.book.book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;



public interface BookRepository extends JpaRepository<Book, Integer>, JpaSpecificationExecutor<Book> {

    @Query("""
            SELECT book
            FROM Book book
            WHERE book.archived = false
            AND book.shareable = true
            AND book.createdBy != :userId
            """)
    Page<Book> findAllDisplayableBooks(Pageable pageable, String userId);


    @Query("""
    SELECT book
    FROM Book book
    WHERE book.archived = false
      AND book.shareable = true
      AND book.createdBy != :userId
      AND LOWER(book.title) LIKE LOWER(CONCAT('%', :title, '%'))
""")
    Page<Book> searchDisplayableBooksByTitle(
            Pageable pageable,
            String userId,
            String title
    );

    @Query("""
    SELECT book
    FROM Book book
    WHERE book.archived = false
      AND book.createdBy = :userId
      AND LOWER(book.title) LIKE LOWER(CONCAT('%', :title, '%'))
""")
    Page<Book> searchMyBooksByTitle(
            Pageable pageable,
            String userId,
            String title
    );


}


