import { ApplicationUserService } from '../application-user.service';
import { ApplicationUserBase} from '../application-user.base.model';
import { Directive, EventEmitter, Input, Output, SecurityContext, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppUtilBaseService } from '@baseapp/app-util.base.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ChangeLogsComponent } from '@libsrc/change-logs/change-logs.component'
import { ApplicationUserApiConstants } from '@baseapp/application-user/application-user/application-user.api-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent } from '@libsrc/confirmation/confirmation-popup.component';
import { WorkflowConfirmationPopupComponent } from '@libsrc/confirmation/workflow-confirmation-popup.component';
import { FormControl, FormGroup, Validators, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { debounceTime, fromEvent, catchError, combineLatest, distinctUntilChanged, of, Observer, Subscription, map, Observable, Subject } from 'rxjs';
import { environment } from '@env/environment';
import { ActionItem } from '@libsrc/action-bar/action-bar.component';
import { AppConstants } from '@app/app-constants';
import { AppGlobalService } from '@baseapp/app-global.service';
import { AppBaseService } from '@baseapp/app.base.service';
import { WorkflowSimulatorComponent } from '@libsrc/workflow-simulator/workflow-simulator.component';
import { BreadcrumbService } from '@libsrc/breadcrumb/breadcrumb.service';
import { UploaderService } from '@baseapp/upload-attachment.service';
import { BaseAppConstants } from '@baseapp/app-constants.base';
import { WorkflowHistoryComponent } from '@libsrc/workflow-history/workflow-history.component';
import { CustomValidatorService } from '@libsrc/validators/customValidator.service';
import { AppLoaderService } from '@baseapp/app-loader.service';

@Directive(
{
	providers:[MessageService, ConfirmationService, DialogService]
}
)
export class ApplicationUserDetailBaseComponent{
	
	
	id: any;
pid:any;
isMobile: boolean = AppConstants.isMobile;  
errorfields: any = {};           
backupData:any = {};
hiddenFields:any = {};
data:any = {};
formErrors:any = {};
inValidFields:any = {};
formFieldConfig:any = {};
securityJson:any = {
}
formConfig = {};     
actionButtons:ActionItem[] = [];  
wizardItems:any = [];
currentUserData:any;
selectedItems:any ={};
workflowType = "";
workFlowEnabled = false;
workFlowInitialState = "";
workFlowField = "";
workflowActions:any ={
    disableActions:[],
    enableActions:[],
    hideActions:[]
  };
  isFormValueChanged: boolean = false;
  mandatoryFields:any ={};
  validatorsRetained:any ={};
  isSaveResponseReceived:boolean = false;
  formSecurityConfig:any = {};
  enableReadOnly = AppConstants.enableReadOnly;
 showScrollSpy = AppConstants.showScrollSpy;
isRowSelected:boolean = true; 
isPrototype = environment.prototype;
isList = false;
detailPageIgnoreFields:any=[];
autoSuggestPageNo:number = 0;
complexAutoSuggestPageNo:number = 0
  fieldEditMode: any = {};
conditionalActions:any ={
  disableActions:[],
  hideActions:[]
}
actionBarConfig:any =[];
dateFormat: string = AppConstants.calDateFormat;
subscriptions: Subscription[] = [];
activeTabIndexes: any = {};
 showWorkflowSimulator:boolean = false;
roles:any ={};
timeFormatPrimeNG: string = AppConstants.timeFormatPrimeNG;
dateFormatPrimeNG: string = AppConstants.dateFormatPrimeNG ;
minFraction = AppConstants.minFraction;
maxFraction = AppConstants.maxFraction;
currency = AppConstants.currency;
currencyDisplay = AppConstants.currencyDisplay;
defaultLocale: string = AppConstants.defaultLocale; 
calculationError:any ={};
public validators:any ={};
public errorMessages:any = {};
 deletedAttachments:any ={};
fileErrorMessages:any ={}
inputText:any ='';
defaultActions= ['save','cancel','delete','refresh','back','changelog','workflowhistory','import','export','new'];
currentUserRolesMapping:any ={};

	bsModalRef?: BsModalRef;
	isSearchFocused:boolean = false;
showBreadcrumb = AppConstants.showBreadcrumb;
	comments: string ='';
confirmationReference:any;
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
    "outline" : false,
    "children" : [ {
      "visibility" : "show",
      "buttonStyle" : "curved",
      "confirmationText" : "confirm",
      "label" : "SAVE",
      "type" : "button",
      "visiblity" : "show",
      "outline" : false,
      "buttonType" : "icon_on_left",
      "showOn" : "both",
      "enableOnlyIfRecordSelected" : false,
      "buttonEnabled" : "yes",
      "action" : "save",
      "confirmationTitle" : "confirmation",
      "conditionForButtonEnable" : "",
      "confirmationButtonText" : "yes",
      "cancelButtonText" : "no"
    }, {
      "visibility" : "show",
      "buttonStyle" : "curved",
      "confirmationText" : "confirm",
      "label" : "CANCEL",
      "type" : "button",
      "visiblity" : "show",
      "outline" : false,
      "buttonType" : "icon_on_left",
      "showOn" : "both",
      "enableOnlyIfRecordSelected" : false,
      "buttonEnabled" : "yes",
      "action" : "cancel",
      "confirmationTitle" : "confirmation",
      "conditionForButtonEnable" : "",
      "confirmationButtonText" : "yes",
      "cancelButtonText" : "no"
    }, {
      "visibility" : "show",
      "buttonStyle" : "curved",
      "confirmationText" : "confirm",
      "label" : "CHANGELOG",
      "type" : "button",
      "visiblity" : "show",
      "outline" : false,
      "buttonType" : "icon_on_left",
      "showOn" : "both",
      "enableOnlyIfRecordSelected" : false,
      "buttonEnabled" : "yes",
      "action" : "changelog",
      "confirmationTitle" : "confirmation",
      "conditionForButtonEnable" : "",
      "confirmationButtonText" : "yes",
      "cancelButtonText" : "no"
    } ],
    "displayCount" : "2",
    "label" : "BUTTON_GROUP",
    "type" : "buttonGroup"
  } ],
  "type" : "actionBar"
}
	workflowActionBarConfig : any = {
  "outline" : false,
  "children" : [ {
    "outline" : true,
    "buttonStyle" : "curved",
    "displayCount" : "2",
    "label" : "BUTTON_GROUP",
    "type" : "buttonGroup"
  } ],
  "label" : "Workflow Action Bar",
  "type" : "workflowActionBar"
}
	detailCaptionBarConfig : any = {
  "children" : [ ],
  "type" : "captionBar"
}
	detailFormStructureConfig : any = {
  "children" : [ ]
}
	detailFormConfig : any = {
  "outline" : false,
  "children" : [ {
    "allowEditing" : "yes",
    "fieldName" : "email",
    "data" : "",
    "isPrimaryKey" : true,
    "label" : "EMAIL",
    "type" : "formField",
    "mandatory" : "yes",
    "field" : "email",
    "uiType" : "email",
    "name" : "email",
    "fieldType" : "string",
    "allowViewing" : "yes",
    "fieldId" : "email"
  }, {
    "allowEditing" : "yes",
    "fieldName" : "firstName",
    "data" : "",
    "isPrimaryKey" : false,
    "label" : "FIRST_NAME",
    "type" : "formField",
    "mandatory" : "yes",
    "field" : "firstName",
    "uiType" : "text",
    "name" : "firstName",
    "fieldType" : "string",
    "allowViewing" : "yes",
    "fieldId" : "firstName"
  }, {
    "allowEditing" : "yes",
    "fieldName" : "lastName",
    "data" : "",
    "isPrimaryKey" : false,
    "label" : "LAST_NAME",
    "type" : "formField",
    "mandatory" : "yes",
    "field" : "lastName",
    "uiType" : "text",
    "name" : "lastName",
    "fieldType" : "string",
    "allowViewing" : "yes",
    "fieldId" : "lastName"
  } ],
  "columns" : "2",
  "type" : "form",
  "actions" : {
    "read" : {
      "App Admin" : {
        "access" : "yes"
      }
    },
    "update" : {
      "App Admin" : {
        "access" : "yes"
      }
    },
    "create" : {
      "App Admin" : {
        "access" : "yes"
      }
    },
    "changelog" : {
      "App Admin" : {
        "access" : "yes"
      }
    },
    "delete" : {
      "App Admin" : {
        "access" : "yes"
      }
    }
  }
}
	pageViewTitle: string = 'APPLICATION_USER_DETAIL';
	
	public applicationUserService = inject(ApplicationUserService);
