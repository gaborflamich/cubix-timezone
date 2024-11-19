import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { TimeZonesComponent } from './components/time-zones/time-zones.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, TimeZonesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _baseUrl = 'https://timeapi.io/api/timezone';

  currentTimeZone: string = '';
  currentTime: string = '';
  selectedZone: string = '';
  selectedZoneLocalTime: string = '';
  showButtons: boolean = true;
  searchTerm: string = '';
  isSelectedCurrent: boolean = false;


  constructor(private _http: HttpClient){
    this.currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.fetchCurrentTime(this.currentTimeZone);
  }

  onZoneSelected(data: {zone: string, currentLocalTime: string}){
    this.selectedZone = data.zone;
    this.selectedZoneLocalTime = data.currentLocalTime;
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  onMakeCurrent(data: {timeZone: string, localTime: string}){
    this.currentTimeZone = data.timeZone;
    this.currentTime = data.localTime;
    this.isSelectedCurrent = true;
  }
  

  fetchCurrentTime(timeZone: string): void{
    const url = `${this._baseUrl}/zone?timeZone=${encodeURIComponent(timeZone)}`;
    this._http.get<any>(url).subscribe(
      (data) => {
        this.currentTime = data.currentLocalTime;
      },
      (error) => {
        console.error('Error fetching current time: ', error);
      }
    )
  }

  fetchSelectedZoneTime(timeZone: string): void {
    const url = `${this._baseUrl}/zone?timeZone=${encodeURIComponent(timeZone)}`;
    this._http.get<any>(url).subscribe(
      (data) => {
        this.selectedZoneLocalTime = data.currentLocalTime; // Frissítjük a kiválasztott zónához tartozó időt
      },
      (error) => {
        console.error('Error fetching selected zone time: ', error);
      }
    );
  }

  onUpdateCurrentTime(){
    this.fetchCurrentTime(this.currentTimeZone);
  }
  onUpdateLocalTime(){
    if(this.selectedZone){
      this.fetchSelectedZoneTime(this.selectedZone);
    }
  }
}

