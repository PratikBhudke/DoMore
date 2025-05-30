package com.domore.model;

import java.util.List;

public class Weather {
    private Main main;
    private List<WeatherDescription> weather;
    private Wind wind;
    private String name;
    private Sys sys;

    // Nested classes
    public static class Main {
        private double temp;
        private double feels_like;
        private int humidity;
        private int pressure;

        // Getters and Setters
        public double getTemp() { return temp; }
        public void setTemp(double temp) { this.temp = temp; }
        public double getFeels_like() { return feels_like; }
        public void setFeels_like(double feels_like) { this.feels_like = feels_like; }
        public int getHumidity() { return humidity; }
        public void setHumidity(int humidity) { this.humidity = humidity; }
        public int getPressure() { return pressure; }
        public void setPressure(int pressure) { this.pressure = pressure; }
    }

    public static class WeatherDescription {
        private String main;
        private String description;
        private String icon;

        // Getters and Setters
        public String getMain() { return main; }
        public void setMain(String main) { this.main = main; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
    }

    public static class Wind {
        private double speed;

        // Getters and Setters
        public double getSpeed() { return speed; }
        public void setSpeed(double speed) { this.speed = speed; }
    }

    public static class Sys {
        private String country;

        // Getters and Setters
        public String getCountry() { return country; }
        public void setCountry(String country) { this.country = country; }
    }

    // Getters and Setters for main class
    public Main getMain() { return main; }
    public void setMain(Main main) { this.main = main; }
    public List<WeatherDescription> getWeather() { return weather; }
    public void setWeather(List<WeatherDescription> weather) { this.weather = weather; }
    public Wind getWind() { return wind; }
    public void setWind(Wind wind) { this.wind = wind; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Sys getSys() { return sys; }
    public void setSys(Sys sys) { this.sys = sys; }
} 