public appUtilBaseService = inject(AppUtilBaseService);
public translateService = inject(TranslateService);
public messageService = inject(MessageService);
public confirmationService = inject(ConfirmationService);
public dialogService = inject(DialogService);
public domSanitizer = inject(DomSanitizer);
public bsModalService = inject(BsModalService);
public activatedRoute = inject(ActivatedRoute);
public breadcrumbService = inject(BreadcrumbService);
public appBaseService = inject(AppBaseService);
public appLoaderService = inject(AppLoaderService);
public router = inject(Router);
public appGlobalService = inject(AppGlobalService);
public customValidatorService = inject(CustomValidatorService);
public uploaderService = inject(UploaderService);
public location = inject(Location);

		detailFormControls : UntypedFormGroup = new UntypedFormGroup({
	firstName: new UntypedFormControl('',[Validators.required]),
	email: new UntypedFormControl('',[Validators.required]),
	lastName: new UntypedFormControl('',[Validators.required]),
});


	
	getDisabled(formControl: any, ele: string) {
  const parent = ele.split('?.')[0];
  if (formControl.controls[parent] instanceof FormGroup){
    return formControl.get(ele)?.disabled
  }
  else
    return formControl.controls[parent].disabled;
}
	actionBarAction(btn: any) {
    const methodName: any = (`on` + btn.action.charAt(0).toUpperCase() + btn.action.slice(1));
    let action: Exclude<keyof ApplicationUserDetailBaseComponent, ' '> = methodName;
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
    let action: Exclude<keyof ApplicationUserDetailBaseComponent, ' '> = methodName;
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
	getTabIndex(tabName:string){
    return 0;
  }
	canDeactivate(): Observable<boolean> | boolean {
    
     if(this.appUtilBaseService.isEqualIgnoreCase(this.detailFormControls.getRawValue(), this.backupData,this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(),this.backupData,this.detailPageIgnoreFields),true)){
       return true;
     }
    else{
      return Observable.create((observer: Observer<boolean>) => {
        this.confirmationService.confirm({
          message: this.translateService.instant('DISCARD_UNSAVED_CHANGES'),
          header: 'Confirmation',
          icon: 'pi pi-info-circle',
          accept: () => {
            observer.next(true);
            observer.complete();
          },
          reject: () => {
            observer.complete();
          },
        });
      });
    }
  }
	updateFields(formFieldConfig: any, ele: string, childEle: string, foreignKey?:string) {
    const fieldConfig = (childEle) ? formFieldConfig[ele][childEle] : formFieldConfig[ele];
    if (fieldConfig?.allowViewing === 'no') {
      if (childEle) {
        if (!this.hiddenFields[formFieldConfig[ele].name])
          this.hiddenFields[formFieldConfig[ele].name] = {};
        this.hiddenFields[formFieldConfig[ele].name][fieldConfig.name] = true;
      }
      else
        this.hiddenFields[formFieldConfig[ele].name] = true;
    }
    else if (fieldConfig?.viewConditionally && fieldConfig?.allowViewing === 'conditional') {
      this.restrictEditandView(fieldConfig.viewConditionally, 'view', fieldConfig.name,false,foreignKey,fieldConfig)
    }
    if (fieldConfig?.allowEditing === 'no'|| (fieldConfig?.isPrimaryKey && this.id)) {
      if (childEle)
        this.detailFormControls.get(`${[formFieldConfig[ele].name]}.${fieldConfig.name}`)?.disable({ emitEvent: false });
      else{
        this.detailFormControls.get(fieldConfig.name)?.disable({ emitEvent: false });
        if(foreignKey)
        this.detailFormControls.get(foreignKey)?.disable({ emitEvent: false });
      }
    }
    else if (formFieldConfig[ele]?.editConditionally && formFieldConfig[ele]?.allowEditing === 'conditional') {
      this.restrictEditandView(fieldConfig.editConditionally, 'edit', fieldConfig.name,false,foreignKey,fieldConfig);
    }
    if (formFieldConfig[ele]?.mandatory === 'conditional' && formFieldConfig[ele]?.conditionalMandatory) {
      this.addRequiredValidator(fieldConfig.conditionalMandatory, fieldConfig.name, fieldConfig,foreignKey);
      if (foreignKey) {
        let hasMandatory: boolean = false;
        this.formFieldConfig[foreignKey]?.childFields?.forEach((o: any) => {
          if (this.detailFormControls.controls[o].hasValidator(Validators.required)) {
            hasMandatory = true;
          }
        })
        if (hasMandatory) {
          this.detailFormControls.controls[foreignKey].addValidators([Validators.required]);
        }
        else if (this.detailFormControls.controls[foreignKey].hasValidator(Validators.required)) {
          this.detailFormControls.controls[foreignKey].removeValidators([Validators.required]);
        }
      }
    }
  }
	formatFormDataBeforeSave() {
    let data = this.detailFormControls.getRawValue();
    for (const ele in this.formFieldConfig) {
      const ec = this.formFieldConfig[ele];
      if (ec.columns && !ec.multipleValues) {
        data[ec.name] = this.configureRequestData(data[ec.name], ec.columns, ec.name)
      }
      else if (ec.columns && ec.multipleValues && data[ec.name]) {
        data[ec.name]?.map((o: any,index:number) => {
          const tempData = this.configureRequestData(data[ec.name][index], ec.columns, ec.name,index);
          data[ec.name][index] = tempData;
        })
      }
    }
    data = this.configureRequestData(data,this.detailFormConfig.children);
    return data;
  }
	bindData(data: any, ele: any, parentEle?: string, index?: number) {
    if (ele.fieldType == 'Date' && data) {
      const formattedDate = new Date(data);
      return formattedDate;
    }
    else if (['imageCarousel', 'attachments'].includes(ele.uiType)) {
      const responseFiles = this.appUtilBaseService.createImagePreviewURL(data);
      return responseFiles;
    } 
      return data;
  }
	tabviewValidation(array: any, tabIndexes: any = {} , type:string) {
    array.children.map((o: any, index: number) => {
      if (o.type === type) {
        tabIndexes[o.tabName] =o;
      }
      if (o.children)
        this.tabviewValidation(o, tabIndexes,type);
    })
    return tabIndexes;
  }
	formValueChanges() {
    this.detailFormControls.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
    )
      .subscribe(() => {
        this.updateAllowedActions();
        this.readOnlyBasedonRoles();
        this.isFormValueChanged = true;
      })
  }
	deleteFiles(splittedData: any) {
       return of(splittedData);
  }
	initFormValidations(){
    this.detailFormControls.enable({ emitEvent: false });
    this.hiddenFields = {};
    this.updateAllowedActions();
    this.formValueChanges();
    this.disableDependantFields();
    this.addValidatorsForMinMaxDateValidation();
  }

