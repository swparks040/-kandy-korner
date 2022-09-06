import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EmployeeForm = () => {
  // const localHoneyUser = localStorage.getItem("honey_user")
  // const honeyUserObject = JSON.parse(localHoneyUser)
  /*
    TODO: Add the correct default properties to the
    initial state object
    */

  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  const [newUser, updateNewUser] = useState({
    fullName: "",
    email: "",
    isStaff: true,
  });

  const [newEmployee, updateNewEmployee] = useState({
    fullName: "",
    locationId: 0,
    role: "",
    payRate: "",
    startDate: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8088/locations`)
      .then((response) => response.json())
      .then((locationsArray) => {
        setLocations(locationsArray);
      });
  }, []);
  const addEmployee = (event) => {
    event.preventDefault();
    // New object to send to users API
    const userToSentToUsersAPI = {
      fullName: newUser.fullName,
      email: newUser.email,
      isStaff: true,
    };
    // New object to send to employees API
    const employeeToSendToEmployeesAPI = {
      fullName: newEmployee.fullName,
      locationId: newEmployee.locationId,
      role: newEmployee.role,
      payRate: newEmployee.payRate,
      startDate: newEmployee.startDate,
    };

    fetch(`http://localhost:8088/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToSentToUsersAPI),
    })
      .then((response) => response.json())
      .then((createdUser) => {
        employeeToSendToEmployeesAPI.userId = createdUser.id;
        fetch(`http://localhost:8088/employees`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeToSendToEmployeesAPI),
        })
          .then((response) => response.json())
          .then(() => {
            navigate("/employees");
          });
      });
    }
    return (
      <form className="employeeForm">
        <h2 className="employeeForm__title">New Employee Form</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Employee Name:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="Enter New Employee Name Here"
              value={newUser.fullName}
              onChange={(evt) => {
                const copy = { ...newUser };
                copy.fullName = evt.target.value;
                updateNewUser(copy);
                updateNewEmployee(copy);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Employee Email:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="Enter New Employee Email Address Here"
              value={newUser.email}
              onChange={(evt) => {
                const copy = { ...newUser };
                copy.email = evt.target.value;
                updateNewUser(copy);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="locationId">Location:</label>
            <select
              className="form-control"
              onChange={(evt) => {
                const copy = { ...newEmployee };
                copy.locationId = evt.target.value;
                updateNewEmployee(copy);
              }}
            >
              <option value="">Select Location</option>
              {locations.map((location) => {
                return <option value={location.id}>{location.address}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="role">Employee Position:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="Enter New Employee Role Here"
              value={newEmployee.role}
              onChange={(evt) => {
                const copy = { ...newEmployee };
                copy.role = evt.target.value;
                updateNewEmployee(copy);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pay">Employee Hourly Pay:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="Enter New Employee Pay Here"
              value={newEmployee.payRate}
              onChange={(evt) => {
                const copy = { ...newEmployee };
                copy.payRate = evt.target.value;
                updateNewEmployee(copy);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Employee Start Date:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="Enter New Employee Start Date Here (MM/DD/YYYY)"
              value={newEmployee.startDate}
              onChange={(evt) => {
                const copy = { ...newEmployee };
                copy.startDate = evt.target.value;
                updateNewEmployee(copy);
              }}
            />
          </div>
        </fieldset>
        <button
          onClick={(clickEvent) => addEmployee(clickEvent)}
          className="btn btn-primary"
        >
          Submit New Employee
        </button>
      </form>
    );
  
};
