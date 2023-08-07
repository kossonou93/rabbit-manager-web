import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRabbitComponent } from './update-rabbit.component';

describe('UpdateRabbitComponent', () => {
  let component: UpdateRabbitComponent;
  let fixture: ComponentFixture<UpdateRabbitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRabbitComponent]
    });
    fixture = TestBed.createComponent(UpdateRabbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
