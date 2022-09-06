import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Customer } from "./Customer";
import "./Customers.css";
export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
//   const localKandyUser = localStorage.getItem("kandy_user");
//   const kandyUserObject = JSON.parse(localKandyUser);
//   const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/users?isStaff=false`)
      .then((response) => response.json())
      .then((customerArray) => {
        setCustomers(customerArray);
      });
  }, []);

  return (
    <>
      <h2>List of Customers</h2>
      <article className="customers">
        {customers.map((customer) => (
          <Customer
            key={`customer--${customer.id}`}
            id={customer.id}
            fullName={customer.fullName}
            email={customer.email}
          />
        ))}
      </article>
    </>
  );
};
