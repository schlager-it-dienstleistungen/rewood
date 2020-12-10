import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
	private EXCHANGE_REST_API_SERVER = "https://api.exchangeratesapi.io/latest";

  constructor(private httpClient: HttpClient) { }

  public getLatestCurrencyExchangeRates(): Observable<any>{
    return this.httpClient.get(this.EXCHANGE_REST_API_SERVER).pipe(catchError(this.handleError));
	}

	handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
		console.error(errorMessage);
		return throwError(errorMessage);
  }
}
