import { Table1Service } from '../table-1.service';
import { Table1Base} from '../table-1.base.model';
import { Directive, EventEmitter, Input, Output, SecurityContext, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppUtilBaseService } from '@baseapp/app-util.base.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ChangeLogsComponent } from '@libsrc/change-logs/change-logs.component'
import { Table1ApiConstants } from '@baseapp/table-1/table-1/table-1.api-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent } from '@libsrc/confirmation/confirmation-popup.component';
import { FormControl, FormGroup, Validators, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, catchError, combineLatest, distinctUntilChanged, of, Observer, Subscription, map, Observable, Subject } from 'rxjs';
import { environment } from '@env/environment';
import { Filter } from '@baseapp/vs-models/filter.model';
import { AppConstants } from '@app/app-constants';
import { AppGlobalService } from '@baseapp/app-global.service';
import { GridComponent } from '@libsrc/grid/grid.component';
import { Location } from '@angular/common';

@Directive(
{
	providers:[MessageService, ConfirmationService, DialogService]
}
)
export class Table1ListBaseComponent{
	
	
	quickFilter: any;
hiddenFields:any = {};
quickFilterFieldConfig:any={}
	bsModalRef?: BsModalRef;
	isSearchFocused:boolean = false;
showBreadcrumb = AppConstants.showBreadcrumb;
	
showAdvancedSearch: boolean = false;

tableSearchFieldConfig:any = {};
@ViewChild('toggleButton')
  toggleButton!: ElementRef;
  @ViewChild('menu')
  menu!: ElementRef;
 filtersApplied:boolean = false;

	  selectedValues: any[] = [];
  filter: Filter = {
    globalSearch: '',
    advancedSearch: {},
    sortField: null,
    sortOrder: null,
    quickFilter: {}
  };
params: any;
isMobile: boolean = AppConstants.isMobile;

  gridData: Table1Base[] = [];
  totalRecords: number = 0;
  subscriptions: Subscription[] = [];
 multiSortMeta:any =[];
 selectedColumns:any =[];
subHeader: any;
  autoSuggest: any;
  query: any;

rightFreezeColums:any;
total:number =0;
inValidFields:any = {};
selectedItems:any ={};
scrollTop:number =0;
isRowSelected: boolean = false;
isPrototype = environment.prototype;
  workFlowEnabled = false;
isList = true;
isPageLoading:boolean = false;
autoSuggestPageNo:number = 0;
complexAutoSuggestPageNo:number = 0
localStorageStateKey = "table-1-list";
showMenu: boolean = false;
conditionalActions:any ={
  disableActions:[],
  hideActions:[]
}
actionBarConfig:any =[];
first: number =0;
rows: number = 0;
updatedRecords:Table1Base[] = [];
showPaginationOnTop = AppConstants.showPaginationonTop;
 showPaginationOnBottom = AppConstants.showPaginationonBottom;
 tableFieldConfig:any ={};
dateFormat: string = AppConstants.calDateFormat;
selectedRowId: any = '';
 showWorkflowSimulator:boolean = false;
 gridConfig: any = {};
  @ViewChild(GridComponent)
  public gridComponent: any = GridComponent;
separator = "__";
timeFormatPrimeNG: string = AppConstants.timeFormatPrimeNG;
dateFormatPrimeNG: string = AppConstants.dateFormatPrimeNG ;
minFraction = AppConstants.minFraction;
maxFraction = AppConstants.maxFraction;
currency = AppConstants.currency;
currencyDisplay = AppConstants.currencyDisplay;
 responseData:any =[];
defaultActions= ['save','cancel','delete','refresh','back','changelog','workflowhistory','import','export','new'];

