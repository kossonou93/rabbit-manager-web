import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RabbitManagerComponent } from './rabbit-manager/rabbit-manager.component';
import { AddRabbitComponent } from './add-rabbit/add-rabbit.component';
import { UpdateRabbitComponent } from './update-rabbit/update-rabbit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RabbitManagerComponent
      },
      {
        path: 'add',
        component: AddRabbitComponent
      },
      {
        path: 'update/:id',
        component: UpdateRabbitComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
