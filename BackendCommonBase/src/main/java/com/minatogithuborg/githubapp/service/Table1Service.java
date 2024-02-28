package com.minatogithuborg.githubapp.service;

import com.vs.rappit.base.acl.IPerimeterManager;
import com.minatogithuborg.githubapp.base.service.Table1BaseService;
import com.minatogithuborg.githubapp.model.Table1;
import com.minatogithuborg.githubapp.service.Table1PerimeterImpl;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;


@Service("Table1")
public class Table1Service extends Table1BaseService<Table1> implements ITable1Service<Table1>{

		@Autowired
		private  Table1PerimeterImpl  table1PerimeterImpl;

		public Table1Service(ChangelogService changelogService) {
		super(Table1.class);	
		setChangelogService(changelogService); 
		
	}
	
}