	isChildPage:boolean = false;

	
	leftActionBarConfig : any = {
  "children" : [ {
    "visibility" : "show",
    "buttonStyle" : "curved",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fas fa-arrow-left",
        "value" : "fas fa-arrow-left"
      }
    },
    "confirmationText" : "confirm",
    "label" : "BACK",
    "type" : "button",
    "outline" : false,
    "buttonType" : "icon_on_left",
    "showOn" : "both",
    "enableOnlyIfRecordSelected" : false,
    "buttonEnabled" : "yes",
    "action" : "back",
    "confirmationTitle" : "confirmation",
    "confirmationButtonText" : "yes",
    "cancelButtonText" : "no"
  }, {
    "visibility" : "show",
    "buttonStyle" : "curved",
    "confirmationText" : "confirm",
    "label" : "NEW",
    "type" : "button",
    "outline" : false,
    "buttonType" : "icon_on_left",
    "showOn" : "both",
    "enableOnlyIfRecordSelected" : false,
    "buttonEnabled" : "yes",
    "action" : "new",
    "confirmationTitle" : "confirmation",
    "confirmationButtonText" : "yes",
    "cancelButtonText" : "no"
  }, {
    "visibility" : "show",
    "buttonStyle" : "curved",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fas fa-trash-alt",
        "value" : "fas fa-trash-alt"
      },
      "iconColor" : "#000000",
      "iconSize" : "13px"
    },
    "confirmationText" : "confirm",
    "label" : "DELETE",
    "type" : "button",
    "outline" : false,
    "buttonType" : "icon_only",
    "showOn" : "both",
    "enableOnlyIfRecordSelected" : false,
    "buttonEnabled" : "yes",
    "action" : "delete",
    "confirmationTitle" : "confirmation",
    "confirmationButtonText" : "yes",
    "cancelButtonText" : "no"
  }, {
    "visibility" : "show",
    "buttonStyle" : "curved",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fas fa-sync",
        "value" : "fas fa-sync"
      },
      "iconColor" : "#000000",
      "iconSize" : "13px"
    },
    "confirmationText" : "confirm",
    "label" : "REFRESH",
    "type" : "button",
    "outline" : false,
    "buttonType" : "icon_only",
    "showOn" : "both",
    "enableOnlyIfRecordSelected" : false,
    "buttonEnabled" : "yes",
    "action" : "refresh",
    "confirmationTitle" : "confirmation",
    "confirmationButtonText" : "yes",
    "cancelButtonText" : "no"
  }, {
    "outline" : false,
    "displayCount" : "0",
    "label" : "IMPORT_EXPORT_BUTTON_GROUP",
    "type" : "buttonGroup"
  } ],
  "type" : "actionBar"
}
	rightActionBarConfig : any = {
  "type" : "actionBar"
}
	tableSearchConfig : any = {
  "outline" : false,
  "children" : [ ],
  "columns" : "2",
  "type" : "tableSearch",
  "showAdvancedSearch" : true
}
	quickFilterConfig : any = {
  "outline" : false,
  "children" : [ ],
  "type" : "quickFilter"
}
	customRenderConfig : any = {
  "children" : [
     ]
}
	tableConfig : any = {
  "rightFreezeFromColumn" : "0",
  "currentNode" : "TABLE",
  "columnReorder" : false,
  "type" : "grid",
  "showDetailPageAs" : "navigate_to_new_page",
  "rowGroup" : "yes",
  "outline" : false,
  "children" : [ {
    "fieldName" : "f1",
    "data" : "",
    "formatDisplay" : false,
    "showOnMobile" : false,
    "isPrimaryKey" : true,
    "label" : "F1",
    "type" : "gridColumn",
    "showLabel" : false,
    "field" : "f1",
    "labelPosition" : "top",
    "name" : "f1",
    "uiType" : "text",
    "fieldType" : "string",
    "fieldId" : "f1"
  }, {
    "fieldName" : "f2",
    "data" : "",
    "formatDisplay" : false,
    "showOnMobile" : false,
    "isPrimaryKey" : true,
    "label" : "F2",
    "type" : "gridColumn",
    "showLabel" : false,
    "field" : "f2",
    "labelPosition" : "top",
    "name" : "f2",
    "uiType" : "text",
    "fieldType" : "string",
    "fieldId" : "f2"
  } ],
  "valueChange" : true,
  "toggleColumns" : false,
  "sorting" : "single_column",
  "rowSpacing" : "medium",
  "rowHeight" : "medium",
  "striped" : true,
  "recordSelection" : "multiple_records",
  "infiniteScroll" : false,
  "inlineEditing" : false,
  "viewAs" : "list",
  "hoverStyle" : "box",
  "tableStyle" : "style_2",
  "pageLimit" : "50",
  "leftFreezeUptoColumn" : "0",
  "rememberLastTableSettings" : false,
  "columnResize" : false,
  "showGridlines" : false,
  "detailPage" : {
    "sid" : "922e7fe1-ef82-46be-bd29-3b95ef5894f1",
    "name" : "table 1 Detail",
    "url" : "/table1/table1detail"
  },
  "detailPageNavigation" : "click_of_the_row"
}
	pageViewTitle: string = 'TABLE_1_LIST';
	
	public table1Service = inject(Table1Service);
