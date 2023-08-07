import { Component, OnInit } from '@angular/core';
import { RabbitService } from '../services/rabbit.service';
import { Rabbit } from 'src/app/models/Rabbit.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../services/confirm.service';

@Component({
  selector: 'app-rabbit-manager',
  templateUrl: './rabbit-manager.component.html',
  styleUrls: ['./rabbit-manager.component.scss']
})
export class RabbitManagerComponent implements OnInit{

  rabbits!: Rabbit[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();
  selectedRowValues: string[] = [];

  constructor(private rabbitService: RabbitService, private router: Router, private confirmDialogService: ConfirmDialogService){
  }

  ngOnInit(): void {
    this.allRabbits();
  
    $(document).on('click', '.deleteBtn', (event) => {
      var id = $(event.currentTarget).data('id');
      console.log("ID de l'élément à supprimer : ", id);
      const message = 'Are you sure you want to delete this item?';
      this.confirmDialogService.confirm(message).then((result) => {
        if (result) {
          console.log('Delete confirmed.');
          this.deleteItem(id);
          this.allRabbits();
        } else {
          console.log('Delete canceled.');
        }
      });
    });
  
    $(document).on('click', '.editBtn', (event) => {
      var id = $(event.currentTarget).data('id'); 
      console.log("ID de l'élément à modifier : ", id);
      this.router.navigateByUrl(`update/${id}`).then((e: any) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    });
  }

  deleteItem(id: string): void{
    this.rabbitService.deleteRabbit(id).subscribe();
  }

  allRabbits(): void{
    this.rabbitService.all().subscribe(rab=>{
      this.rabbits = rab.data;
      setTimeout(()=>{
        $('#datatableRabbit').DataTable({
          data: this.rabbits,
          columns:[
            {
              title: "Select",
              data: "id",
              render: function(data, type, full, meta) {
                return '<input type="checkbox" class="checkbox" value="' + full.id + '"/>';
              }
            },
            /*{
              title: "Id", data: "id"
            },*/
            {
              title: "Nom", data: "name"
            },
            {
              title: "Status", data: "status"
            },
            {
              title: "Actions",
              render: function (data, type, full, meta) {
                return '<button class="btn btn-primary btn-sm editBtn" data-id="' + full.id + '">Modifier</button>'  + '   ' +
                '<button class="btn btn-danger btn-sm deleteBtn" data-id="' + full.id + '">Supprimer</button>';
              }
            }
          ],
          pagingType: 'full_numbers',
          pageLength: 50,
          processing: true,
          lengthMenu : [5, 10, 25, 50, 100, 1000]
        });
      }, 1);
    });
  }

}
