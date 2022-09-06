import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "./Employee";
import "./Employees.css";
export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const localKandyUser = localStorage.getItem("kandy_user");
  const kandyUserObject = JSON.parse(localKandyUser);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/users?isStaff=true`)
      .then((response) => response.json())
      .then((employeeArray) => {
        setEmployees(employeeArray);
      });
  }, []);

  return (
    <>
      {kandyUserObject.staff ? (
        <>
          <button onClick={() => navigate("/employee/create")}>
            Create Employee
          </button>
        </>
      ) : (
        ""
      )}

      <h2>List of Employees</h2>
      <article className="employees">
        {employees.map((employee) => (
          <Employee
            key={`employee--${employee.id}`}
            id={employee.id}
            fullName={employee.fullName}
            email={employee.email}
          />
        ))}
      </article>
    </>
  );
};
