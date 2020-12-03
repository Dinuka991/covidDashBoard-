import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  getCovidStatics(): Observable<any>{
        return this.http.get<any>('https://hpb.health.gov.lk/api/get-current-statistical/')
  }
  getCountries(): Observable<any>{
    return this.http.get<any>('https://api.covid19api.com/countries')
}
  getGlobaleCases(country , start , end): Observable<any>{
    console.log(country);
    console.log(start);
    console.log(end);
    const params = new HttpParams()
    .set('from', start)
    .set('to', end);
    return  this.http.get<any>('https://api.covid19api.com/total/country/' + country +'/status/confirmed?' + params)
  }
}



