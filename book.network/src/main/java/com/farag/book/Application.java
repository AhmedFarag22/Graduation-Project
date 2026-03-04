package com.farag.book;

import com.farag.book.book.Book;
import com.farag.book.book.BookRepository;
import com.farag.book.role.Role;
import com.farag.book.role.RoleRepository;
import com.farag.book.user.User;
import com.farag.book.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

//	@Bean
//	public CommandLineRunner runner(RoleRepository roleRepository, BookRepository bookRepository, UserRepository userRepository) {
//		return args -> {
//			if (roleRepository.findByName("USER").isEmpty()) {
//				roleRepository.save(
//						Role.builder().name("USER").build()
//				);
//			}
//
//			if (bookRepository.findById(2).isEmpty()) {
//				User owner = userRepository.findById(2)
//						.orElseThrow(() -> new RuntimeException("User not found"));
//
//				Book book = Book.builder()
//						.title("Clean Code")
//						.authorName("Robert C. Martin")
//						.isbn("9780132350884")
//						.synopsis("A Handbook of Agile Software Craftsmanship.")
//						.bookCover("")
//						.archived(false)
//						.shareable(true)
//						.owner(owner)
//						.build();
//
//				bookRepository.save(book);
//			}
//		};
//	}
}
