import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { passwordMatchValidator } from 'src/app/validators/password.match';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  formGroup!: FormGroup;

  titleToast!: string;
  messageToast!: string;
  messageColor!: any;

  constructor(private authService: AuthService,private formBuilder: FormBuilder, private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.initFormGroup()
  }

  initFormGroup(){
    this.formGroup = new FormGroup({
      name: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', Validators.required),
      username: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
      confirmPassword: this.formBuilder.control('', Validators.required),
      roles: this.formBuilder.control('', Validators.required)
    }, [passwordMatchValidator("password", "confirmPassword")]
    )
  }

  getControl(name: any): AbstractControl | null {
    return this.formGroup.get(name);
  }

  showSuccess() {
    this.toastr.success(this.messageToast, 'Success', {
      positionClass: 'toast-center',
    });
  }

  showError() {
    this.toastr.error(this.messageToast, 'Error', {
      positionClass: 'toast-center',
    });
  }

  addUser(): void{
    const roleValue: string = this.formGroup.get('roles')?.value;
    const roleArray: string[] = [roleValue];
    this.formGroup.get('roles')?.patchValue(roleArray);
    console.log('Test ==> ', this.formGroup.value);
    this.authService.addUser(this.formGroup.value).pipe(
      tap(saved =>{
        if(saved.success){
          this.messageColor = 'green';
          this.messageToast = saved.message;
          this.showSuccess();
          this.formGroup.reset();
        }else{
          this.messageColor = 'red';
          this.messageToast = saved.message;
          this.showError();
        }
      })
    ).subscribe();
  }

  onCancel(): void{

  }

}
