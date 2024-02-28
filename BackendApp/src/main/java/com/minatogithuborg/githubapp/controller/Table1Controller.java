package com.minatogithuborg.githubapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import com.vs.rappit.base.logger.Logger;
import com.vs.rappit.base.logger.LoggerFactory;
import org.springframework.http.ResponseEntity;
import com.vs.rappit.base.factory.InstanceFactory;
import com.minatogithuborg.githubapp.base.controller.Table1BaseController;
import com.minatogithuborg.githubapp.service.ITable1Service;
import com.minatogithuborg.githubapp.service.Table1Service;
import com.minatogithuborg.githubapp.model.Table1;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "rest/table1s/", produces = "application/json")
public class Table1Controller extends Table1BaseController<ITable1Service<Table1>, Table1> {
	private static final Logger LOGGER = LoggerFactory.getLogger(Table1Controller.class.getName());
	public Table1Controller(Table1Service table1Service) {
		super(table1Service);
	}
}
