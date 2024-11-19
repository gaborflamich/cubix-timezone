import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTimeZones',
  standalone: true
})
export class FilterTimeZonesPipe implements PipeTransform {
  transform(items: string[], searchTerm: string): string[] {
    if (!items || !searchTerm) {
      return items;
    }
    const lowerCaseTerm = searchTerm.toLowerCase();
    return items.filter(item => item.toLowerCase().includes(lowerCaseTerm));
  }
}
