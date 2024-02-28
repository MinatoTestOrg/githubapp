package com.minatogithuborg.githubapp.base.model;
import com.vs.rappit.base.model.BaseJPAModel;
import com.vs.rappit.base.annotations.Table;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Id;
import com.vs.rappit.base.annotations.Searchable;
import com.vs.rappit.base.annotations.NotBlank;
import com.vs.rappit.base.util.ValidationErrorConstants;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.IdClass;
import com.minatogithuborg.githubapp.base.model.Table1PK;


@Table(name="Table1", keys={"sid"})
@MappedSuperclass
@jakarta.persistence.Table(name = "Table1",
				uniqueConstraints = {
			@UniqueConstraint(name = "SIDUnique", columnNames = {"sid"} )})
@IdClass(Table1PK.class)
public class Table1Base extends BaseJPAModel {

	@Id
	@NotBlank(message = ValidationErrorConstants.BLANK_VALUE)
	@Searchable(index = true)
	private String f1;
	@Id
	@NotBlank(message = ValidationErrorConstants.BLANK_VALUE)
	@Searchable(index = true)
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