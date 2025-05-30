package com.domore.model;

import java.util.List;

public class Forecast {
    private List<ForecastItem> list;

    public static class ForecastItem {
        private String dt_txt;
        private Weather.Main main;
        private List<Weather.WeatherDescription> weather;

        // Getters and Setters
        public String getDt_txt() { return dt_txt; }
        public void setDt_txt(String dt_txt) { this.dt_txt = dt_txt; }
        public Weather.Main getMain() { return main; }
        public void setMain(Weather.Main main) { this.main = main; }
        public List<Weather.WeatherDescription> getWeather() { return weather; }
        public void setWeather(List<Weather.WeatherDescription> weather) { this.weather = weather; }
    }

    // Getters and Setters
    public List<ForecastItem> getList() { return list; }
    public void setList(List<ForecastItem> list) { this.list = list; }
} 