import React from "react";

export default function EmployeeFilter() {
	return (
		<div>
			<a href="/#/employeedirectory">All Employees</a>
			{" | "}
			<a href="/#/employeedirectory?employeeType=FullTime">
				FullTime Employees
			</a>
			{" | "}
			<a href="/#/employeedirectory?employeeType=PartTime">
				PartTime Employees
			</a>
		</div>
	);
}
