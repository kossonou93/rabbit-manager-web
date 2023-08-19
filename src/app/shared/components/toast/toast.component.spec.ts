import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let service: ToastrService;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [ToastrModule.forRoot()],
      providers: [ToastrService],
    });
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('How Success', ()=>{
    const toastrSuccessSpy = spyOn(service, 'success');

    component.showSuccess();

    expect(toastrSuccessSpy).toHaveBeenCalledWith(
      component.messageToast,
      'Success',
      {
        positionClass: 'toast-center',
      }
    );
  });
});
