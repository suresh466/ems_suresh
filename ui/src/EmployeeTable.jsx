import React from "react";

export function EmployeeRow(props) {
	const employee = props.employee;

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
		</tr>
	);
}

export function EmployeeTable(props) {
	const employeeRows = props.employees.map((employee) => (
		<EmployeeRow key={employee.id} employee={employee} />
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
					</tr>
				</thead>
				<tbody>{employeeRows}</tbody>
			</table>
		</section>
	);
}
