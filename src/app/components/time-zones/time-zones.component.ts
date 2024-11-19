import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterTimeZonesPipe } from '../../pipes/filter-time-zones.pipe';
import { FormsModule } from '@angular/forms';
import { ActiveService } from '../../services/active.service';

@Component({
  selector: 'app-time-zones',
  standalone: true,
  imports: [FilterTimeZonesPipe, FormsModule],
  templateUrl: './time-zones.component.html',
  styleUrl: './time-zones.component.scss'
})
export class TimeZonesComponent {
  private readonly _baseUrl = 'https://timeapi.io/api/timezone';
  timeZones: string[] = [];
  searchTerm: string = '';
  placeholder: string = 'Type to Search ...';
  selectedZone: string = '';

  @Output() zoneSelected = new EventEmitter<{zone: string, currentLocalTime: string}>();
  @Output() isSearchActive = new EventEmitter<boolean>();
  @Output() searchTermChange = new EventEmitter<string>();

  constructor(private http: HttpClient, public activeService: ActiveService){
    this.fetchTimezones().subscribe((data: string[]) => {
      this.timeZones = data;
    }
    )
  }

  fetchTimezones(): Observable<string[]> {
    const url = `${this._baseUrl}/availabletimezones`;
    return this.http.get<string[]>(url);
  }

  onClickZone(selectedZone: string){
    this.selectedZone = selectedZone;
    this.fetchSelectedZoneData(selectedZone);
  }

  fetchSelectedZoneData(timeZone: string): void{
    const url = `${this._baseUrl}/zone?timeZone=${encodeURIComponent(timeZone)}`;
    this.http.get<any>(url).subscribe(
      (data) => {
        this.zoneSelected.emit({zone: timeZone, currentLocalTime: data.currentLocalTime})
      },
      (error) => {
        console.log('Error fetching data', error)
      }
    )
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && typeof input.value === 'string') {
      this.searchTerm = input.value;
      const isActive = this.activeService.isSearchActive(this.searchTerm);
      this.isSearchActive.emit(isActive);
      this.searchTermChange.emit(this.searchTerm); // Kibocsátjuk a searchTerm értékét
    }
  }
  
}