import { Table1Base} from '@baseapp/table-1/table-1/table-1.base.model';

export class Table1ApiConstants {
    public static readonly getById: any = {
        url: '/rest/table1s/{sid}',
        method: 'GET',
        showloading: true
    };
    public static readonly delete: any = {
        url: '/rest/table1s/{ids}',
        method: 'DELETE',
        showloading: true
    };
    public static readonly create: any = {
        url: '/rest/table1s/',
        method: 'POST',
        showloading: true
    };
    public static readonly getDatatableData: any = {
        url: '/rest/table1s/datatable',
        method: 'POST',
        showloading: true
    };
    public static readonly autoSuggestService: any = {
        url: '/rest/table1s/autosuggest',
        method: 'GET',
        showloading: true
    };
    public static readonly update: any = {
        url: '/rest/table1s/',
        method: 'PUT',
        showloading: true
    };
    public static readonly in1AutoSuggestService: any = {
        url: '/rest/table1s/autosuggest/in1',
        method: 'GET',
        showloading: true
    };
    public static readonly siduniqueAutoSuggestService: any = {
        url: '/rest/table1s/autosuggest/sidunique',
        method: 'GET',
        showloading: true
    };
}