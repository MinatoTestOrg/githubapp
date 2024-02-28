package com.minatogithuborg.githubapp.base.model;
import java.io.Serializable;
import jakarta.persistence.Id;
import com.vs.rappit.base.annotations.Searchable;
import com.vs.rappit.base.annotations.NotBlank;
import com.vs.rappit.base.util.ValidationErrorConstants;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.IdClass;
import com.minatogithuborg.githubapp.base.model.Table1PK;

public class Table1PK implements Serializable {

	private String f1;
	private String f2;

	public void setF1(String f1) {
		this.f1 = f1;
	}

	public String getF1() {
		return f1;
	}

	public void setF2(String f2) {
		this.f2 = f2;
	}

	public String getF2() {
		return f2;
	}



}