addValidatorsForMinMaxDateValidation() {
    for (const property in this.formFieldConfig) {
      if ((this.formFieldConfig[property]?.uiType?.toLowerCase() == 'datetime' || this.formFieldConfig[property]?.uiType?.toLowerCase() == 'date') && (this.formFieldConfig[property]?.minDate || this.formFieldConfig[property]?.maxDate)) {
        if (this.formFieldConfig[property]?.minDate) {
          this.detailFormControls.controls[property].addValidators(this.customValidatorService.dateValidator('min', this.formFieldConfig[property]))
        }
        if (this.formFieldConfig[property]?.maxDate) {
          this.detailFormControls.controls[property].addValidators(this.customValidatorService.dateValidator('max', this.formFieldConfig[property]))
        }
      }
    }
  }

showMessage(config:any){
    this.messageService.clear();
    this.messageService.add(config);
}
	loadActionbar(){
    
}
	editFormula(config:any,fieldname:any){
     const fieldConfig = config[fieldname]
     if(fieldConfig.formulaMethod){
       let methodName: Exclude<keyof ApplicationUserDetailBaseComponent, ' '> = fieldConfig.formulaMethod
         if(typeof this[methodName] ==="function")
          this[methodName](this.detailFormControls.getRawValue());
     }
   }
	getButtonConfig(btn:any){
    return {
      action:btn.action,
      confirmationTitle:btn.confirmationTitle|| 'Confirmation',
      confirmationText:btn.confirmationText || 'Do you want to perform the action?',
      fields: btn.fields || {"children":[]},
         confirmButton:btn.confirmationButtonText,
      rejectButton:btn.cancelButtonText,
      values:this.detailFormControls.getRawValue()
    }
  }
	restrictEditandView(ele: any, action: string, fieldName: string, fromActionBar?: boolean,foreignKey?:string,foreignkeyReference?:any) {
    const config = foreignkeyReference?foreignkeyReference :this.formFieldConfig;
    const conResult = this.appUtilBaseService.evaluvateCondition(ele?.query?.rules, ele?.query?.condition, { ...this.data, ...this.detailFormControls.getRawValue() }, config);
    if (fromActionBar) {
      this.allocateActions(fieldName, conResult, action)
    } else {
      if (action == 'view') {
        this.hiddenFields[fieldName] = conResult ? false : true;
      }
      else if (action == 'edit') {
        conResult ? this.detailFormControls.get(fieldName)?.enable({ emitEvent: false }) :
          this.detailFormControls.get(fieldName)?.disable({ emitEvent: false });
        if (foreignKey) {
          let allKeysenabled: boolean = true;
          this.formFieldConfig[foreignKey]?.childFields?.forEach((o: any) => {
            if (this.detailFormControls.get(o)?.disabled) {
              allKeysenabled = false;
            }
          })
          conResult && allKeysenabled ? this.detailFormControls.get(foreignKey)?.enable({ emitEvent: false }) :
            this.detailFormControls.get(foreignKey)?.disable({ emitEvent: false });
        }
        
      }
    }
  }
	tabValidation(array: any, tabIndexes: any = [] , type:string) {
    let modal:any ={
      tabName :'',
      tabIndex:[]
    }
    let key = Object.keys(array);
    key.map((tabkey:string)=>{
      modal['tabName'] = tabkey;
      array[tabkey].children.map((o: any, index: number) => {
        if (o.type === 'tab') {
         modal.tabIndex.push(o.tabName);
        }
        else{
        if (o.children)
          this.tabValidation(o, tabIndexes,type);
        }
      })
      tabIndexes.push({...modal});
      modal.tabIndex = [];
    })
     return tabIndexes;
   }
	normalize(data:any){
    return data;
  }
	leftPad(num:number, length:number) {
    var result = '' + num;
    while (result.length < length) {
      result = '0' + result;
    }
    return result;
  }
	waitForResponse() {
    if(environment.prototype){
      this.getWorkflowConfig();
    }
    else{
      setTimeout(() => {
        if (this.id && !environment.prototype) {
          if (!this.data?.workflowInfo) {
            this.waitForResponse();
          }
          else {
            this.getWorkflowConfig();
          }
        }
      }, 3000);
    }
  
  }
	bindLookupFields(): void {
    const lookupArray: any = []
    for (const ele in this.formFieldConfig) {
      if (this.formFieldConfig[ele].uiType === 'autosuggest' && this.formFieldConfig[ele].mapping) {
        this.detailFormControls.get(this.formFieldConfig[ele].fieldName)?.valueChanges.subscribe((obj) => {
          this.formFieldConfig[ele].mapping.map((filter: any) => {
            if (this.formFieldConfig[ele].multipleValues && obj) {
              obj?.map((o: any) => {
                const filterValue = o.value? o.value[filter.parentField]:o[filter.parentField];
                lookupArray.push(filterValue);
              })
              this.detailFormControls?.get(filter.childField)?.patchValue(lookupArray.toString());
            }
           else{
              if(obj){
                const filterValue = obj.value? obj.value[filter.parentField]:obj[filter.parentField];
                this.detailFormControls?.get(filter.childField)?.patchValue(filterValue);
              }
              else{
                this.detailFormControls?.get(filter.childField)?.reset();
              }
            }
          })
        })
      }
    }
  }
	createAutoSuggestFields(ele: any) {
    if (!this.selectedItems?.hasOwnProperty(ele)) {
      this.selectedItems[ele] = [];
    }

  }
	onWorkflowhistory() {
    const workflowHistory = this.dialogService.open(WorkflowHistoryComponent, {
      header: 'Workflow History',
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      styleClass: "workflow-history",
      data: {
        id: this.id,
        workflowType: this.workflowType
      }
    });
  }
	updateActions(actionConfig:any){
    if(actionConfig.visibility === 'conditional' && actionConfig.conditionForButtonVisiblity){
      this.restrictEditandView(actionConfig.conditionForButtonVisiblity,'view',actionConfig.action,true);
    }
    if(actionConfig.buttonEnabled === 'conditional' && actionConfig.conditionForButtonEnable){
      this.restrictEditandView(actionConfig.conditionForButtonEnable,'edit',actionConfig.action,true);
    }
  }
	addRequiredValidator(ele: any, fieldName: string, foreignkeyReference?: any,foreignKey?:string) {
    const fieldConfig = foreignkeyReference ? foreignkeyReference :this.formFieldConfig;
    const field = foreignKey ? foreignKey: fieldName;
    const conResult = this.appUtilBaseService.evaluvateCondition(ele.query?.rules, ele.query?.condition, this.detailFormControls.getRawValue(), fieldConfig);
    if (conResult ) {
      this.detailFormControls.controls[fieldName].addValidators([Validators.required]);
    }
    else {
      this.detailFormControls.controls[fieldName].removeValidators([Validators.required]);
    }
    this.detailFormControls.controls[fieldName].updateValueAndValidity({ emitEvent: false });
    this.formFieldConfig[field].isRequired =(conResult)? true:false;

  }
	onUrlClick(event: any) {
      window.open(event.value, '_blank');
  }
	workflowActionBarAction(btn: any) {
    if(!btn.wfAction) {
      if(btn.action)
        this.actionBarAction(btn);
      return;
    }
    const methodName: any = (`onwf` + btn.wfAction.charAt(0).toUpperCase() + btn.wfAction.slice(1));
    let action: Exclude<keyof ApplicationUserDetailBaseComponent, ' '> = methodName;
    const finalArr: string[] = [];
    this.formErrors = {};
    this.inValidFields = {};
    this.mandatoryFields = this.formSecurityConfig?.mandatoryfields?.hasOwnProperty(btn.wfAction) ? this.formSecurityConfig.mandatoryfields[btn.wfAction] : {}
    if (Object.keys(this.mandatoryFields).length > 0)
      this.addValidations(this.mandatoryFields);

    if (!this.appUtilBaseService.validateNestedForms(this.detailFormControls, this.formErrors, finalArr, this.inValidFields,this.formFieldConfig)) {
      if (finalArr.length) {
        this.showMessage({ severity: 'error', summary: 'Error', detail: this.appUtilBaseService.createNotificationList(finalArr), sticky: true });
        if (Object.keys(this.mandatoryFields).length > 0)
          this.clearValidations(this.mandatoryFields);
      }
    }
  else {
      if (typeof this[action] === "function") {
         const actionLabel = this.translateService.instant(btn.label);
        this.confirmationReference= this.dialogService.open(WorkflowConfirmationPopupComponent, {
          header: 'Confirmation',
          width: '30%',
          contentStyle: { "max-height": "500px", "overflow": "auto" },
          styleClass: "confirm-popup-container",
          data: {
            confirmationMsg: `Do you want to ${actionLabel} the record ?`,
            isRequired: this.formSecurityConfig.comments?.hasOwnProperty(btn.wfAction) && this.formSecurityConfig.comments[btn.wfAction],
            action:btn.label
          }
        });

        this.confirmationReference.onClose.subscribe((result: any) => {
          if (Object.keys(this.mandatoryFields).length > 0)
            this.clearValidations(this.mandatoryFields);
          if (result?.accepted) {
            this.comments = result.comments;
           if(!(this.appUtilBaseService.isEqualIgnoreCase(this.detailFormControls.getRawValue(), this.backupData, this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(), this.backupData, this.detailPageIgnoreFields), true))) {
              this.isSaveResponseReceived = false;
              const isToastNotNeeded = true;
              this.onSave(isToastNotNeeded);
              let checkResponse = setInterval(() => {
                if (this.isSaveResponseReceived) {
                  this[action]();
                  clearInterval(checkResponse);
                }
              }, 1000);
            }
            else {
              this[action]();
            }
          }
        });
      }
    }
  }
