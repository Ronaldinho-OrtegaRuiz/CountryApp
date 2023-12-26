import {Component, Output} from '@angular/core';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  searchByCapital(term: string) {
    console.log('searchByCapital');
    console.log(term);
  }
}
