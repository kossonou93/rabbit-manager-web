import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';1
import { Observable } from 'rxjs';
import { Rabbit } from 'src/app/models/Rabbit.model';
import { ApiResponse } from 'src/app/models/ApiResponse.model';
import { environment } from 'src/environments/environments.prod';

@Injectable()
export class RabbitService {

  constructor(private http: HttpClient) { }

  public all(): Observable<ApiResponse<Rabbit[]>>{
    return this.http.get<ApiResponse<Rabbit[]>>(`${environment.apiUrl}/rabbit/all` );
  }
  
  public add(rabbit: Rabbit): Observable<ApiResponse<Rabbit>>{
    return this.http.post<ApiResponse<Rabbit>>(`${environment.apiUrl}/rabbit/add`, rabbit);
  }

  public getById(id: string): Observable<ApiResponse<Rabbit>>{
    return this.http.get<ApiResponse<Rabbit>>(`${environment.apiUrl}/rabbit/${id}`);
  }

  public update(rabbit: Rabbit, id: string): Observable<ApiResponse<Rabbit>>{
    return this.http.put<ApiResponse<Rabbit>>(`${environment.apiUrl}/rabbit/update/${id}`, rabbit);
  }

  public deleteRabbit(id: string){
    return this.http.delete<ApiResponse<Rabbit>>(`${environment.apiUrl}/rabbit/delete/${id}`);
  }

  public softDelete(rabbit: Rabbit, id: string): Observable<ApiResponse<Rabbit>>{
    return this.http.put<ApiResponse<Rabbit>>(`${environment.apiUrl}/rabbit/soft-delete/${id}`, rabbit);
  }

}