addValidations(mandatoryFields:[]){
    mandatoryFields.forEach((controlName:string)=>{
      if(this.detailFormControls.controls[controlName].hasValidator(Validators.required)){
        if(!(this.validatorsRetained.hasOwnProperty(controlName))){
          this.validatorsRetained[controlName]= {}
        }
        this.validatorsRetained[controlName]['requiredValidator'] = true;
      }
      else{
        this.detailFormControls.controls[controlName].addValidators([Validators.required]);
        this.detailFormControls.controls[controlName].updateValueAndValidity({emitEvent:false});
      }
     })
  }
	onCancel(){
  this.messageService.clear();
  if (this.appUtilBaseService.isEqualIgnoreCase(this.backupData, this.detailFormControls.getRawValue(), this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(),this.backupData,this.detailPageIgnoreFields), true)) {
    this.showMessage({ severity: 'info', summary: '', detail: this.translateService.instant('NO_CHANGES_AVAILABLE_TO_CANCEL') });
  } else {
    this.confirmationService.confirm({
      message: this.translateService.instant('DISCARD_UNSAVED_CHANGES'),
      header: 'Confirmation',
      accept: () => {
        const patchData = this.appUtilBaseService.deepClone(this.backupData)
        this.detailFormControls.patchValue(patchData,{ emitEvent: false });
      },
      reject: () => {
      },
    });
  }

}
	getId(){
      this.activatedRoute.queryParams.subscribe((params: any) => { 
        this.id = params['id'];
        this.pid = params['pid']
      }); 
    }
	getWorkflowConfig(workflowInfo?:any) {
    const workFlowInfo:any = (this.id)? this.data?.workflowInfo:workflowInfo;
    const params = {
      workflowType: this.workflowType
    }
    if(environment.prototype && this.workFlowEnabled){
      this.appBaseService.getPrototypingworkflow(this.workflowType).subscribe((res:any)=>{
        this.securityJson = res.config;
        this.configureFormOnWorkflow(workFlowInfo);
      })
    }
    else if (workFlowInfo && this.workFlowEnabled){
        this.appBaseService.getWorkFlowConfig(params).subscribe((res: any) => {
          this.securityJson = res.config;
          this.configureFormOnWorkflow(workFlowInfo);
        })
    }
  }
	initForm(){
   this.currentUserData= this.appGlobalService.getCurrentUserData();
    this.formFieldConfig= this.appUtilBaseService.getControlsFromFormConfig(this.detailFormConfig);
    this.actionBarConfig = this.appUtilBaseService.getActionsConfig(this.leftActionBarConfig.children);
    this.appUtilBaseService.configureValidators(this.detailFormControls, this.formFieldConfig);
     this.wizardItems = this.appUtilBaseService.getWizardItemFromFormConfig(this.detailFormStructureConfig, this);
    this.getData();
}
	openWorkflowSimilator() {
    const ref = this.dialogService.open(WorkflowSimulatorComponent, {
      header: 'Workflow Simulator',
      width: '350px',
      data: {
        statusFieldConfig: this.formFieldConfig[this.workFlowField],
        actorFieldConfig: Object.keys(this.securityJson).map((actor)=> {return{label:actor,value:actor}}),
        selectedValues: (this.data?.workflowInfo)? this.data?.workflowInfo[this.workflowType]:{userTypes:[],step:''}
      }
    });
    ref.onClose.subscribe((workflowInfo: any) => {
      if (workflowInfo) {
        this.reloadForm(workflowInfo);
      }
    });
  }
	onBack(){
	this.messageService.clear();
	if (this.appUtilBaseService.isEqualIgnoreCase(this.backupData, this.detailFormControls.getRawValue(), this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(),this.backupData,this.detailPageIgnoreFields), true)){			
     this.location.back();
	}else{
		this.confirmationService.confirm({
		    message:this.translateService.instant('DISCARD_UNSAVED_CHANGES'),
			header:'Confirmation',
			icon:'pipi-info-circle',
			accept:()=>{
              this.backupData = this.appUtilBaseService.deepClone(this.detailFormControls.getRawValue());				
              this.location.back();
			},
			reject:()=>{
			},
		});
	}
}
	checkUnsavedComplexFields():any {
    const newRows:any = []
    let hasUnSavedChanges:boolean = false;
    const data = this.detailFormControls.getRawValue();
    const fields:any =[];
    const complexTable = (Object.keys(this.formFieldConfig)).filter(key=> this.formFieldConfig[key].columns && this.formFieldConfig[key].multipleValues)
       if(complexTable.length> 0){ 
         complexTable.map((field)=>{
          data[field]?.map((e: any) => {
            if(e.isNewRow || this.fieldEditMode[field]){
              hasUnSavedChanges = true;
              fields.push(field);
            }
              newRows.push(e);
          })
         })
       }
       return {
        newRows:newRows,
        fields:[...new Set(fields)],
        hasUnSavedChanges:hasUnSavedChanges
      }
    }
	initWorkflow() {
    if (this.workFlowInitialState && this.workFlowEnabled && this.workFlowField) {
      this.detailFormConfig?.children?.forEach((ele: any) => {
        if (ele?.field === this.workFlowField && ele?.multipleValues) {
          this.detailFormControls.get(this.workFlowField)?.patchValue([this.workFlowInitialState], { emitEvent: false });
          this.backupData[this.workFlowField] = [this.workFlowInitialState];
        }
        else {
          if (ele?.field === this.workFlowField && !ele?.multipleValues) {
            this.detailFormControls.get(this.workFlowField)?.patchValue(this.workFlowInitialState, { emitEvent: false });
            this.backupData[this.workFlowField] = this.workFlowInitialState;
          }
        }
      })
      this.activatedRoute.queryParams.subscribe((params: any) => {
        if (!environment.prototype && !params['id']) {
        const currentUserData= this.appGlobalService.getCurrentUserData();
          const state = this.workFlowInitialState ? this.workFlowInitialState.replace(/ /g, "_").toLowerCase() : '';
         this.appBaseService.getUserRoles().subscribe((response:any)=>{
            this.currentUserRolesMapping = response;
            const actors = this.getRoleShortName(currentUserData.userRoles) || [];
            const workflowInfo = { actors: actors, step: state }
             this.getWorkflowConfig(workflowInfo);
          })
        }
      });
    }
  }

 getRoleShortName(currentUserData:any){
    const tmData:any =[];
    currentUserData.map((o:string)=>{
      if(this.currentUserRolesMapping[o]){
        const d:string = (this.currentUserRolesMapping[o] || '')
        tmData.push(d);
      }
    })
    return tmData;
  }

  camelize(str: string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
        index === 0
          ? letter.toLowerCase()
          : letter.toUpperCase()
      )
      .replace(/\s+/g, '');
  }
	scrolltoTop() {
    const tracker = (<HTMLInputElement>document.getElementsByClassName('main-content')[0])
    let windowYOffsetObservable = fromEvent(tracker, 'scroll').pipe(map(() => {
      return Math.round(tracker.scrollTop);
    }));
    const headerHeight: any = $('#header-container').outerHeight(true);
    const titleBarheight: any = $('#title-bar').outerHeight(true);

    windowYOffsetObservable.subscribe((scrollPos: number) => {
      if (scrollPos >= titleBarheight) {
        $('.wizard-container .p-tieredmenu').animate({
          top: headerHeight, marginTop: '10px'
        }, 0);
      }
      else {
        $('.wizard-container .p-tieredmenu').animate({
          top: headerHeight + titleBarheight
        }, 0);
      }
    })
  }
	configureFormOnWorkflow(workflowDataForNewRec?:any) {
    const actions: any = this.workflowActionBarConfig?.children;
    let workflowInformation:any = {}
 if (this.id) {
workflowInformation.actors = this.data?.workflowInfo && this.data?.workflowInfo[this.workflowType]?.userTypes || [],
workflowInformation.step = this.data?.workflowInfo && this.data?.workflowInfo[this.workflowType]?.step || ''
}
else {
workflowInformation.actors = workflowDataForNewRec.actors || [];
workflowInformation.step = workflowDataForNewRec.step || '';
}
    this.formSecurityConfig = this.appUtilBaseService.getFormSecurityConfigFromSecurityJSON(this.securityJson, this.detailFormControls, actions, workflowInformation);
    console.log(this.formSecurityConfig)
    this.hiddenFields = this.formSecurityConfig.hidefields;

    for (const control in this.detailFormControls.getRawValue()) {
      if (this.formSecurityConfig.disableonlyfields.indexOf(control) > -1)
      // && !(this.formSecurityConfig.enableonlyfields.indexOf(control) > -1)) 
      {
        this.detailFormControls.controls[control].disable({ emitEvent: false });
      }
      if (this.formSecurityConfig.enableonlyfields.indexOf(control) > -1) {
        this.detailFormControls.controls[control].enable({ emitEvent: false });
      }
      if (this.formSecurityConfig.hidefields.indexOf(control) > -1 )
      // && !(this.formSecurityConfig.showfields.indexOf(control) > -1)) 
      {
        this.hiddenFields[control] = true;
      }
      if (this.formSecurityConfig.showfields.indexOf(control) > -1) {
        this.hiddenFields[control] = false;
      }
    }
    this.workflowActions = {
      disableActions: [...this.formSecurityConfig.disableonlyactions],
      enableActions: [...this.formSecurityConfig.enableonlyactions],
      hideActions: [...this.formSecurityConfig.hideactions],
      showActions: [...this.formSecurityConfig.showactions]
    }
  }
	addValidatorsForMultiValues() {
    for (const property in this.formFieldConfig) {
      if (this.formFieldConfig[property].multipleValues && (this.formFieldConfig[property].uiType == 'number')) {
        if(this.formFieldConfig[property].isDouble){
          this.validators[property] = [this.customValidatorService.ValidateDouble,this.customValidatorService.minValueValidator(this.formFieldConfig[property]),this.customValidatorService.maxValueValidator(this.formFieldConfig[property]),this.customValidatorService.validatePattern(this.formFieldConfig[property])];
        }
        else{
          this.validators[property] = [this.customValidatorService.validateNumber, this.customValidatorService.minValueValidator(this.formFieldConfig[property]), this.customValidatorService.maxValueValidator(this.formFieldConfig[property]),this.customValidatorService.validatePattern(this.formFieldConfig[property])]
        }
      }
      else if (this.formFieldConfig[property].multipleValues && this.formFieldConfig[property].uiType == 'string') {
        this.validators[property] = [this.customValidatorService.minLengthValidator(this.formFieldConfig[property]), this.customValidatorService.maxLengthValidator(this.formFieldConfig[property])]
      }
      else if (this.formFieldConfig[property].multipleValues && this.formFieldConfig[property].uiType == 'currency') {
        this.validators[property] = [this.customValidatorService.ValidateDouble, this.customValidatorService.minValueValidator(this.formFieldConfig[property]), this.customValidatorService.maxValueValidator(this.formFieldConfig[property])]
      }
    }
this.errorMessages = {
      'minValue': this.translateService.instant('MIN_VALUE'),
      'maxValue': this.translateService.instant('MAX_VALUE'),
      'minLength': this.translateService.instant('MIN_LENGTH'),
      'maxLength': this.translateService.instant('MAX_LENGTH'),
      'invalid': this.translateService.instant('INVALID'),
      'pattern': this.translateService.instant('PATTERN'),
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
	formatCaptionItems(config: any, data: any) {
    if (Object.keys(data).length > 0) {
      return (this.appUtilBaseService.formatRawDatatoRedableFormat(config, data[config.field]));
    }
    else {
      return '';
    }
  }
	updateAllowedActions() {
    for (const ele in this.formFieldConfig) {
      if (this.detailFormControls.controls[ele] instanceof FormGroup) {
        for (const childEle in this.formFieldConfig[ele])
          this.updateFields(this.formFieldConfig, ele, childEle);
      }
      else {
        if (this.formFieldConfig[ele].mapping) {
          const foreignkeyReference = this.appUtilBaseService.getControlsFromFormConfig(this.formFieldConfig[ele]);
          this.formFieldConfig[ele].mapping.map((fk: any) => {
            this.updateFields(foreignkeyReference, fk.fieldName, '',ele);
          })
        }
        else {
          this.updateFields(this.formFieldConfig, ele, '');
        }
      }
    }

    this.actionBarConfig?.forEach((action:any)=>{
      this.updateActions(action);
    })
  }
	enableChildOptions(){
	}
	confirmationPopup(fields: []) : Observable<boolean>{
    return Observable.create((observer: Observer<boolean>) => {
      this.confirmationService.confirm({
        message: this.translateService.instant('COMPLEX_RECORD_SAVE_CONFIRMATION', { field: fields.toString() }),
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          fields.map((o) => $($(`.${o}_editSave-btn`)).trigger('click'));
           observer.next(true) 
           observer.complete();       
          },
        reject: () => {
          fields.map((o) => $($(`.${o}_editCancel-btn`)).trigger('click'));
          observer.next(true) 
           observer.complete(); 
        },
      });
    });
  }
	loadCaptionbarItems(){
    
}
	generateRequestObj(data: any) {
    const props = Object.keys(data);
    let requestedObj: any = {};
    props.forEach((o: any) => {
      if (this.detailFormControls.controls[o] instanceof FormGroup && !this.formFieldConfig[o].multiple) {
        data[o] = this.configureEmptyValuestoNull(data[o])
      }
      else if (this.detailFormControls.controls[o] instanceof FormGroup && this.formFieldConfig[o].multiple) {
        data[o].map((k: any, index: number) => { data[o][index] = this.configureEmptyValuestoNull(data[o][index]) })
      }
    })
    requestedObj = this.configureEmptyValuestoNull(data);
    return requestedObj;
  }
	setDefaultValues() {
    for (const ele in this.formFieldConfig) {
      if (['Boolean'].includes(this.formFieldConfig[ele].fieldType)) {
        const defaultBooleanValues = this.formFieldConfig[ele].defaultVal ? this.formFieldConfig[ele].defaultVal : false;
        this.detailFormControls.controls[ele].patchValue(defaultBooleanValues, { emitEvent: true });
        this.backupData[ele] = defaultBooleanValues;
      } else if (this.formFieldConfig[ele].defaultVal && (this.formFieldConfig[ele].uiType === 'datetime' || this.formFieldConfig[ele].uiType === 'date')) {
        let defaultValue = (this.formFieldConfig[ele].defaultVal);
        if (typeof defaultValue == 'string') {
          if (defaultValue?.toLowerCase() == 'today') {
    //defaultValue = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime();
               defaultValue = new Date(Date.now()).getTime();          
} else if (defaultValue?.toLowerCase() == 'tomorrow') {
            defaultValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).getTime()
          } else if (defaultValue?.toLowerCase() == 'start_of_month') {
            defaultValue = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime()
          } else if (defaultValue?.toLowerCase() == 'end_of_month') {
            defaultValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime()
          }
        }
        const formattedDate = new Date(defaultValue)
        this.detailFormControls.controls[ele].patchValue(formattedDate, { emitEvent: true });
        this.backupData[ele] = formattedDate;
      } else if (this.formFieldConfig[ele].defaultVal && (this.formFieldConfig[ele].uiType === 'select' || this.formFieldConfig[ele].uiType === 'checkboxgroup' || this.formFieldConfig[ele].uiType === 'radio')) {
        let defaultValue: any = (this.formFieldConfig[ele].defaultVal);
        let defaultLabel: any;
        if (typeof defaultValue == 'string') {
          defaultLabel = (defaultValue?.trim()?.replace(/ /g, "_"))?.toUpperCase()
        } else if (Array.isArray(defaultValue)) {
          defaultValue?.forEach((obj: any, index: any, a: any) => {
            a[index] = (obj?.trim()?.replace(/ /g, "_"))?.toUpperCase();
          })
          defaultLabel = defaultValue
        } else {
          defaultLabel = defaultValue
        }
        if (this.formFieldConfig[ele].multiple || this.formFieldConfig[ele].uiType === 'checkboxgroup' || Array.isArray(defaultValue)) {
          this.detailFormControls.controls[ele].patchValue(defaultLabel, { emitEvent: true });
          this.backupData[ele] = Object.assign([], defaultLabel);
        } else {
          this.detailFormControls.controls[ele].patchValue(defaultLabel, { emitEvent: true });
          this.backupData[ele] = defaultLabel;
        }
      } else if (this.formFieldConfig[ele].defaultVal) {
        const defaultValue = (this.formFieldConfig[ele].defaultVal);
        this.detailFormControls.controls[ele].patchValue(defaultValue, { emitEvent: true });
        this.backupData[ele] = defaultValue;
      }
    }
  }
	checkValidations(): boolean {
    const finalArr: string[] = [];
    this.formErrors = {};
    this.inValidFields = {};
    if (!this.appUtilBaseService.validateNestedForms(this.detailFormControls, this.formErrors, finalArr, this.inValidFields,this.formFieldConfig)) {
      if (finalArr.length) {
        this.showMessage({ severity: 'error', summary: 'Error', detail: this.appUtilBaseService.createNotificationList(finalArr), sticky: true });
      }
      return false;
    }
    if(this.detailFormConfig.children) {
      let multComp = this.detailFormConfig.children.filter((ele: any) => ele.multipleValues && ele.columns);
      if(multComp.length) {
        let mulFormErrors: string[] = [];
        multComp.forEach((config: any) => {
          let colnames = config.columns.filter((col: any) => col.name !== 'jid').map((col: any) => col.name);
          let values = this.detailFormControls.value[config.field];
          values = values.filter((row: any) => {
            return Object.keys(row) && Object.keys(row).find(key => colnames.includes(key));
          });
          this.detailFormControls.get(config.field)?.patchValue(values);
          mulFormErrors = [...mulFormErrors, ...this.appUtilBaseService.validateMultipleComp(this.detailFormControls.value, config)];          
        });
        if(mulFormErrors.length) {
          this.showMessage({ severity: 'error', summary: 'Error', detail: this.appUtilBaseService.createNotificationList(mulFormErrors), sticky: true });
          return false;
        }
      }
    }
    return true;
  }
	allocateActions(label: string, result: boolean, action: string) {
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
	configureRequestData(data: any,ele: any,parentEle?: string,index?: number) {
    if (Array.isArray(ele)) {
      ele.map((ele: any) => {
       if (ele.fieldType == 'Date' && data[ele.name]) {
          const formattedDate = new Date(data[ele.name]).getTime()
          if (ele.uiType == 'date') {
            const tempDate = new Date(data[ele.name]);
            const convertedDate = tempDate.getFullYear() + '-' + this.leftPad((tempDate.getMonth() + 1), 2) + '-' + this.leftPad(tempDate.getDate(), 2);
            data[ele.name] = convertedDate;
          }
          else {
            data[ele.name] = formattedDate;
          }
        }else if (ele.fieldType === 'Boolean') {
          if (
            data[ele.name] === null ||
            data[ele.name] === undefined ||
            data[ele.name] === ''
          ) {
            data[ele.name] = false;
          }
        }
     if (ele.uiType == 'autosuggest') {
            delete data[ele.name];
            delete this.backupData[ele.name];
        }  
                 
      });
    }
    return data;
  }
	onSave(isToastNotNeeded ?: boolean,actionName?:string) {
  if (this.appUtilBaseService.isEqualIgnoreCase(this.detailFormControls.getRawValue(), this.backupData, this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(), this.backupData, this.detailPageIgnoreFields), true) && this.detailFormControls.status == 'VALID') {
    this.showMessage({ severity: 'info', summary: '', detail: this.translateService.instant('NO_CHANGES_AVAILABLE_TO_SAVE') });
    return;
  }
  if (this.checkValidations()) {
    const complexData = this.checkUnsavedComplexFields();
    if (complexData.hasUnSavedChanges) {
    
      complexData.fields.map((o: any) => $($('.'+o+'_editSave-btn')).trigger('click'));
    }
    let preFormattedData = this.formatFormDataBeforeSave();
    let data = this.normalize(preFormattedData)
    const method = this.id ? 'update' : 'create';
    data = { ...this.backupData, ...data };
    if (this.pid) {
      data.pid = this.pid;
    }
    if (this.id) {
      data.sid = this.id
    }

  const requestedObj = this.generateRequestObj(data);
      this.messageService.clear();
      const attachmentTypes = ['imageCarousel', 'attachments'];
      const attachmentFields = this.detailFormConfig?.children
        .filter((ele: any) => attachmentTypes.includes(ele.uiType))
        .map((item: any) => item.fieldName);
      const splittedData = this.appUtilBaseService.splitFileAndData(data, attachmentFields);

      if (Object.keys(splittedData.files).length > 0) {
      
      const saveSubscription = this.uploadAttachmentsandSaveData(requestedObj, splittedData,actionName).subscribe(res => {
          this.onAfterSave(res, data, method, isToastNotNeeded);
        }, err => { this.isSaveResponseReceived = true })
        this.subscriptions.push(saveSubscription);
      }
      else {
        const saveSubscription = this.applicationUserService[method](requestedObj,actionName).subscribe((res:ApplicationUserBase) => {
          this.onAfterSave(res, data, method, isToastNotNeeded);
        })
        this.subscriptions.push(saveSubscription);
      }
    }

  }
     
       onAfterSave(res: any, data: any, method: string, isToastNotNeeded?: boolean) {
    this.data = { ...data, ...res };
    this.formatRawData();
    this.isSaveResponseReceived = true;
    this.isFormValueChanged = false;
    this.id = res.sid;
    this.tabErrorCount(true);
    if (method === 'create') {
      this.router.navigate(
        [],
        {
          queryParams: { id: this.id },
          relativeTo: this.activatedRoute,
          queryParamsHandling: 'merge',
          replaceUrl: true
        }).then(() => { this.onInit() });
        this.enableChildOptions();
    }
    if (!isToastNotNeeded) {
      this.showMessage({ severity: 'success', summary: '', detail: this.translateService.instant('RECORD_SAVED_SUCCESSFULLY') });
    }
  }

