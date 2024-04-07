import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import URLSearchParams from "url-search-params";

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
		const {
			location: { search },
		} = this.props;
		const params = new URLSearchParams(search);
		return (
			<div>
				Employee Type:{" "}
				<select
					value={params.get("employeeType") || ""}
					onChange={this.onChangeEmployeeType}
				>
					<option value="">(All)</option>
					<option value="FullTime">FullTime</option>
					<option value="PartTime">PartTime</option>
					<option value="Contract">Contract</option>
					<option value="Seasonal">Seasonal</option>
				</select>
			</div>
		);
	}
}

function EmployeeFilterWithNavigateAndLocation() {
	const navigate = useNavigate();
	const location = useLocation();
	return <EmployeeFilter navigate={navigate} location={location} />;
}

export default EmployeeFilterWithNavigateAndLocation;
