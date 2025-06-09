package com.domore.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.client.RestClientException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.domore.model.Weather;
import com.domore.model.Forecast;
import com.domore.config.WeatherConfig;

@Service
public class WeatherService {
    
    private static final Logger logger = LoggerFactory.getLogger(WeatherService.class);
    private final WeatherConfig weatherConfig;
    private final RestTemplate restTemplate;

    public WeatherService(WeatherConfig weatherConfig) {
        this.weatherConfig = weatherConfig;
        this.restTemplate = new RestTemplate();
        logger.info("WeatherService initialized with API key: {}", weatherConfig.getApi().getKey());
    }

    public Weather getCurrentWeather(String city) {
        try {
            String url = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("api.openweathermap.org")
                .path("/data/2.5/weather")
                .queryParam("q", city)
                .queryParam("units", "metric")
                .queryParam("appid", weatherConfig.getApi().getKey())
                .build()
                .toUriString();
            
            logger.info("Calling OpenWeatherMap API with URL: {}", url);
            Weather response = restTemplate.getForObject(url, Weather.class);
            logger.info("Received weather data for city: {}", city);
            return response;
        } catch (RestClientException e) {
            logger.error("Error fetching weather data for city: {}. Error: {}", city, e.getMessage());
            throw new RuntimeException("Failed to fetch weather data: " + e.getMessage());
        }
    }

    public Forecast getForecast(String city) {
        try {
            String url = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("api.openweathermap.org")
                .path("/data/2.5/forecast")
                .queryParam("q", city)
                .queryParam("units", "metric")
                .queryParam("appid", weatherConfig.getApi().getKey())
                .build()
                .toUriString();
            
            logger.info("Calling OpenWeatherMap Forecast API with URL: {}", url);
            Forecast response = restTemplate.getForObject(url, Forecast.class);
            logger.info("Received forecast data for city: {}", city);
            return response;
        } catch (RestClientException e) {
            logger.error("Error fetching forecast data for city: {}. Error: {}", city, e.getMessage());
            throw new RuntimeException("Failed to fetch forecast data: " + e.getMessage());
        }
    }
} 