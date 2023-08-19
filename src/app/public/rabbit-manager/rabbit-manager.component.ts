import { Component, OnInit, ViewChild } from '@angular/core';
import { RabbitService } from '../services/rabbit.service';
import { Rabbit } from 'src/app/models/Rabbit.model';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../services/confirm.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-rabbit-manager',
  templateUrl: './rabbit-manager.component.html',
  styleUrls: ['./rabbit-manager.component.scss'],
})
export class RabbitManagerComponent implements OnInit  {

  rabbits!: Rabbit[];
  selectedRowValues: string[] = [];

  displayedColumns: string[] = ['position', 'name', 'status', 'imagePath', 'modifier', 'supprimer'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rabbitService: RabbitService, private router: Router, private confirmDialogService: ConfirmDialogService) {
  }

  onUpdate(element: any): void {
    const index = this.dataSource.data.indexOf(element);
    if (index !== -1) {
      this.router.navigateByUrl(`update/${element.id}`).then((e: any) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }
  }

  onDelete(element: any): void {
    const index = this.dataSource.data.indexOf(element);
    if (index !== -1) {
      const message = 'Are you sure you want to delete this item?';
      this.confirmDialogService.confirm(message).then((result) => {
        if (result) {
          alert('Delete confirmed.');
          this.deleteItem(element.id);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        } else {
          alert('Delete canceled.');
        }
      });
    }
  }


  ngOnInit(): void {
    this.allRabbits();
  }

  deleteItem(id: string): void {
    this.rabbitService.deleteRabbit(id).subscribe();
  }

  allRabbits(): void {
    this.rabbitService.all().subscribe(rab => {
      this.rabbits = rab.data;
      this.dataSource = new MatTableDataSource<Rabbit>(this.rabbits);
      this.dataSource.paginator = this.paginator;
    });
  }

}