public appUtilBaseService = inject(AppUtilBaseService);
public translateService = inject(TranslateService);
public messageService = inject(MessageService);
public confirmationService = inject(ConfirmationService);
public dialogService = inject(DialogService);
public domSanitizer = inject(DomSanitizer);
public bsModalService = inject(BsModalService);
public activatedRoute = inject(ActivatedRoute);
public renderer2 = inject(Renderer2);
public router = inject(Router);
public appGlobalService = inject(AppGlobalService);
public location = inject(Location);

		tableSearchControls : UntypedFormGroup = new UntypedFormGroup({
});

		quickFilterControls : UntypedFormGroup = new UntypedFormGroup({
});


	
	getDisabled(formControl: FormGroup, ele: string) {
  const parent = ele.split('?.')[0];
  if (formControl.controls[parent] instanceof FormGroup){
    return formControl.get(ele)?.disabled
  }
  else
    return formControl.controls[parent].disabled;
}
	clearAllFilters() {
  this.filter.globalSearch = '';
  this.clearFilterValues();
}
	filterSearch() {
    this.quickFilterControls.valueChanges.subscribe((value) => {
 if(!(this.appUtilBaseService.isEqualIgnoreCase(value,this.filter.quickFilter, [],true))){
      for (let control of this.quickFilterConfig.children) {
        if (control.uiType === 'autosuggest' && AppConstants.isSql) {
          control.mapping?.map((o: any, index: number) => {
            if (o.isApplicable && !this.hiddenFields[o.childField] && value[control.fieldName] && value[control.fieldName][o.parentField]) {
              this.quickFilterControls.get([o.childField])?.patchValue(value[control.fieldName][o.parentField], { emitEvent: false });
            }
          })
        }
      }
      let filterVals = { ... this.quickFilterControls.value };
      let hasDates = this.quickFilterConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "date" || e.fieldType.toLowerCase() == "datetime");
       if (hasDates.length > 0) {
        let val:any = {};
        hasDates.forEach((f: any) => {
          let field = f.name;
          let dateVal = value[field];
          if (!dateVal) delete filterVals[field];
          if (dateVal && Array.isArray(dateVal)) {
            if(this.quickFilterFieldConfig[field].uiType ==='date'){
              const tempDate1 = new Date(dateVal[0]);
              const tempDate2 = new Date(dateVal[1]);
              const convertedDate1 = tempDate1.getFullYear() + '-' + this.leftPad((tempDate1.getMonth() + 1), 2) + '-' + this.leftPad(tempDate1.getDate(), 2);
              const convertedDate2 = tempDate2.getFullYear() + '-' + this.leftPad((tempDate2.getMonth() + 1), 2) + '-' + this.leftPad(tempDate2.getDate(), 2);
              val = { lLimit:convertedDate1 , uLimit: dateVal[1] ? convertedDate2: null, type: "Date" };
            }
            else{
              val = { lLimit: new Date(dateVal[0]).getTime(), uLimit: dateVal[1] ? new Date(dateVal[1]).getTime(): dateVal[1], type: "Date" }          
            }
            filterVals[field] = val;
            if (dateVal[0] == null && dateVal[1] == null) {
              delete filterVals[field];
            }
          }
        });
      }
      let hasNumbers = this.quickFilterConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "number" || e.fieldType.toLowerCase() == "double");
      if (hasNumbers.length > 0) {
        hasNumbers.forEach((f: any) => {
          let field = f.name;
          let numberValue = value[field];
          if (numberValue && !Array.isArray(numberValue)) {
            filterVals[field] = {
              lLimit: numberValue.min, uLimit: numberValue.max, type: "Number"
            }
            if (numberValue.min == null && numberValue.max == null) {
              delete filterVals[field];
            }
          }
        });
      }
      this.filter.quickFilter = filterVals;
      this.onRefresh();
}
    });
  }
	getGridConfig() {
    const self = this;
    this.tableConfig.tableStyle = this.appUtilBaseService.getTableView(this.tableConfig.tableStyle,this.tableConfig.rowSpacing,this.tableConfig.rowHeight)?.tableStyle;
    return {
      data: this.gridData,
      columns: this.getColumns(),
      ajaxUrl: Table1ApiConstants.getDatatableData,
      select: true,
      colReorder: (String(this.tableConfig?.columnReorder)?.toLowerCase() === 'true'),
     detailPageNavigation: (this.tableConfig?.detailPageNavigation?.toLowerCase() == 'click_of_the_row' ? 'row_click' : (this.tableConfig?.detailPageNavigation?.toLowerCase() == 'click_on_navigate_icon' ? 'row_edit' : '')),
      toggleColumns: (String(this.tableConfig?.toggleColumns)?.toLowerCase() === 'true'),
      paging: !(String(this.tableConfig?.infiniteScroll)?.toLowerCase() === 'true'),
      scrollX: true,
      scrollCollapse: true,
      pageLength: parseInt(String(this.tableConfig?.pageLimit)),
      deferRender: true,
      ordering: true,
      sortField: this.tableConfig.sortField,
      sortOrder: this.tableConfig.sortOrder,
      colResize: (String(this.tableConfig?.columnResize)?.toLowerCase() === 'true'),
      disableSelection: ((this.tableConfig?.recordSelection?.toLowerCase() == 'multiple_records' || this.tableConfig?.recordSelection?.toLowerCase() == 'single_record_only') ? false : true),
      recordSelection: (this.tableConfig?.recordSelection?.toLowerCase() == 'multiple_records' ? 'multi' : (this.tableConfig?.recordSelection?.toLowerCase() == 'single_record_only' ? 'single' : '')),
      bFilter: false,
      enterKeytoSearch: false,
      showGridlines:this.tableConfig.showGridlines,
      striped:this.tableConfig.striped,
      rowSpacing:this.appUtilBaseService.getTableView(this.tableConfig.tableStyle,this.tableConfig.rowSpacing,this.tableConfig.rowHeight)?.rowSpacing,
      rowHeight:this.appUtilBaseService.getTableView(this.tableConfig.tableStyle,this.tableConfig.rowSpacing,this.tableConfig.rowHeight)?.rowHeight,
      sortSeparator:this.separator,
      rowGrouping: jQuery.isEmptyObject(this.tableConfig?.groupOnColumn) ? '' : this.tableConfig?.groupOnColumn?.name,
      rowGroupColumns: this.tableConfig?.rowGroupColumns,
      rowGroup: (String(this.tableConfig?.rowGroup)?.toLowerCase() === 'yes'),
      currentPageName:this.pageViewTitle,
      fixedColumns: {
        left: parseInt(String(this.tableConfig?.leftFreezeUptoColumn || '0') ),
        right: parseInt(String(this.tableConfig?.rightFreezeFromColumn || '0') )
      },
     isChildPage: this.isChildPage,
      parentId: this.getParentId(),
      uniqueIdentifier:this.tableConfig?.uniqueIdentifier|| null,
      defaultSearch:false,
      searchParams:{},
      onRowMenuClick: (option: any, row: any, data: any) => {
      },

      onRowSelect: (selectedRows: any, id: any) => {
        this.getSelectedvalues(selectedRows, id);
      },
      onRowDeselect: (selectedRows: any) => {
        this.getSelectedvalues(selectedRows, '');
      },
      onRowClick: (event: any, id: string) => {
        this.onUpdate(id, event);

      },
      drawCallback: (settings: any, apiScope: any) => {
        this.onDrawCallback(settings, apiScope);
      },
      onAfterServiceRequest: (data: any) => {
        this.onAfterServiceRequest(data)
      }
    };

  }

  onAfterServiceRequest(data: any) {
    // Callback function for getting Datatable data 
    // console.log(data)
  }

  onDrawCallback(settings: any, apiScope: any) {
    // Callback function, which is called every time DataTables performs a draw
  }

  getSelectedvalues(selectedRows: any, id: string) {
    let sids: any = selectedRows?.data();
    this.selectedValues = [];
    sids?.map((obj: any) => {
      this.selectedValues.push(obj.sid)
    })
    if (this.selectedValues.length > 0) {
      this.isRowSelected = true;
    } else if (this.selectedValues.length <= 0) {
      this.isRowSelected = false;
    }
    this.actionButtonEnableDisable();
  }
