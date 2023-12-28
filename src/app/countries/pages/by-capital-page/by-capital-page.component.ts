import {Component, Output} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country";

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries:Country[]=[];

  constructor(private countriesService: CountriesService) {
  }

  searchByCapital(term: string) {
    this.countriesService.searchCountryByCapital(term)
      .subscribe(countries => {
        this.countries = countries;
      });
  }
}
