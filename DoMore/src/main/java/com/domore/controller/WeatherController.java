package com.domore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.domore.service.WeatherService;
import com.domore.model.Weather;
import com.domore.model.Forecast;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WeatherController {
    
    @Autowired
    private WeatherService weatherService;
    
    @GetMapping("/current")
    public ResponseEntity<Weather> getCurrentWeather(@RequestParam String city) {
        try {
            Weather weather = weatherService.getCurrentWeather(city);
            return ResponseEntity.ok(weather);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/forecast")
    public ResponseEntity<Forecast> getForecast(@RequestParam String city) {
        try {
            Forecast forecast = weatherService.getForecast(city);
            return ResponseEntity.ok(forecast);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 