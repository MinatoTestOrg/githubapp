import { Component, OnInit,inject } from '@angular/core';
import { Table1DetailBaseComponent } from '@baseapp/table-1/table-1/table-1-detail/table-1-detail.base.component';
import { Table1Service } from '@baseapp/table-1/table-1/table-1.service';


@Component({
  selector: 'app-table-1-detail',
  templateUrl: '../../../../../base/app/table-1/table-1/table-1-detail/table-1-detail.component.html',
  styleUrls: ['./table-1-detail.scss']
})
export class Table1DetailComponent extends Table1DetailBaseComponent implements OnInit {
 
	
  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }
 
}