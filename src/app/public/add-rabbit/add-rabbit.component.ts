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
export class AddRabbitComponent implements OnInit {

  formGroup!: FormGroup;

  titleToast!: string;
  messageToast!: string;
  messageColor!: any;

  uploadedImage!: File;
  imagePath: any;

  constructor(private rabbitService: RabbitService, private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {
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

  initFormGroup(): void {
    this.formGroup = new FormGroup({
      name: this.formBuilder.control('', Validators.required),
      image: this.formBuilder.control('')
    })
  }

   addRabbit(): void {
    this.rabbitService.add(this.formGroup.value).pipe(
      tap(saved => {
        if (saved.success) {
          this.rabbitService.uploadImageFS(this.uploadedImage,
            this.uploadedImage.name, saved.data.id).subscribe();
          this.messageColor = 'green';
          this.messageToast = saved.message;
          this.showSuccess();
          this.imagePath = '';
          this.formGroup.reset();
        } else {
          this.messageColor = 'red';
          this.messageToast = saved.message;
          this.showError();
        }
      })
    ).subscribe();
  }

  onCancel(): void {
    this.formGroup.reset;
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }

}
