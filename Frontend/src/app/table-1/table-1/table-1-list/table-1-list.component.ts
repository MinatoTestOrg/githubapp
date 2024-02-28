import { Component, OnInit,inject } from '@angular/core';
import { Table1ListBaseComponent } from '@baseapp/table-1/table-1/table-1-list/table-1-list.base.component';
import { Table1Service } from '@baseapp/table-1/table-1/table-1.service';


@Component({
  selector: 'app-table-1-list',
  templateUrl: '../../../../../base/app/table-1/table-1/table-1-list/table-1-list.component.html',
  styleUrls: ['./table-1-list.scss']
})
export class Table1ListComponent extends Table1ListBaseComponent implements OnInit {
 
	
  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }
 
}