uploadAttachmentsandSaveData(data: any, splittedData: any,actionName?:string): Observable<any> {
    const subject$ = new Subject();

    const completeReq = (resData: any,) => {
      resData ? subject$.next(resData) : subject$.error(resData);
      subject$.complete();
    }
    if (!this.id) {
       const saveSubscription =  this.applicationUserService.create(splittedData.data,actionName).subscribe(
        createdData => {
          const data = { ...splittedData.data, ...createdData };
          splittedData.data = data;
          this.id = data.sid;
          if (splittedData.files) {
            this.updateData(splittedData).subscribe(
              updatedData => completeReq(updatedData),
              err => completeReq(null)
            );
          }
        },
        err => completeReq(null))
        this.subscriptions.push(saveSubscription);
    } else {
      const saveSubscription =  this.updateData(splittedData,actionName).subscribe(
        updatedOrg => completeReq(updatedOrg),
        err => completeReq(null)
      );
      this.subscriptions.push(saveSubscription);
    }

    return subject$.asObservable()
  }
  
  updateData(splittedData: any,actionName?:string) {
    const subject$ = new Subject();    
      const updateSubscription = this.deleteFiles(splittedData).subscribe((responseData: any) => {
        this.saveFiles(responseData).subscribe((dataToUpdate: any) => {
          dataToUpdate.data.sid = this.id;
          this.applicationUserService.update(dataToUpdate.data,actionName).subscribe(
            res => {
              subject$.next(res);
              subject$.complete();
            },
            err => {
              subject$.error(null);
              subject$.complete();
            }
          )
        })
      });
    this.subscriptions.push(updateSubscription);
    return subject$.asObservable()
  }

