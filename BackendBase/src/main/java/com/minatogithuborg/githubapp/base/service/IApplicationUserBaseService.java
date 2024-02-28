package com.minatogithuborg.githubapp.base.service;

import com.vs.rappit.base.authentication.IAppUserPrivilegeBL;
import com.minatogithuborg.githubapp.base.model.ApplicationUserBase;
import com.vs.rappit.base.mail.model.EmailAddress;
import java.util.List;
import com.vs.rappit.base.model.wrapper.UserPrivilegePerimeter;
import java.util.Map;
import java.util.List;

public interface IApplicationUserBaseService<T extends ApplicationUserBase> extends IAppUserPrivilegeBL<T> {
	public List<T> siduniqueAutoSuggestService(String searchText, String sortColumn, String sortOrder, int page, int pageSize);


public List<T> emailprimaryAutoSuggestService(String searchText, String sortColumn, String sortOrder, int page, int pageSize);


	public List<EmailAddress> getUsersByRole(UserPrivilegePerimeter rolePerimeterInfo, Integer page, Integer pageSize);

	public Map<String,String> getAllRolesMap();
}