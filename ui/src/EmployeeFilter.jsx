import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeFilter() {
	return (
		<div>
			<Link to="/employeedirectory">All Employees</Link>
			{" | "}
			<Link to="/employeedirectory?employeeType=FullTime">
				FullTime Employees
			</Link>
			{" | "}
			<Link to="/employeedirectory?employeeType=PartTime">
				PartTime Employees
			</Link>
		</div>
	);
}