saveFiles(splittedData: any) {
  const files:any={};
  const existingfiles:any={}
  Object.keys(splittedData.files).forEach(key => {
    splittedData.files[key].map((o:any)=>{
      if(!o.id){
        if(!files.hasOwnProperty(key)){
           files[key]=[];
        }
        files[key].push(o);
      }
      else{
        if(!existingfiles.hasOwnProperty(key)){
          existingfiles[key]=[];
       }
       existingfiles[key].push(o);
      }
    })
  })
      if (files && Object.values(files).filter((item:any) =>  (item||[])?.length).length) {
      return new Observable(observer => {
        this.uploaderService.saveAddedFiles(files, this.id, this.detailFormControls).subscribe((res: any) => {
          let fData: any = {};
           res.dataToResend = {...res.dataToResend,...existingfiles};
          for (const key in res.dataToResend) {
            if (res.dataToResend[key] instanceof Array) {
              const tempArr = res.dataToResend[key].flat();
              fData[key] = (tempArr.filter((n: any, i: any) => tempArr.indexOf(n) === i)).filter(Boolean);
            } else {
              fData[key] = [res.dataToResend[key]];
            }
            fData[key]= this.appUtilBaseService.removeImagePreviewProperties(fData[key]);
          }
          
          const finalData = { data: { ...splittedData.data, ...fData } };
          if (res.error) {
            let errResponse = res.error;
            const errorArr: any = [];
            Object.keys(res.error).forEach((key) => {
              if (errResponse && errResponse[key]?.error?.MESSAGE) {
                errorArr.push(errResponse[key]?.error?.MESSAGE);
              } else {
                errorArr.push("Failed to upload " + key);
              }
            })
            if(errorArr.length > 0)
            this.showMessage({ severity: 'error', summary: 'Error', detail: this.appUtilBaseService.createNotificationList(errorArr) });
          }
          observer.next(finalData);
          observer.complete();
        }, (err: any) => {
          observer.error(err);
        });
      });
    } else {
      return of(splittedData)
    }
  }
	denormalize(backupData: any) {
}
	readOnlyBasedonRoles() {
    let rulesObj: any = {
      enableAccess: false,
      disableAcces: false,
      conditionalAccess: false
    };
    ['create', 'update'].map((o: string) => {
      const accessActions = this.detailFormConfig?.actions?.[o] || {};
      for (const property in accessActions) {
        if ((this.currentUserData?.userRoles ||[]).includes(property)) {
          if (accessActions[property]?.access === 'yes') {
            rulesObj.enableAccess = true;
          }
          else if (accessActions[property]?.access === 'no') {
            rulesObj.disableAccess = true;
          }
          else {
            const conditions = accessActions[property].conditions;
            const conResult = this.appUtilBaseService.evaluvateCondition(conditions?.rules, conditions?.condition, { ...this.data, ...this.detailFormControls.getRawValue() }, this.formFieldConfig);
            rulesObj.conditionalAccess = (conResult || rulesObj.conditionalAccess) ? true : false;
          }
        }
        else {
          rulesObj.disableAccess = true;
        }
      }
    });

    if ((!rulesObj.enableAccess && !rulesObj.conditionalAccess && rulesObj.disableAccess && !environment.prototype)) {
      this.enableReadOnly = true;
    }
    else {
      this.enableReadOnly = false;
    }
  }
	configureEmptyValuestoNull(data:any){
       const value =  Object.keys(data).reduce((acc:any, key:string) => {acc[key] = data[key] === '' ||(Array.isArray(data[key]) && data[key].length == 0)? null : 
    data[key]; return acc; }, {})
    return value;
  }
	clearValidations(mandatoryFields: []) {
    mandatoryFields.forEach((controlName: string) => {
      if (!(this.validatorsRetained[controlName] && this.validatorsRetained[controlName]['requiredValidator'])) {
        this.detailFormControls.controls[controlName].removeValidators(Validators.required);
        this.detailFormControls.controls[controlName].updateValueAndValidity({emitEvent:false});
      }

    })
  }
	disableDependantFields() {
    let hasUnfilledValues:boolean = false;
    const detailFormControls = this.detailFormControls.getRawValue()
    for (const ele in this.formFieldConfig) {
      if (this.formFieldConfig[ele].uiType === 'autosuggest' && this.formFieldConfig[ele].mandatoryFilters) {
        this.formFieldConfig[ele].filterInputMapping?.map((filter: { lookupField: string,tableField:string }) => {
          const fieldName = filter.tableField.split('.')[0];
          if (this.formFieldConfig[ele].mandatoryFilters.includes(filter.lookupField) && (detailFormControls[fieldName] === null || detailFormControls[fieldName]=== undefined || detailFormControls[fieldName] === '')){
            hasUnfilledValues = true;
          }
        })
        hasUnfilledValues?this.detailFormControls.get(this.formFieldConfig[ele].fieldName)?.disable({ emitEvent: false }):
        this.detailFormControls.get(this.formFieldConfig[ele].fieldName)?.enable({ emitEvent: false });
      }
    }
  }
	reloadForm(workflowInfo: any) {
    this.data.workflowInfo ={
          [this.workflowType]:workflowInfo
        };
  
const wfData ={
actors:workflowInfo.userTypes,
step:workflowInfo.step
}
       const methodName: any = "configureFormOnWorkflow";
        let action: Exclude<keyof ApplicationUserDetailBaseComponent, ' '> = methodName;
        if (typeof this[action] === "function") {
          this[action](wfData);
          this.updateAllowedActions();
          this.formValueChanges();
        }
  }
	tabErrorCount(aftersave:boolean){ 
    const tabViews = this.tabviewValidation(this.detailFormStructureConfig ,[], 'tabView');
    const tabviewStructue = this.tabValidation(tabViews, [],'tab');
    tabviewStructue.forEach((parentele:any) => {
          parentele.tabIndex.map((ele:any,index:number)=>{
          const tabID =  ele+"_id"
          const tabLabelID =  ele+"_label_id"
           let er = (<HTMLInputElement>document.getElementById(tabID))?.querySelectorAll(".error")||[];
          if(er.length>0 && this.activeTabIndexes[parentele.tabName] !=index && !aftersave){
              document.getElementById(tabLabelID)?.classList.add("taberror");
              this.errorfields[ele] = true;
          }
          else{
            document.getElementById('tabIDS')?.classList.remove("taberror")
            this.errorfields[ele] = false;
          } 
        })
      });
  }
	onMultiDataFractionCheck(item:any,config:any){
    if (config?.uiType?.toLowerCase() == 'number' && config?.isDouble) {
      const dec = item.value.split('.')[1]
      const len = (dec && (dec.length > config.minFractionDigits) && (dec.length < config.maxFractionDigits)) ? dec.length :
        (dec && dec.length > config.maxFractionDigits) ? config.maxFractionDigits : config.minFractionDigits;
      let value = Number(item.value).toFixed(len);
      item.value = value;
      item.display = value;

    }
  }
	getData(){
  if (environment.prototype && this.id) {
         const params = {
      sid: this.id
    };
    this.applicationUserService.getProtoTypingDataById(params).subscribe((res: any) => {
      res = JSON.parse(JSON.stringify(res))
    for (let key in res) {
        if (this.formFieldConfig[key]?.fieldType =="Date") {
            res[key] = new Date(res[key]);
        }
      }
      this.data = res;
      this.backupData = res;
      this.detailFormControls.patchValue(this.backupData);
    });
  } else if (this.id) {
    const params = {
      sid: this.id
    };
    const dataSubscription = this.applicationUserService.getById (params).subscribe((res: ApplicationUserBase[]) => {
      this.data = res || {};
      this.formatRawData();
    });
    this.subscriptions.push(dataSubscription);
  }
  else {
    this.setDefaultValues();
    this.backupData = this.appUtilBaseService.deepClone(this.detailFormControls.getRawValue());
  }
}
	calculateFormula(){
	
}
	getDateTimeFields() {
    return ['createdDate','modifiedDate','syncTime'];
  }

  getDateFields() {
    return [];
  }
  
  
  getTranslatableFields() {
    return [];
  }
  
  
  getEmailFields(){
  	return ['email'];
  }
  

  /**
  * Ignore fields from displaying in the changelog details
  */
  getIgnoreFields() {
    return ['sid', 'pid'];
  }
  
  
 onChangelog() {
    const initialState: ModalOptions = {
      initialState: {
        class: 'modal-xl',
        changelogConfig: {
          dateFields: this.getDateFields(),
          dateTimeFields: this.getDateTimeFields(),
          ignoreFields: this.getIgnoreFields(),
          translatableFields:this.getTranslatableFields(),
          emailFields:this.getEmailFields(),
           config :this.formFieldConfig,
          filters: [{
            label: 'BASIC_DETAIL'
          }],
          entityId : this.data.sid,
          entityName : 'ApplicationUser',
          fieldName : null,
          fromModifiedDate : new Date().getTime(),
          useModifiedDate: true,
          translations: {}
        },
        keyboard: true
        
      }
    };
    this.bsModalRef = this.bsModalService.show(ChangeLogsComponent, Object.assign(initialState, { class: 'modal-xl modal-changelog' }));
    this.bsModalRef.content.closeBtnName = 'Close';
  }
	getUserRoles(){
      this.appBaseService.getRoles().subscribe((res:any)=>this.roles = res ||{});
   }
	checkColumnProperty(fieldName: string, table: string) {
    const columnConfig = this.formFieldConfig[table]?.columns?.find((item: any) => item.name == fieldName);
    return ((columnConfig.hidden) ? false : true);
  }
	restrictBasedonRoles(roles: any) {
    if (roles?.includes('selected')) {
       if(this.currentUserData){
        const userDataKeys = Object.keys(this.currentUserData);
        return roles?.some((item: any) => userDataKeys.includes(item.toLowerCase()));
      }
      else{
        return false;
      }
    }
    else if (roles?.includes('all'))
      return true;
    else
      return true;
  }
	formatRawData() {
    this.denormalize(this.data);
        // since this.data cannot be directly used for patch value, doing a deep copy
        // Deep copy converts date into string, so copy is performed before formatting
    let patchData = JSON.parse(JSON.stringify(this.data));
    this.selectedItems = [];
    for (const e in this.formFieldConfig) {
      const ec = this.formFieldConfig[e];
      if (ec.columns && !ec.multipleValues && this.data[ec.name]) {
        for (const e1 in this.data[ec.name]) {
           const ec1 = ec[e1];
          if(this.data[ec.name]){
          this.data[ec.name][ec1.name] = this.bindData(this.data[ec.name][ec1.name], ec1,ec.name);
          patchData[ec.name][ec1.name] = this.bindData(patchData[ec.name][ec1.name], ec1,ec.name);
          }
        }
      }
      else if (ec.columns && ec.multipleValues && this.data[ec.name]) {
        this.data[ec.name]?.map((o: any, index: number) => {
          for (const e1 in o) {
            const ec1 = ec[e1];
            if (this.data[ec.name]) {
              this.data[ec.name][index][ec1.name] = this.bindData(this.data[ec.name][index][ec1.name], ec1,ec.name,index);
              patchData[ec.name][index][ec1.name] = this.bindData(patchData[ec.name][index][ec1.name], ec1,ec.name,index);
            }
          }
        })
      }
      else {
       if(!ec.columns && this.data[ec.name]){
          this.data[ec.name] = this.bindData(this.data[ec.name], ec);
          patchData[ec.name] = this.bindData(patchData[ec.name], ec);
        }
        else if (ec.uiType == 'autosuggest') {
         let arrData: any = [];
         let bindField:any = {};
         ec.mapping.map((o: any) => {
           o.fieldType = o.type;
           const value = this.appUtilBaseService.formatRawDatatoRedableFormat({}, this.data[o.childField], o.type);
           if (o.isApplicable && !this.hiddenFields[o.childField]) {
             if (value)
               arrData.push(value);
           }
            bindField[o.childField] = value;
         })
         bindField.displayField = (arrData.length > 1) ? arrData.join("_") : arrData.join();
         
         this.data[ec.name] = bindField;
         patchData[ec.name] = bindField;
       }      
      }
    }
   
// const patchData = JSON.parse(JSON.stringify(this.data));
this.detailFormControls.patchValue(patchData,{ emitEvent: true});
this.backupData = this.appUtilBaseService.deepClone(this.detailFormControls.getRawValue());

 }
	onWizardClick(event: any) {
    this.wizardItems.forEach((item: any) => {
      delete item.styleClass;
    });
    event.item.styleClass = 'wizard-active';
    let el: any = $("#section" + event.item.id);
    if (el?.length) {

      $('.main-content').animate({
        scrollTop: el.offset().top
      }, 100);
    }
  }

    onInit() {
		
		this.waitForResponse();
this.initWorkflow();
		
this.getId();   
this.initForm();
this.calculateFormula();
this.initFormValidations();
this.activeTabIndexes = this.appUtilBaseService.generateDynamicTabViewProps(this.detailFormStructureConfig);
this.showWorkflowSimulator = Boolean(this.isPrototype && this.workFlowEnabled);
this.getUserRoles();
this.bindLookupFields();
this.addValidatorsForMinMaxDateValidation();
this.addValidatorsForMultiValues();
this.readOnlyBasedonRoles();
    }
	
     onDestroy() {
		
    }
     onAfterViewInit() {
		
		 this.scrolltoTop();
    }

}
