import { NgModule } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedModule } from '@app/shared/shared.module';
import { WidgetsBaseModule } from '@libbase/widgets.base.module';
import { Table1DetailComponent } from '@app/table-1/table-1/table-1-detail/table-1-detail.component';
import { Table1ListComponent } from '@app/table-1/table-1/table-1-list/table-1-list.component';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';

@NgModule({
  declarations: [
    Table1DetailComponent,
    Table1ListComponent
  ],
  imports: [
    SharedModule,
    WidgetsBaseModule,
  ],
  exports: [
    SharedModule,
	WidgetsBaseModule,
    Table1DetailComponent,
    Table1ListComponent
  ],
  providers: [
  	BsModalService,
	CanDeactivateGuard
  ],
  
})
export class Table1BaseModule { }