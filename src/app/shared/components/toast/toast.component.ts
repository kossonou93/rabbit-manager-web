import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit{

  titleToast!: string;
  messageToast!: string;

  constructor(private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.showSuccess();
  }

  showSuccess() {
    this.messageToast = 'La modification a été effectuée avec success!';
    this.toastr.success(this.messageToast, 'Success', {
      positionClass: 'toast-center',
    });
  }

}
