import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {

  constructor() {}

  isSearchActive(searchTerm: string): boolean {
    return typeof searchTerm === 'string' && searchTerm.length > 0; 
  }
}
