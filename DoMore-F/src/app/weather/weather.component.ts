import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService, WeatherData, ForecastData } from '../services/weather.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  standalone: false,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  weatherForm!: FormGroup;
  currentWeather: WeatherData | null = null;
  forecast: ForecastData | null = null;
  loading = false;
  error = '';
  defaultCity = 'Pune';
  suggestions: string[] = [];
  private readonly minSearchLength = 3;

  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.weatherForm = this.fb.group({
      city: ['', Validators.required]
    });

    // Load default city weather
    this.getWeather(this.defaultCity);

    // Add search input listener
    this.weatherForm.get('city')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(value => value && value.length >= this.minSearchLength)
    ).subscribe(value => {
      this.handleSearchInput(value);
    });
  }

  getWeather(city: string) {
    this.loading = true;
    this.error = '';

    // Get current weather
    this.weatherService.getCurrentWeather(city).subscribe({
      next: (data) => {
        this.currentWeather = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load weather data. Please try again.';
        this.loading = false;
      }
    });

    // Get forecast
    this.weatherService.getForecast(city).subscribe({
      next: (data) => {
        this.forecast = data;
      },
      error: (error) => {
        this.error = 'Failed to load forecast data. Please try again.';
      }
    });
  }

  onSubmit() {
    if (this.weatherForm.valid) {
      const city = this.weatherForm.get('city')?.value;
      this.getWeather(city);
    }
  }

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }

  // Helper method to format temperature
  formatTemp(temp: number): string {
    return `${Math.round(temp)}°C`;
  }

  // Get only the next 5 days forecast
  get forecastDays() {
    if (!this.forecast) return [];
    
    const uniqueDays = new Map();
    return this.forecast.list.filter(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!uniqueDays.has(date)) {
        uniqueDays.set(date, true);
        return true;
      }
      return false;
    }).slice(1, 6); // Skip today, get next 5 days
  }

  clearSearch(): void {
    this.weatherForm.get('city')?.reset();
    this.suggestions = [];
  }

  selectSuggestion(city: string): void {
    this.weatherForm.get('city')?.setValue(city);
    this.suggestions = [];
    this.onSubmit();
  }

  private handleSearchInput(value: string): void {
    // This is a mock implementation. In a real app, you would call your weather service
    // to get city suggestions from an API
    const mockCities = [
      'New York, US',
      'London, UK',
      'Paris, FR',
      'Tokyo, JP',
      'Sydney, AU',
      'Berlin, DE',
      'Moscow, RU',
      'Dubai, AE',
      'Singapore, SG',
      'Toronto, CA'
    ];
    
    this.suggestions = mockCities
      .filter(city => city.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);
  }
}
