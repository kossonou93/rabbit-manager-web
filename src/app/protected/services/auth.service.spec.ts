import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from 'src/app/models/User.model';
import { ApiResponse } from 'src/app/models/ApiResponse.model';
import { environment } from 'src/environments/environments.prod';
import { HttpClientModule, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JwtResponse } from 'src/app/models/JwtResponse';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  /*it('should call login API and return response', (done) => {
    const user: User = new User();
    const mockResponse: ApiResponse<JwtResponse<User>> = {
      body: {
        success: true,
        message: 'Login successful',
        data: {
          token: 'mockToken',
          user: user
        }
      },
      type: HttpEventType.Response,
      clone: function (): ApiResponse<JwtResponse<User>> {
        throw new Error('Function not implemented.');
      },
      headers: new HttpHeaders,
      status: 0,
      statusText: '',
      url: null,
      ok: false
    };

    authService.login(user).subscribe((response: HttpResponse<ApiResponse<JwtResponse<User>>>) => {
      expect(response.body).toEqual(mockResponse);
      done(); // Call done() to signal the completion of the test
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/user/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });


  it('should log out and navigate to login', () => {
    // Arrange
    authService.isloggedIn = true;
    authService.loggedUser = 'testUser';
    authService.roles = ['USER', 'ADMIN'];
  
    // Act
    authService.logout();
  
    // Assert
    expect(authService.isloggedIn).toBeFalse();
    expect(authService.loggedUser).toBeUndefined();
    expect(authService.roles).toBeUndefined();
    expect(localStorage.getItem('loggedUser')).toBeNull();
    expect(localStorage.getItem('isloggedIn')).toBe('false');
  });
*/
  
});
