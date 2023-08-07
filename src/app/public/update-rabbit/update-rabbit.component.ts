import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RabbitService } from '../services/rabbit.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rabbit } from 'src/app/models/Rabbit.model';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-rabbit',
  templateUrl: './update-rabbit.component.html',
  styleUrls: ['./update-rabbit.component.scss']
})
export class UpdateRabbitComponent implements OnInit{

  formGroup!: FormGroup;
  nameCtr!: FormControl;
  imageCtr!: FormControl;

  rabbitId!: string;
  rabbit!: Rabbit;

  titleToast!: string;
  messageToast!: string;
  messageColor!: any;

  constructor(private activetedRouter: ActivatedRoute, private rabbitService: RabbitService, private formBuilder: FormBuilder, private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.rabbitId = this.activetedRouter.snapshot.params['id'];
    this.rabbitService.getById(this.rabbitId).subscribe(m =>{
      this.rabbit = m.data;
      this.initFormControl();
      this.initFormGroup();
      this.setFormValues();
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

  private setFormValues(): void {
    this.formGroup.patchValue({
      name: this.rabbit.name,
      image: this.rabbit.image,
    });
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
    if (this.formGroup.value['name'] != null) {
      if (window.confirm('Etes-vous sur de faire cette modification?')) {
        this.rabbitService.update(this.formGroup.value, this.rabbitId).pipe(
          tap(saved => {
            if(saved.success){
              this.messageColor = 'green';
              this.messageToast = 'La modification a été effectuée avec success!';
              this.showSuccess();
              this.formGroup.reset();
              //this.rabbitId = '';
            }else{
              this.messageColor = 'red';
              this.messageToast = "Erreur lors de l'enregistrement";
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

  onCancel(){
    this.formGroup.reset();
  }
}
