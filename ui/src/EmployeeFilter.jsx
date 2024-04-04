import React from "react";
import { useNavigate } from "react-router-dom";

class EmployeeFilter extends React.Component {
	constructor() {
		super();
		this.onChangeEmployeeType = this.onChangeEmployeeType.bind(this);
	}

	onChangeEmployeeType(e) {
		const employeeType = e.target.value;
		const { navigate } = this.props;
		const search = employeeType ? `?employeeType=${employeeType}` : "";
		navigate(`/employeedirectory${search}`);
	}

	render() {
		return (
			<div>
				Employee Type:{" "}
				<select onChange={this.onChangeEmployeeType}>
					<option value="">(All)</option>
					<option value="FullTime">FullTime</option>
					<option value="PartTime">PartTime</option>
				</select>
			</div>
		);
	}
}

function EmployeeFilterWithNavigate() {
	const navigate = useNavigate();
	return <EmployeeFilter navigate={navigate} />;
}

export default EmployeeFilterWithNavigate;
