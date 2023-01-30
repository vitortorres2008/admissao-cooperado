import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url + '/personas');
  }

  getByCpf(cpf: string) {
    return this.http.get(this.url + `/personas?cpf=${cpf}`).pipe(
      map((res: any) => {
        return res[0];
      })
    );
  }
}
