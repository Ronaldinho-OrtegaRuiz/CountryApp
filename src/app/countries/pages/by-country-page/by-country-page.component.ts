import {Component, OnInit} from '@angular/core';
import {Country} from "../../interfaces/country";
import {CountriesService} from "../../services/countries.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public initialValue:string = '';

  ngOnInit(): void {
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
    this.countries = this.countriesService.cacheStore.byCountries.countries;
  }

  public countries:Country[]=[];
  public isLoading:boolean = false;

  constructor(private countriesService: CountriesService) {
  }

  searchByCountry(term: string) {

    this.isLoading = true;

    this.countriesService.searchCountryByName(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
