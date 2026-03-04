package com.farag.book.history;

import com.farag.book.book.Book;
import com.farag.book.common.BaseEntity;
import com.farag.book.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BookTransactionHistory extends BaseEntity {

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
    @Column(name = "user_id")
    private String userId;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    // book relationship

    private boolean returned;
    private boolean returnedApproved;

}
