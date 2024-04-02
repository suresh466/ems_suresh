import React from "react";

import { EmployeeCreate } from "./EmployeeCreate.jsx";
import { EmployeeSearch } from "./EmployeeSearch.jsx";
import { EmployeeTable } from "./EmployeeTable.jsx";
import graphQLFetch from "./graphQLFetch.js";

export class EmployeeDirectory extends React.Component {
	constructor() {
		super();
		this.state = { employees: [] };
		this.createEmployee = this.createEmployee.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	async loadData() {
		const query = `query {
            employeeList {
                id firstName lastName age dateOfJoining title department employeeType currentStatus
            }
        }`;

		const data = await graphQLFetch(query);
		if (data) this.setState({ employees: data.employeeList });
	}

	async createEmployee(employee) {
		const query = `mutation employeeCreate($employee: EmployeeInputs!) {
            employeeCreate(employee: $employee) {
                id
            }
        }`;

		const data = await graphQLFetch(query, { employee });
		if (data) this.loadData();
	}

	render() {
		return (
			<main id="employee-directory">
				<div>
					<h1>Employee Management System</h1>
				</div>
				<EmployeeSearch />
				<EmployeeTable employees={this.state.employees} />
				<EmployeeCreate createEmployee={this.createEmployee} />
			</main>
		);
	}
}
