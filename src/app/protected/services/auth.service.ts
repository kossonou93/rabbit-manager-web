import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments.prod';
import { JwtResponse } from 'src/app/models/JwtResponse';
import { User } from 'src/app/models/User.model';
import { ApiResponse } from 'src/app/models/ApiResponse.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {

  private checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isloggedIn = true;
    }
  }

  token!: string;
  public roles!: string[];
  role! : string[];
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  private helper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) {
    this.checkToken();
  }

  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
  }


  login(user: User) {
    return this.http.post<ApiResponse<JwtResponse<User>>>(`${environment.apiUrl}/user/login`, user, { observe: 'response' });
  }

  saveToken(jwt: string, user: User) {
    this.token = jwt;
    this.isloggedIn = true;
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('loggedUser', user.username!);
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }


  loadToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      this.token = jwt;
      this.decodeJWT();
    }
  }

  getToken(): string {
    return this.token;
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    this.findByUsername(username).subscribe(user =>{
      this.role = user.data.roles;
    });
  }

  findByUsername(username: string): Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/user/username/${username}`);
  }

  addUser(user: User): Observable<ApiResponse<User>>{
    return this.http.post<ApiResponse<User>>(`${environment.apiUrl}/user/add`, user);
  }
}
