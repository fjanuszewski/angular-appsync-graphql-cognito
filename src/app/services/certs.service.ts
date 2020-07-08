import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cert } from '../models/cert.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertsService {

  constructor(private http: HttpClient) {}

  getCerts(){
    return this.http.get('../../assets/certs.json');
  }
}
