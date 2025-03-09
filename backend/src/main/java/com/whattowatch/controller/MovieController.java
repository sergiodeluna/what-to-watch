package com.whattowatch.controller;

import com.whattowatch.model.Movie;
import com.whattowatch.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    private MovieService service;

    @GetMapping
    public List<Movie> getAllMovies() { return service.getAllMovies(); }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) { return service.saveMovie(movie); }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) { service.deleteMovie(id); }
}