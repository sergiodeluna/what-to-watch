package com.whattowatch;

import com.whattowatch.model.User;
import com.whattowatch.model.VisualMedia;
import com.whattowatch.repository.UserRepository;
import com.whattowatch.repository.VisualMediaRepository;
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
	CommandLineRunner initDatabase(UserRepository userRepository, VisualMediaRepository visualMediaRepository) {
		return args -> {
			userRepository.save(new User(null,"Sérgio Giordanno",29,"sergio@teste.com"));
			userRepository.save(new User(null,"Gabriella Medeiros",30,"gabriella@teste.com"));
			visualMediaRepository.save(new VisualMedia(null,"The Matrix",5, "Sérgio Giordanno"));
			visualMediaRepository.save(new VisualMedia(null,"The Godfather",5,"Gabriella Medeiros"));
		};
	}

}
