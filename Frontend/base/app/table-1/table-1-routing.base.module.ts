import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';

import { Table1DetailComponent } from '@app/table-1/table-1/table-1-detail/table-1-detail.component';
import { Table1ListComponent } from '@app/table-1/table-1/table-1-list/table-1-list.component';

export const routes: Routes = [

{
     path: 'table1detail',
     component: Table1DetailComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "TABLE_1_DETAIL",
        breadcrumb: "TABLE_1_DETAIL",
        roles : [					"all"
				]
     }
},
{
     path: 'table1list',
     component: Table1ListComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "TABLE_1_LIST",
        breadcrumb: "TABLE_1_LIST",
        roles : [					"all"
				]
     }
}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class Table1BaseRoutingModule
{
}
