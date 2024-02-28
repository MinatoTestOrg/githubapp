package com.minatogithuborg.githubapp.listener;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.vs.rappit.sql.registry.IJPAEntityCreator;
import com.vs.rappit.base.attachment.logic.EvaAttachment;
import com.vs.rappit.base.tasks.Task;
import com.vs.rappit.base.tasks.TaskHandler;
import com.vs.rappit.base.tasks.TaskStatus;
import com.vs.rappit.base.tasks.model.TaskProgress;
import com.vs.rappit.base.model.Changelog;
import com.vs.rappit.base.workflow.history.WorkflowHistory;
import com.vs.rappit.dataimport.model.RappitImport;
import com.vs.rappit.dataimport.model.RappitImportActivity;
import com.vs.rappit.dataimport.model.RappitImportError;
import com.vs.rappit.dataimport.model.RappitImportTemplates;
import com.minatogithuborg.githubapp.model.Table1;
import com.minatogithuborg.githubapp.model.ApplicationUser;

@Component("JpaEntityCreator")
public class GithubappJPAEntityManager implements IJPAEntityCreator {

	@Override
	public List<String> getDbEntities() {
	    Class[] dbEntityClasses = new Class[] { Changelog.class, WorkflowHistory.class, EvaAttachment.class ,Table1.class, ApplicationUser.class,  Task.class, TaskProgress.class, TaskHandler.class, TaskStatus.class , RappitImportTemplates.class, RappitImport.class, RappitImportError.class, RappitImportActivity.class };
		return Arrays.asList(dbEntityClasses).stream().map(Class::getName).collect(Collectors.toList());
	}
}