package com.datasoft.backendds.config;

import com.datasoft.backendds.model.Book;
import com.datasoft.backendds.model.Genre;
import com.datasoft.backendds.model.Role;
import com.datasoft.backendds.model.User;
import com.datasoft.backendds.repository.BookRepository;
import com.datasoft.backendds.repository.GenreRepository;
import com.datasoft.backendds.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedData(
            GenreRepository genreRepository,
            BookRepository bookRepository,
            UserRepository userRepository
    ) {
        return args -> {
            if (genreRepository.count() > 0) {
                return;
            }

            Genre fiction = genreRepository.save(Genre.builder()
                    .name("Ficcion")
                    .description("Narrativa literaria y novelas")
                    .build());
            Genre technology = genreRepository.save(Genre.builder()
                    .name("Tecnologia")
                    .description("Libros tecnicos y desarrollo de software")
                    .build());
            Genre history = genreRepository.save(Genre.builder()
                    .name("Historia")
                    .description("Textos historicos y biografias")
                    .build());

            bookRepository.save(Book.builder()
                    .title("Clean Code")
                    .author("Robert C. Martin")
                    .isbn("9780132350884")
                    .description("Buenas practicas para escribir codigo mantenible.")
                    .publishedYear(2008)
                    .price(45.99)
                    .genre(technology)
                    .build());
            bookRepository.save(Book.builder()
                    .title("Cien anios de soledad")
                    .author("Gabriel Garcia Marquez")
                    .isbn("9780307474728")
                    .description("Novela representativa del realismo magico.")
                    .publishedYear(1967)
                    .price(19.99)
                    .genre(fiction)
                    .build());
            bookRepository.save(Book.builder()
                    .title("Sapiens")
                    .author("Yuval Noah Harari")
                    .isbn("9780062316097")
                    .description("Breve historia de la humanidad.")
                    .publishedYear(2011)
                    .price(22.50)
                    .genre(history)
                    .build());

            userRepository.save(User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .email("admin@datasoft.test")
                    .role(Role.ADMIN)
                    .favoriteGenre(technology)
                    .build());
        };
    }
}
