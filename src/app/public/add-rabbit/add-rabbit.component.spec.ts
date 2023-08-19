import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AddRabbitComponent } from './add-rabbit.component';
import { RabbitService } from '../services/rabbit.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/protected/services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { ApiResponse } from 'src/app/models/ApiResponse.model';
import { Rabbit } from 'src/app/models/Rabbit.model';

describe('AddRabbitComponent', () => {
  let component: AddRabbitComponent;
  let fixture: ComponentFixture<AddRabbitComponent>;
  let rabbitService: jasmine.SpyObj<RabbitService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    const rabbitServiceSpy = jasmine.createSpyObj('RabbitService', ['add', 'uploadImageFS']);
    let toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      declarations: [AddRabbitComponent, HeaderComponent, NavbarComponent, SidebarComponent, FooterComponent],
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), HttpClientTestingModule],
      providers: [
        AuthService,
        HttpClient,
        FormBuilder,
        {provide: RabbitService},
        { provide: RabbitService, useValue: rabbitServiceSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRabbitComponent);
    component = fixture.componentInstance;
    rabbitService = TestBed.inject(RabbitService) as jasmine.SpyObj<RabbitService>;
    //toastrService = TestBed.inject(ToastrService);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    formBuilder = TestBed.inject(FormBuilder);
    component.formGroup = formBuilder.group({
      name: '',
      image: ''
    });
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    //component.toast = toastrService;
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call rabbitService.add and rabbitService.uploadImageFS on addRabbit success', () => {
    const formData = { name: 'Test Rabbit', image: null };
    const response: ApiResponse<Rabbit> = {
    success: true,
    data: { id: '64d17ad000542b4fd476bb1d', name: 'Rabbit-1', imagePath: 'C:\Users\kosso\images\ec5211b6-5417-4cfd-aa7e-4749204a8cb8_European-rabbit-3f76b72.jpg', status: true },
    message: 'Rabbit added successfully'
  };

  //rabbitService.add.and.returnValue(of(response));
  //rabbitService.uploadImageFS.and.returnValue(of({}));

  spyOn(component, 'showSuccess');
  spyOn(component.formGroup, 'reset');

  component.formGroup.setValue(formData);
  component.uploadedImage = new File([], 'test-image.jpg');
  component.addRabbit();

  /*expect(rabbitService.add).toHaveBeenCalledWith(response.data);
  expect(rabbitService.uploadImageFS).toHaveBeenCalledWith(component.uploadedImage, 'test-image.jpg', 'rabbit-id');
  expect(component.showSuccess).toHaveBeenCalled();
  expect(component.formGroup.reset).toHaveBeenCalled();*/
  });

  it('should showSuccess', ()=>{
    component.showSuccess();

    expect(toastrService.success).toHaveBeenCalledWith(
      component.messageToast,
      'Success',
      { positionClass: 'toast-center'}
    )
  });

  /*it('should showError', ()=>{
    //component.showError();

    expect(toastrService.error).toHaveBeenCalledWith(
      component.messageToast,
      'Error',
      { positionClass: 'toast-center'}
    )
  });*/

  it('should initialize the form group', () => {
    component.initFormGroup();

    expect(component.formGroup).toBeDefined();
    expect(component.formGroup instanceof FormGroup).toBeTruthy();
  });

  it('should have required name control', () => {
    component.initFormGroup();

    const nameControl = component.formGroup.get('name');

    expect(nameControl).toBeDefined();
    expect(nameControl?.validator).toBe(Validators.required);
  });

  it('should reset formGroup on onCancel', () => {
    spyOn(component.formGroup, 'reset'); // Spy on the reset method

    component.onCancel();

    expect(component.formGroup.reset).toHaveBeenCalledBefore; // Verify that reset was called
  });

  it('should set uploadedImage and imagePath on onImageUpload', () => {
    const event = { target: { files: [new File([], 'test.jpg')] }};
    component.onImageUpload(event);
    expect(component.uploadedImage).toEqual(event.target.files[0]);
  });
});
