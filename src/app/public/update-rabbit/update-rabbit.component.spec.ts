import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRabbitComponent } from './update-rabbit.component';
import { RabbitService } from '../services/rabbit.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('UpdateRabbitComponent', () => {
  let component: UpdateRabbitComponent;
  let fixture: ComponentFixture<UpdateRabbitComponent>;
  let rabbitService: RabbitService;
  let httpTestingController: HttpTestingController;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRabbitComponent, HeaderComponent, SidebarComponent, NavbarComponent, FooterComponent],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), ReactiveFormsModule, RouterModule.forRoot([]),],
      providers: [RabbitService, HttpClient]
    });
    fixture = TestBed.createComponent(UpdateRabbitComponent);
    component = fixture.componentInstance;
    rabbitService = TestBed.inject(RabbitService) as jasmine.SpyObj<RabbitService>;
    httpTestingController = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set uploadedImage and imagePath on onImageUpload', () => {
    const event = { target: { files: [new File([], 'test.jpg')] }};
    component.onImageUpload(event);
    expect(component.uploadedImage).toEqual(event.target.files[0]);
  });
});
