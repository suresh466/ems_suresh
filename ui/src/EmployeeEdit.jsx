import React from "react";
import { useParams } from "react-router-dom";

import graphQLFetch from "./graphQLFetch.js";

class EmployeeEdit extends React.Component {
	constructor() {
		super();
		this.state = {
			employee: {},
			changes: {},
		};
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps) {
		const { id: prevId } = prevProps;
		const { id } = this.props;
		if (id !== prevId) {
			this.loadData();
		}
	}

	onChange(event) {
		const { name, value } = event.target;
		const updatedValue = name === "currentStatus" ? value === "true" : value;
		this.setState((prevState) => ({
			employee: {
				...prevState.employee,
				[name]: updatedValue,
			},
			changes: {
				...prevState.changes,
				[name]: updatedValue,
			},
		}));
	}

	async handleSubmit(e) {
		e.preventDefault();
		const { employee, changes } = this.state;
		const query = `
			mutation employeeUpdate($id: Int!, $changes: EmployeeUpdateInputs!) {
				employeeUpdate(id: $id, changes: $changes) {
					id
					firstName
					lastName
					age
					dateOfJoining
					title
					department
					employeeType
					currentStatus
				}
			}`;
		const data = await graphQLFetch(query, { id: employee.id, changes });
		if (data) {
			this.setState((prevState) => ({
				employee: {
					...prevState.employee,
					...data.employeeUpdate,
				},
				changes: {},
			}));
			alert("employee record updated successfully");
		}
	}

	async loadData() {
		const query = `
			query employeeDetail($id: Int!){
				employeeDetail(id: $id){
					id
					firstName
					lastName
					age
					dateOfJoining
					title
					department
					employeeType
					currentStatus
				}
			}`;

		const { id } = this.props;
		const data = await graphQLFetch(query, { id });
		if (data) {
			data.employeeDetail.currentStatus =
				data.employeeDetail.currentStatus.toString();
			this.setState({ employee: data.employeeDetail });
		}
	}

	render() {
		const { employee } = this.state;
		return (
			<section id="employee-edit" className="employee-section">
				<h2>Edit Employee:</h2>
				<form name="employeeEdit" onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="firstName">First Name:</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							defaultValue={employee.firstName}
							disabled
						/>
					</div>
					<div>
						<label htmlFor="lastName">Last Name:</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							defaultValue={employee.lastName}
							disabled
						/>
					</div>
					<div>
						<label htmlFor="age">Age:</label>
						<input
							type="text"
							id="age"
							name="age"
							required
							defaultValue={employee.age}
							disabled
						/>
					</div>
					<div>
						<label htmlFor="dateOfJoining">Date Of Joining:</label>
						<input
							type="date"
							id="dateOfJoining"
							name="dateOfJoining"
							required
							defaultValue={
								employee.dateOfJoining
									? new Date(employee.dateOfJoining).toISOString().split("T")[0]
									: ""
							}
							disabled
						/>
					</div>
					<div>
						<label htmlFor="title">Title:</label>
						<select
							name="title"
							id="title"
							value={employee.title}
							onChange={this.onChange}
						>
							<option value="Employee">Employee</option>
							<option value="Manager">Manager</option>
							<option value="Director">Director</option>
							<option value="VP">VP</option>
						</select>
					</div>
					<div>
						<label htmlFor="department">Department:</label>
						<select
							name="department"
							id="department"
							value={employee.department}
							onChange={this.onChange}
						>
							<option value="IT">IT</option>
							<option value="HR">HR</option>
							<option value="Marketing">Marketing</option>
							<option value="Engineering">Engineering</option>
						</select>
					</div>
					<div>
						<label htmlFor="employeeType">employeeType:</label>
						<select
							name="employeeType"
							id="employeeType"
							defaultValue={employee.employeeType}
							disabled
						>
							<option value="FullTime">FullTime</option>
							<option value="PartTime">PartTime</option>
							<option value="Contract">Contract</option>
							<option value="Seasonal">Seasonal</option>
						</select>
					</div>
					<div>
						<label htmlFor="currentStatus">Current Status:</label>
						<select
							name="currentStatus"
							id="currentStatus"
							value={employee.currentStatus}
							onChange={this.onChange}
						>
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</select>
					</div>
					<input type="submit" value="Update" />
				</form>
			</section>
		);
	}
}

export default function EmployeeEditWithId() {
	const { id } = useParams();
	return <EmployeeEdit id={Number.parseInt(id)} />;
}
