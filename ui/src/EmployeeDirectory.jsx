import React from "react";
import { useLocation } from "react-router-dom";
import URLSearchParams from "url-search-params";

import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeFilter from "./EmployeeFilter.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import graphQLFetch from "./graphQLFetch.js";

class EmployeeDirectory extends React.Component {
	constructor() {
		super();
		this.state = { employees: [] };
		this.createEmployee = this.createEmployee.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps) {
		const {
			location: { search: prevSearch },
		} = prevProps;
		const {
			location: { search },
		} = this.props;
		if (prevSearch !== search) {
			this.loadData();
		}
	}

	async loadData() {
		const {
			location: { search },
		} = this.props;
		const params = new URLSearchParams(search);
		const vars = {};
		if (params.get("employeeType"))
			vars.employeeType = params.get("employeeType");

		const query = `query issueList($employeeType: EmployeeTypeType){
            employeeList(employeeType: $employeeType){
                id firstName lastName age dateOfJoining title department employeeType currentStatus
            }
        }`;

		const data = await graphQLFetch(query, vars);
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
				<EmployeeFilter />
				<EmployeeTable employees={this.state.employees} />
				<EmployeeCreate createEmployee={this.createEmployee} />
			</main>
		);
	}
}

// creating wrapper component just to use useLocation hook
// because in react-dom-router 5.1 and up doesn't supply location prop
function EmployeeDirectoryWithLocation() {
	const location = useLocation();
	return <EmployeeDirectory location={location} />;
}

export default EmployeeDirectoryWithLocation;
