import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
  });

  xit('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('signup', () => {

    it('should return a user object with a valid username and password', () => {
      const user = { 'username': 'myUser', 'password': 'password' };
      const signupResponse = {
        '__v': 0,
        'username': 'myUser',
        'password': '$2a$10$dKVr6CL3PIeJLmv3jw/BROYWccKq0UN/aAadz43LqeWFVhDPPaw8a',
        'dietPreferences': []
      };
      let response;

      authService.signup(user).subscribe(res => {
        response = res;
      });

      http.expectOne('http://localhost:8080/api/users').flush(signupResponse);
      expect(response).toEqual(signupResponse);
      http.verify();
    });

    it('should return an error for an invalid user object', () => {
      const user = { 'username': 'myUser', 'password': 'PWD' };
      const signupResponse = 'Your password must be at least 5 characters long.';
      let errorResponse;

      authService.signup(user).subscribe(res => { }, err => {
        errorResponse = err;
      });

      http.expectOne('http://localhost:8080/api/users').flush({ message: signupResponse }, { status: 400, statusText: 'Bad Request' });
      expect(errorResponse.error.message).toEqual(signupResponse);
      http.verify();

    });

  });

});