actionButtonEnableDisable() {
    this.leftActionBarConfig?.children?.map((ele: any) => {
      if (ele?.action === 'delete' && ele.buttonEnabled != 'conditional') {
        if (this.selectedValues?.length > 0) {
          ele.buttonEnabled = 'yes';
        } else {
          ele.buttonEnabled = 'no';
        }
      }
    })
  }
  getColumns() {
   const json1 = this.tableConfig.children ||[];
    const json2 = this.customRenderConfig.children ||[];
    let merged = [];
    for (let i = 0; i < json1.length; i++) {
 if(json1[i].mapping?.length > 0){
        json1[i].orderable = false;
      }
      merged.push({
        ...json1[i],
        ...(json2.find((itmInner: any) => itmInner.fieldName === json1[i].fieldName))
      });
    }
    return merged;
  }
showToastMessage(config: object) {
    this.messageService.add(config);
  }
getParentId() {
  const value: any = "parentId";
  let property: Exclude<keyof Table1ListBaseComponent, ' '> = value;
  if (this.isChildPage) {
    if (this[property]) {
      return this[property];
    } else {
      return false;
    }
  }
}
leftPad(num:number, length:number) {
    var result = '' + num;
    while (result.length < length) {
      result = '0' + result;
    }
    return result;
  }
	onDelete() {
    if (this.selectedValues.length > 0) {
      let requestedParams: any = { ids: this.selectedValues.toString() }
      this.confirmationService.confirm({
        message: this.translateService.instant('DELETE_CONFIRMATION_MESSAGE'),
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const deleteSubscription = this.table1Service.delete(requestedParams).subscribe((res: any) => {
            this.showToastMessage({ severity: 'success', summary: '', detail: this.translateService.instant('RECORDS_DELETED_SUCCESSFULLY') });
            requestedParams = {};
            this.selectedValues = [];
            this.onRefresh(true);

          });
          this.subscriptions.push(deleteSubscription);
        },
        reject: () => {
          
        },
      });
    }

  }
	getValue(formControl: FormGroup, ele: string) {
    const parent = ele.split('?.')[0];
    if (formControl.controls[parent] instanceof FormGroup){
      const child = ele.split('?.')[1];
      return formControl.controls[parent].value[child];
    }
    else
      return formControl.controls[parent].value;
  }
	enableChildOptions(){
	}
	// closeAdvancedSearchPopup() {
  //   this.renderer2.listen('window', 'click', (e: Event) => {
  //     let clickedInside = this.menu?.nativeElement.contains(e.target);
  //     if(e.target !== this.toggleButton?.nativeElement&& !clickedInside &&this.showAdvancedSearch){
  //       this.showAdvancedSearch = false;
  //     }
  //   );
  // }
