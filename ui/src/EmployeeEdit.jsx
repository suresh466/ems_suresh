import React from "react";
import { useParams } from "react-router-dom";

const EmployeeEdit = () => {
	const { id } = useParams();

	return (
		<div>
			<h1>Employee Edit {id}</h1>
		</div>
	);
};

export default EmployeeEdit;
