export class EmployeeCreate extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const form = document.forms.employeeCreate;
		// check if age is a number
		if (isNaN(form.age.value)) {
			alert("Age must be a number");
			form.age.value = "";
			return;
		}
		const employee = {
			firstName: form.firstName.value.trim(),
			lastName: form.lastName.value.trim(),
			age: parseInt(form.age.value),
			dateOfJoining: form.dateOfJoining.value,
			title: form.title.value,
			department: form.department.value,
			employeeType: form.employeeType.value,
		};

		this.props.createEmployee(employee);
		form.reset();
	}

	render() {
		return (
			<section id="employee-create" className="employee-section">
				<h2>Create Employee:</h2>
				<form name="employeeCreate" onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="firstName">First Name:</label>
						<input type="text" id="firstName" name="firstName" />
					</div>
					<div>
						<label htmlFor="lastName">Last Name:</label>
						<input type="text" id="lastName" name="lastName" />
					</div>
					<div>
						<label htmlFor="age">Age:</label>
						<input type="text" id="age" name="age" required />
					</div>
					<div>
						<label htmlFor="dateOfJoining">Date Of Joining:</label>
						<input
							type="date"
							id="dateOfJoining"
							name="dateOfJoining"
							required
						/>
					</div>
					<div>
						<label htmlFor="title">Title:</label>
						<select name="title" id="title">
							<option value="Employee">Employee</option>
							<option value="Manager">Manager</option>
							<option value="Director">Director</option>
							<option value="VP">VP</option>
						</select>
					</div>
					<div>
						<label htmlFor="department">Department:</label>
						<select name="department" id="department">
							<option value="IT">IT</option>
							<option value="HR">HR</option>
							<option value="Marketing">Marketing</option>
							<option value="Engineering">Engineering</option>
						</select>
					</div>
					<div>
						<label htmlFor="employeeType">employeeType:</label>
						<select name="employeeType" id="employeeType">
							<option value="FullTime">FullTime</option>
							<option value="PartTime">PartTime</option>
							<option value="Contract">Contract</option>
							<option value="Seasonal">Seasonal</option>
						</select>
					</div>
					<input type="submit" value="Add" />
				</form>
			</section>
		);
	}
}
