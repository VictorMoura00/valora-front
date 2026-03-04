import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/evaluations`;

  submitAppEvaluation(rating: number, feedback: string) {
    const payload = { rating, feedback };
    return this.http.post(this.apiUrl, payload);
  }
}