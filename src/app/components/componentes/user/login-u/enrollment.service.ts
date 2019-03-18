import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {userInterface} from 'src/app/models/user';



@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
_url='';

  constructor(private_http: HttpClient) { }

}
