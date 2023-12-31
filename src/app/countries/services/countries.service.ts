import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, map, Observable, of} from 'rxjs';
import {Country} from "../interfaces/country";
import {CacheStore} from "../interfaces/cache-store.interface";
import {Region} from "../interfaces/region.type";

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountries: {
      term: '',
      countries: []
    },
    byRegion: {
      region: '',
      countries: []
    }
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    console.log(this.cacheStore.byRegion.countries)
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(err => {
          return of([])
        }),
        // delay(1500),
      );
  }

  searchCountryByCode(term: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${term}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(err => {
          return of(null)
        })
      );
  }

  searchCountryByCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries =>
          this.cacheStore.byCapital = {
            term: term, countries
          }),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchCountryByName(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries =>
          this.cacheStore.byCountries = {
            term: term, countries
          }),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchCountryByRegion(region: Region): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries =>
          this.cacheStore.byRegion = {
             region, countries
          }),
        tap(() => this.saveToLocalStorage())
      );
  }

}
