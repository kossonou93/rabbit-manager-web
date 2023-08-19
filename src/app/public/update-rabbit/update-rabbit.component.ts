import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RabbitService } from '../services/rabbit.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rabbit } from 'src/app/models/Rabbit.model';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-rabbit',
  templateUrl: './update-rabbit.component.html',
  styleUrls: ['./update-rabbit.component.scss']
})
export class UpdateRabbitComponent implements OnInit{

  //formGroup!: FormGroup;
  nameCtr!: FormControl;
  imageCtr!: FormControl;

  rabbitId!: string;
  rabbit!: Rabbit;

  titleToast!: string;
  messageToast!: string;
  messageColor!: any;

  uploadedImage!: File;
  imagePath: any;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
  });
  submitted = false;

  constructor(private activetedRouter: ActivatedRoute, private rabbitService: RabbitService, private formBuilder: FormBuilder, private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.rabbitId = this.activetedRouter.snapshot.params['id'];
    this.rabbitService.getById(this.rabbitId).subscribe(m =>{
      this.rabbit = m.data;
      this.imagePath = this.rabbit.imagePath;
      console.log("upload ===> ", this.uploadedImage);
      this.initFormGroup();
      this.setFormValues();
    });
  }

  private initFormGroup(): void{
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    })
  }


  private setFormValues(): void {
    this.formGroup.patchValue({
      name: this.rabbit.name,
      image: this.rabbit.imagePath,
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
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

  updateRabbit(){
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }else{
      if (this.formGroup.value['name'] != null) {
        console.log("filname ==> ", this.uploadedImage.name);
        if (window.confirm('Etes-vous sur de faire cette modification?')) {
          this.rabbitService.update(this.formGroup.value, this.rabbitId).pipe(
            tap(saved => {
              if(saved.success){
                this.rabbitService.uploadUpdateImageFS(this.uploadedImage, this.uploadedImage.name, saved.data.id).subscribe();
                this.messageColor = 'green';
                this.messageToast = saved.message;
                this.showSuccess();
                this.imagePath = '';
                this.formGroup.reset();
              }else{
                this.messageColor = 'red';
                this.messageToast = saved.message;
                this.showError();
              }
            })
          ).subscribe();
        } else {
      }
      }else{
        this.messageColor = 'red';
        this.messageToast = "Le nom du lapin ne doit pas etre null !!!";
        this.showError();
      }
    }
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }

  onCancel(){
    this.submitted = false;
    this.formGroup.reset();
  }
}
