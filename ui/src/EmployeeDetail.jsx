import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import graphQLFetch from "./graphQLFetch.js";

function EmployeeDetail() {
	// get the id from the URL
	const { id } = useParams();
	// usestate returns takes initial state and returns an array
	// with initialstate and a function to update the state
	const [employee, setEmployee] = useState(null);

	useEffect(() => {
		// define the query
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
        }
    `;

		// define the function to fetch data
		const fetchData = async () => {
			const data = await graphQLFetch(query, { id: Number.parseInt(id) });
			if (data) setEmployee(data.employeeDetail);
		};

		// call the function
		fetchData();
	}, [id]); // dependency array, tells when to call the effect

	if (!employee) return null;

	return (
		<div className="employee-detail">
			<h1>Employee Detail {employee.id}</h1>
			<p>
				{employee.firstName} {employee.lastName} ({employee.employeeType})
			</p>
			<p>Age: {employee.age}</p>
			<p>Title: {employee.title}</p>
			<p>Department: {employee.department}</p>
			<p>Date of Joining: {employee.dateOfJoining.toDateString()}</p>
			<p>Current Status: {employee.currentStatus ? "Active" : "Inactive"}</p>
		</div>
	);
}

export default EmployeeDetail;
