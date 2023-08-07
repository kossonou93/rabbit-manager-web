import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RabbitService } from '../services/rabbit.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-rabbit',
  templateUrl: './add-rabbit.component.html',
  styleUrls: ['./add-rabbit.component.scss']
})
export class AddRabbitComponent implements OnInit{

  formGroup!: FormGroup;
  nameCtr!: FormControl;
  imageCtr!: FormControl;

  titleToast!: string;
  messageToast!: string;
  messageColor!: any;

  constructor(private rabbitService: RabbitService, private formBuilder: FormBuilder, private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.initFormControl();
    this.initFormGroup();
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

  private initFormGroup(): void{
    this.formGroup = this.formBuilder.group({
      name: this.nameCtr,
      image: this.imageCtr
    })
  }

  private initFormControl(): void{
    this.nameCtr = this.formBuilder.control('', Validators.required);
    this.imageCtr = this.formBuilder.control('');
  }

  addRabbit(): void{
    this.rabbitService.add(this.formGroup.value).pipe(
      tap(saved => {
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
    this.formGroup.reset;
  }

}
