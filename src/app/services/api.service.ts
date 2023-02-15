import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getByCpf(cpf: string) {
    return this.http.get(this.url + `/personas?cpf=${cpf}`).pipe(
      map((res: any) => {
        return res[0];
      })
    );
  }
}
