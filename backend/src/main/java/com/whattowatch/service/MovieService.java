package com.whattowatch.service;

import com.whattowatch.model.Movie;
import com.whattowatch.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    public List<Movie> getAllMovies() { return repository.findAll(); }
    public Movie saveMovie(Movie movie) { return repository.save(movie); }
    public void deleteMovie(Long id) { repository.deleteById(id); }
}