package com.whattowatch;

import com.whattowatch.model.Family;
import com.whattowatch.model.User;
import com.whattowatch.model.VisualMedia;
import com.whattowatch.repository.FamilyRepository;
import com.whattowatch.repository.UserRepository;
import com.whattowatch.repository.VisualMediaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class WhatToWatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhatToWatchApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(FamilyRepository familyRepository, UserRepository userRepository, VisualMediaRepository visualMediaRepository) {
		User firstUser = new User(null, "Sérgio Giordanno", 29, "sergio@teste.com", new HashSet<>());
		User secondUser = new User(null, "Gabriella Medeiros", 30, "gabriella@teste.com", new HashSet<>());

		return args -> {
			userRepository.save(firstUser);
			userRepository.save(secondUser);

			// Save Family
			Family lunaFamily = new Family(null, "Luna", new HashSet<>(Set.of(firstUser, secondUser)));
			familyRepository.save(lunaFamily);

			// Associate family to users
			firstUser.getFamilies().add(lunaFamily);
			secondUser.getFamilies().add(lunaFamily);

			userRepository.save(firstUser);
			userRepository.save(secondUser);

			// Save VisualMedia
			visualMediaRepository.save(new VisualMedia(null, "The Matrix", 5, "Sérgio Giordanno"));
			visualMediaRepository.save(new VisualMedia(null, "The Godfather", 5, "Gabriella Medeiros"));
		};
	}


}
