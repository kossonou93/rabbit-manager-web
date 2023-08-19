import { TestBed } from '@angular/core/testing';

import { RabbitService } from './rabbit.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Rabbit } from 'src/app/models/Rabbit.model';
import { ApiResponse } from 'src/app/models/ApiResponse.model';
import { environment } from 'src/environments/environments.prod';

describe('RabbitService', () => {
  let service: RabbitService;
  let httpTestingController: HttpTestingController;

  const rabbits: Rabbit[] = [
    { id: "64d17ad000542b4fd476bb1d", name: 'Rabbit-1', imagePath: "C:\Users\kosso\images\ec5211b6-5417-4cfd-aa7e-4749204a8cb8_European-rabbit-3f76b72.jpg", status: true },
    { id: "2", name: 'Rabbit 2', imagePath: "", status: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RabbitService]
    });
    service = TestBed.inject(RabbitService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('All Rabbits', () => {

    service.all().subscribe((response: ApiResponse<Rabbit[]>) => {
      expect(response.data).toEqual(rabbits);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/rabbit/all`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: rabbits });
  });

  it('Get By Id', ()=>{
    service.getById(rabbits[0].id).subscribe((response: ApiResponse<Rabbit>) => {
      expect(response.data).toEqual(rabbits[0]);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/rabbit/${rabbits[0].id}`);
    expect(req.request.method).toBe('GET');
    req.flush({data: rabbits[0]});
  });

  it('Add Rabbit', ()=>{
    service.add(rabbits[0]).subscribe((response: ApiResponse<Rabbit>) =>{
      expect(response.data).toEqual(rabbits[0]);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/rabbit/add`);
    expect(req.request.method).toBe('POST');
    req.flush({data: rabbits[0]});
  });

  it('should update a rabbit by ID', () => {
    const mockRabbitId = '64d17ad000542b4fd476bb1d';
  
    service.update(rabbits[0], mockRabbitId).subscribe((response: any) => {
      expect(response.success).toBe(true);
    });
  
    const expectedUrl = `${environment.apiUrl}/rabbit/update/${mockRabbitId}`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true });
  });

  it('Delete Rabbit', ()=>{
    const mockRabbitId = '64d17ad000542b4fd476bb1d';

    service.deleteRabbit(mockRabbitId).subscribe((response: ApiResponse<Rabbit>) =>{
      expect(response.success).toEqual(true);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/rabbit/delete/${mockRabbitId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({success: true});
  });
  

  it('should upload an image to the server', () => {
    const file = new File([''], 'test-image.png', { type: 'image/png' });
    const filename = 'test-image.png';
    const id = '64d17ad000542b4fd476bb1d';
  
    service.uploadImageFS(file, filename, id).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const expectedUrl = `${environment.apiUrl}/image/uploadFS/${id}`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
  

  it('Upload Update Image', ()=>{
    const id = '64d17ad000542b4fd476bb1d';
    const file = new File([''], 'test-image.png', { type: 'image/png' });
    const filename = 'test-image.png';

    service.uploadUpdateImageFS(file, filename, id).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne(`${environment.apiUrl}/image/update/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  

});