clearFilters(){
  this.filter.globalSearch = '';
  this.isSearchFocused = false;
}

focus(){
  this.isSearchFocused = !this.isSearchFocused;
}
	initSearchForm(){
  this.tableSearchFieldConfig= this.appUtilBaseService.getControlsFromFormConfig(this.tableSearchConfig)
}
	onUpdate(id: any,event?:any) {
	if (this.tableConfig.detailPage?.url) {
      const value: any = "parentId";
       let property: Exclude<keyof Table1ListBaseComponent, ''> = value;
       const methodName: any = "onUpdateChild";
       let action: Exclude<keyof Table1ListBaseComponent, ''> = methodName;
       if (this.isChildPage && this[property]) {
	       if (typeof this[action] === "function") {
	        	this[action](id);
	         }
       }
       else {
       	this.router.navigateByUrl(this.tableConfig.detailPage.url + '?id=' + id)
       }
    }
}
	onKeydown(event: any) {
  if (event.which === 13 || event.keyCode === 13) {
    // this.filter.globalSearch = this.globalSearch
   this.onRefresh();
  }
}
	getSearchData(searchFields: any, config: any) {
  let searchData: any = {}
  for (const key in searchFields) {
      if((config[key] &&  config[key].uiType !== 'autosuggest')||  !config[key]){
        if(searchFields[key]){
          searchData[key] = searchFields[key];
        }
        
      }
  }
  return searchData;
}

 assignTableParams() {
    const params: any = {};
    this.filter.sortField = this.tableConfig.groupOnColumn ? this.tableConfig.groupOnColumn?.name : this.filter.sortField;
    const searchData = { ...this.getSearchData(this.filter.advancedSearch, this.tableSearchFieldConfig), ...this.getSearchData(this.filter.quickFilter, this.quickFilterFieldConfig) }
    if (this.filter.globalSearch)
      searchData['_global'] = this.filter.globalSearch;

    if (this.filter.sortField && this.filter.sortOrder) {
    let columnName:any = null;
    this.tableConfig.children.map((ele: any) => {
      if (ele.uiType === "autosuggest" && this.filter.sortField === ele.name) {
        columnName = (ele.name + "__value__" + ele.displayField);
      }
      else if(this.filter.sortField === ele.name){
        columnName = this.filter.sortField 
      }
      if(columnName){
        params.order = [{
          column: columnName,
          dir: this.filter.sortOrder
        }]
      }
      else{
        params.order = null;
      }
    })
  }
    else {
      params.order = null;
    }
    params.search = searchData;

    return params;
  }
 updateActions() {
        this.actionBarConfig = this.appUtilBaseService.getActionsConfig(this.leftActionBarConfig.children) ||[];
        this.actionBarConfig?.forEach((actionConfig: any) => {
            if (actionConfig && actionConfig.visibility === 'conditional' && actionConfig.conditionForButtonVisiblity) {
                const conResult = this.appUtilBaseService.evaluvateCondition(actionConfig.conditionForButtonVisiblity?.query?.rules, actionConfig.conditionForButtonVisiblity?.query?.condition);
                this.validateActions(actionConfig.action, conResult, 'view');
            }
            if (actionConfig && actionConfig.buttonEnabled === 'conditional' && actionConfig.conditionForButtonEnable) {
                const conResult = this.appUtilBaseService.evaluvateCondition(actionConfig.conditionForButtonEnable?.query?.rules, actionConfig.conditionForButtonEnable?.query?.condition);
                this.validateActions(actionConfig.action, conResult, 'edit');
            }
        })
    }
    validateActions(label: string, result: boolean, action: string) {
        if (action === 'view') {
            if (result && this.conditionalActions.hideActions.includes(label))
                this.conditionalActions.hideActions?.splice(this.conditionalActions.hideActions?.indexOf(label), 1)
            else if (!result && !this.conditionalActions.hideActions.includes(label))
                this.conditionalActions.hideActions.push(label);
        }
        else if (action === 'edit') {
            if (result && this.conditionalActions.disableActions.includes(label))
                this.conditionalActions.disableActions.splice(this.conditionalActions.disableActions?.indexOf(label), 1);
            else if (!result && !this.conditionalActions.disableActions.includes(label))
                this.conditionalActions.disableActions.push(label);
        }
    }
  disablechildAction(pid?:any) {
      const value: any = "parentId";
      let property: Exclude<keyof Table1ListBaseComponent, ' '> = value;
        const parentId = this[property] || pid;
        this.leftActionBarConfig?.children?.map((ele: any) => {
          if (ele?.action === 'new' && !parentId && this.isChildPage && ele.buttonEnabled != 'conditional') {
            ele.buttonEnabled = 'no';
          }
          else if (ele.action === 'new' && parentId && this.isChildPage && ele.buttonEnabled != 'conditional') {
            ele.buttonEnabled = 'yes';
          }
        })
      }
	loadGridData() {
    let gridSubscription: any;
    if (environment.prototype && this.tableConfig.children?.length > 0) {
      gridSubscription = this.table1Service.getProtoTypingData().subscribe((data: any) => {
        this.gridData = [...this.gridData, ...data];
        this.isPageLoading = false;
      });
    }
    else {
      this.gridData = []
    }
}
	clearFilterValues() {
  this.tableSearchControls.reset();
  this.filter.advancedSearch = {};
  this.onRefresh();
  this.filtersApplied = false;
}
	onRefresh(fromDelete?:boolean): void {
    const fromDel = fromDelete || false;
    const params = this.assignTableParams();
    this.gridComponent.refreshGrid(params,fromDel);
    this.selectedValues =[];
  }
	actionBarAction(btn: any) {
    const methodName: any = (`on` + btn.action.charAt(0).toUpperCase() + btn.action.slice(1));
    let action: Exclude<keyof Table1ListBaseComponent, ' '> = methodName;
   const config = this.getButtonConfig(btn);
    if (btn.action === 'navigate_to_page' && btn.pageName?.url) {
      this.router.navigateByUrl(btn.pageName.url);
    }
else if(this.defaultActions.includes(btn.action) && typeof this[action] === "function"){
      this[action]();
    }
    else if (typeof this[action] === "function" && (btn.beforeAction ==='show_confirmation' || btn.beforeAction === 'get_additional_info')) {
      this.showConfirmationPopup(config,btn);
    }
    else if (typeof this[action] === "function"){
      this[action]();
    }
  }

  showConfirmationPopup(config: any, btn: any) {
     const methodName: any = (`on` + btn.action.charAt(0).toUpperCase() + btn.action.slice(1));
    let action: Exclude<keyof Table1ListBaseComponent, ' '> = methodName;
    const confirmationReference = this.dialogService.open(ConfirmationPopupComponent, {
      header: config.confirmationTitle,
      width: '30%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      styleClass: "confirm-popup-modal",
      showHeader: true,
      closable: true,
      data: {
        config: config,
      }
    });
    confirmationReference.onClose.subscribe((result: any) => {
      if (result) {
        if (typeof this[action] === "function") {
          this[action](result);
        }
      }
    })
  }
	getButtonConfig(btn:any){
    return {
      action:btn.action,
      confirmationTitle:btn.confirmationTitle|| 'Confirmation',
      confirmationText:btn.confirmationText || 'Do you want to perform the action?',
      fields: btn.fields || {"children":[]},
        confirmButton:btn.confirmationButtonText,
      rejectButton:btn.cancelButtonText,
      values:(this.responseData?.filter((o:any)=>o.sid == this.selectedValues[0]))[0]
    }
  }
	toggleAdvancedSearch() {
  this.showAdvancedSearch = !this.showAdvancedSearch;
}
	initFilterForm(){
    this.quickFilterFieldConfig= this.appUtilBaseService.getControlsFromFormConfig(this.quickFilterConfig);
    this.filterSearch();
}
	onNew() {
	const value: any = "parentId";
	let property: Exclude<keyof Table1ListBaseComponent, ''> = value;
	if (this.isChildPage && this[property]) {
		const methodName: any = "onNewChild";
		let action: Exclude<keyof Table1ListBaseComponent, ''> = methodName;
		if (typeof this[action] == "function") {
			this[action]();
		}
	}
	else {
		this.router.navigate(['../table1detail'], { relativeTo: this.activatedRoute});
	}
}
	onBack(){
this.location.back();
}
	advancedSearch() {
    this.filter.advancedSearch = this.tableSearchControls.value;
    let hasDates = this.tableSearchConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "date" || e.fieldType.toLowerCase() == "datetime");
 if (hasDates.length > 0) {
      hasDates.forEach((f: any) => {
        let val:any ={};
        let field = f.name;
        let value = this.filter.advancedSearch[field];
        if (value && Array.isArray(value)) {
            if(this.tableSearchFieldConfig[field].uiType ==='date'){
              const tempDate1 = new Date(value[0]);
              const tempDate2 = new Date(value[1]);
              const convertedDate1 = tempDate1.getFullYear() + '-' + this.leftPad((tempDate1.getMonth() + 1), 2) + '-' + this.leftPad(tempDate1.getDate(), 2);
              const convertedDate2 = tempDate2.getFullYear() + '-' + this.leftPad((tempDate2.getMonth() + 1), 2) + '-' + this.leftPad(tempDate2.getDate(), 2);
              val = { lLimit:convertedDate1 , uLimit: value[1] ? convertedDate2: null, type: "Date" };
            }
            else{
              val = { lLimit: new Date(value[0]).getTime(), uLimit: value[1] ? new Date(value[1]).getTime(): value[1], type: "Date" }          
            }
          
          this.filter.advancedSearch[field] = val;
          if (value[0] == null && value[1] == null) {
            delete this.filter.advancedSearch[field];
          }
        }
      });
    }
    let hasNumbers = this.tableSearchConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "number" || e.fieldType.toLowerCase() == "double");
    if (hasNumbers.length > 0) {
      hasNumbers.forEach((f: any) => {
        let field = f.name;
        let value = this.filter.advancedSearch[field];
        if (value && !Array.isArray(value)) {
          this.filter.advancedSearch[field] = {
            lLimit: value.min, uLimit: value.max, type: "Number"
          }
          if (value.min == null && value.max == null) {
            delete this.filter.advancedSearch[field];
          }
        }
      });
    }
    this.onRefresh();
    this.toggleAdvancedSearch();
    this.filtersApplied = true;
  }
	calculateFormula(){
	
}
	clearGlobalSearch(){
  this.filter.globalSearch = '';
  this.onRefresh();
}

    onInit() {
		
		this.initSearchForm();

		this.initFilterForm();
		 this.tableConfig.children = this.appUtilBaseService.formatTableConfig(this.tableConfig.children);
    this.tableFieldConfig = this.appUtilBaseService.formatTableFieldConfig(this.tableConfig.children);
    this.loadGridData();
    this.disablechildAction();
    this.updateActions();
    this.gridConfig = this.getGridConfig();
    this.selectedColumns = this.gridConfig.columns;
    this.actionButtonEnableDisable();
    }
	
     onDestroy() {
		
		
        this.subscriptions.forEach((subs: { unsubscribe: () => void; }) => subs.unsubscribe());
    }
     onAfterViewInit() {
		
    }

}
