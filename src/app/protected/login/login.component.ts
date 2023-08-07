import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/models/User.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  active: any;
  user = new User();
  err:number = 0;
  erreur = 0;
  validUser: boolean = true;
  formGroup!: FormGroup;
  usernameCtr!: FormControl;
  passwordCtr!: FormControl;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){
  }

  ngOnInit(): void{
    this.initControl();
    this.initFormGroup();
  }

  private initFormGroup(){
    this.formGroup = this.formBuilder.group({
     username: this.usernameCtr,
     password: this.passwordCtr 
    });
  }

  private initControl(){
    this.usernameCtr = this.formBuilder.control('', Validators.required),
    this.passwordCtr = this.formBuilder.control('', Validators.required)
  }

  onLogin() {
      this.authService.login(this.formGroup.value).subscribe({
        next: (data) => {
          let jwToken = data.body?.data.token!;
          let user = data.body?.data.user!;
          this.authService.saveToken(jwToken, user);
          this.authService.isloggedIn = true;
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.validUser = false;
        }
      });
  }

}
