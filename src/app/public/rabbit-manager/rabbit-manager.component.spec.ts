import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbitManagerComponent } from './rabbit-manager.component';
import { RabbitService } from '../services/rabbit.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

describe('RabbitManagerComponent', () => {
  let component: RabbitManagerComponent;
  let fixture: ComponentFixture<RabbitManagerComponent>;
  let rabbitService: jasmine.SpyObj<RabbitService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RabbitManagerComponent, HeaderComponent, NavbarComponent, SidebarComponent, FooterComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatPaginatorModule, MatTableModule, BrowserAnimationsModule,],
      providers: [RabbitService, HttpClient]
    });
    fixture = TestBed.createComponent(RabbitManagerComponent);
    component = fixture.componentInstance;
    rabbitService = TestBed.inject(RabbitService) as jasmine.SpyObj<RabbitService>;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
