const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
}

async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch(window.ENV.UI_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);

        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code == 'BAD_USER_INPUT') {
                const details = error.extensions.errors.join('\n ');
                alert(`${error.message}:\n ${details}`);
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
    }
}

function EmployeeSearch() {
    return (
        <section id="employee-search" className="employee-section">
            <h2>Search:</h2>
            <div>
                <input type="text" name="search" id="search" placeholder="Search..." />
                <input type="submit" value="Add" />
            </div>
        </section>
    );
}

function EmployeeRow(props) {
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
            <td>{employee.currentStatus ? '1' : '0'}</td>
        </tr>
    );
}

class EmployeeCreate extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.employeeCreate;
        // check if age is a number
        if (isNaN(form.age.value)) {
            alert('Age must be a number');
            form.age.value = '';
            return;
        }
        const employee = {
            firstName: form.firstName.value.trim(), lastName: form.lastName.value.trim(),
            age: parseInt(form.age.value), dateOfJoining: form.dateOfJoining.value,
            title: form.title.value, department: form.department.value,
            employeeType: form.employeeType.value,
        }

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
                        <input type="date" id="dateOfJoining" name="dateOfJoining" required />
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

function EmployeeTable(props) {
    const employeeRows = props.employees.map(employee => <EmployeeRow key={employee.id} employee={employee} />);

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
                <tbody>
                    {employeeRows}
                </tbody>
            </table>
        </section>
    );
}

class EmployeeDirectory extends React.Component {
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

ReactDOM.render(<EmployeeDirectory />, document.getElementById('content'));
