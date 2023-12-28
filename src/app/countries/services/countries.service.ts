import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Country} from "../interfaces/country";

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {
  }


  searchCountryByCode(term:string):Observable<Country | null>{
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${term}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(err => {
          return of(null)
        })
      );
  }

  searchCountryByCapital(term:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`)
      .pipe(
        catchError(err => {
          return of([])
        })
      );
  }

  searchCountryByName(term:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/name/${term}`)
      .pipe(
        catchError(err => {
          return of([])
        })
      );
  }

  searchCountryByRegion(term:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/region/${term}`)
      .pipe(
        catchError(err => {
          return of([])
        })
      );
  }

}
