const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
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
    <div>
      <h2>Search:</h2>
      <input type="text" name="search" id="search" placeholder="Search..." />
      <input type="button" value="Search" />
    </div>
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
            <td>{employee.currentStatus? '1 (Active)' : '0 (Inactive)'}</td>
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
        const employee = {
            firstName: form.firstName.value, lastName: form.lastName.value,
            age: parseInt(form.age.value), dateOfJoining: form.dateOfJoining.value,
            title: form.title.value, department: form.department.value,
            employeeType: form.employeeType.value,
        }
        
        this.props.createEmployee(employee);
        form.firstName.value = ""; form.lastName.value = ""; form.age.value = "";
        form.dateOfJoining.value = ""; form.title.value = ""; form.department.value = "";
        form.employeeType.value = "";
    }
    
    render() {
        return (
            <form name="employeeCreate" onSubmit={this.handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" />
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" />
                <label htmlFor="age">Age:</label>
                <input type="text" id="age" name="age" />
                <label htmlFor="dateOfJoining">Date Of Joining:</label>
                <input type="date" id="dateOfJoining" name="dateOfJoining" />
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" />
                <label htmlFor="department">Department:</label>
                <input type="text" id="department" name="department" />
                <label htmlFor="employeeType">Employee Type:</label>
                <input type="text" id="employeeType" name="employeeType" />
                <input type="submit" value="Add" />
            </form>
        );
    }
}

function EmployeeTable(props) {
    const employeeRows = props.employees.map(employee => <EmployeeRow key={employee.id} employee={employee} />);

    return (
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
                { employeeRows }
            </tbody>
        </table>
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
        <React.Fragment>
      <div>
        <h1>Employee Directory</h1>
      </div>
        <EmployeeSearch />
        <hr />
        <EmployeeTable employees = {this.state.employees} />
        <EmployeeCreate createEmployee = {this.createEmployee} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<EmployeeDirectory />, document.getElementById('content'));