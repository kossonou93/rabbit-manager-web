import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { RabbitManagerComponent } from './rabbit-manager/rabbit-manager.component';
import { AddRabbitComponent } from './add-rabbit/add-rabbit.component';
import { UpdateRabbitComponent } from './update-rabbit/update-rabbit.component';
import { RabbitService } from './services/rabbit.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RabbitManagerComponent,
    AddRabbitComponent,
    UpdateRabbitComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ],
  providers: [
    RabbitService
  ]
})
export class PublicModule { }
