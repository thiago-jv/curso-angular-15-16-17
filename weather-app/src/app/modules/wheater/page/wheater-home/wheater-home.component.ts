import { WeatherDatas } from 'src/app/models/interfaces/weather-data-interface';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wheater-home',
  templateUrl: './wheater-home.component.html',
  styleUrls: []
})
export class WheaterHomeComponent implements OnInit {

  private readonly destroy$: Subject<void> = new Subject();
  initialCityName = 'Manaus';
  WeatherDatas!: WeatherDatas;
  seachIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService){}


  ngOnInit(): void {
   this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        response && (this.WeatherDatas = response);
        console.log(this.WeatherDatas);
      }, error: (error) => console.log(error),
    })
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
