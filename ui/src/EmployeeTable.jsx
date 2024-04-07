import React from "react";
import { Link } from "react-router-dom";

function EmployeeRow({ employee, deleteEmployee }) {
	return (
		<tr>
			<td>{employee.firstName}</td>
			<td>{employee.lastName}</td>
			<td>{employee.age}</td>
			<td>{employee.dateOfJoining.toDateString()}</td>
			<td>{employee.title}</td>
			<td>{employee.department}</td>
			<td>{employee.employeeType}</td>
			<td>{employee.currentStatus ? "1" : "0"}</td>
			<td>
				<Link to={`/view/${employee.id}`}>View</Link>
				{" | "}
				<Link to={`/edit/${employee.id}`}>Edit</Link>
				{" | "}
				<button
					type="button"
					onClick={() => {
						deleteEmployee(employee.id);
					}}
				>
					Delete
				</button>
			</td>
		</tr>
	);
}

export default function EmployeeTable({ employees, deleteEmployee }) {
	const employeeRows = employees.map((employee) => (
		<EmployeeRow
			key={employee.id}
			employee={employee}
			deleteEmployee={deleteEmployee}
		/>
	));

	return (
		<section id="employee-table" className="employee-section">
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Age</th>
						<th>Date Of Joining</th>
						<th>Title</th>
						<th>Department</th>
						<th>Employee Type</th>
						<th>Current Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{employeeRows}</tbody>
			</table>
		</section>
	);
}
