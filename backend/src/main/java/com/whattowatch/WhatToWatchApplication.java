package com.whattowatch;

import com.whattowatch.model.Movie;
import com.whattowatch.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WhatToWatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhatToWatchApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(MovieRepository repository) {
		return args -> {
			repository.save(new Movie(null, "The Matrix", 5, "Sérgio Giordanno"));
			repository.save(new Movie(null, "The Godfather ", 5, "André Manoel"));
		};
	}

}
