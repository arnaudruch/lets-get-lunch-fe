import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

import { AuthInterceptorService } from './auth-interceptor.service';
import { isSymbol } from 'util';

class LocalStorageMock {
  retrieve() { return 's3cr3tt0ken'; }
}

describe('AuthInterceptorService', () => {
  let http: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        { provide: LocalStorageService, useClass: LocalStorageMock }
        // AuthInterceptorService
      ]
    });

    http = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  // it('should be created', inject([AuthInterceptorService], (service: AuthInterceptorService) => {
  //   expect(service).toBeTruthy();
  // }));

  it('should append a token to the headers if a token exists', () => {
    httpClient.get('/test').subscribe(res => {});
    const req = http.expectOne('/test');
    req.flush('ok');
    expect(req.request.headers.get('Authorization')).toEqual('s3cr3tt0ken');
  });

});
