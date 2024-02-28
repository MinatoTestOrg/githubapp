package com.minatogithuborg.githubapp.base.service;

import com.vs.rappit.base.logic.ICRUDOperation;
import com.minatogithuborg.githubapp.base.model.Table1Base;
import java.util.List;

public interface ITable1BaseService<T extends Table1Base> extends ICRUDOperation<T>{
	public List<T> in1AutoSuggestService(String searchText, String sortColumn, String sortOrder, int page, int pageSize);


public List<T> siduniqueAutoSuggestService(String searchText, String sortColumn, String sortOrder, int page, int pageSize);

	
}