import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbitManagerComponent } from './rabbit-manager.component';

describe('RabbitManagerComponent', () => {
  let component: RabbitManagerComponent;
  let fixture: ComponentFixture<RabbitManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RabbitManagerComponent]
    });
    fixture = TestBed.createComponent(RabbitManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
