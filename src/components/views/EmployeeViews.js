import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeForm } from "../employees/EmployeeForm"
import { EmployeeList } from "../employees/EmployeeList"
import { LocationList } from "../locations/LocationList"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/ProductList"


export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Kandy so good, it makes you want to run around waving your arms!</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductList /> } />
                <Route path="product/create" element={ <ProductForm /> } />
                <Route path="employee/create" element={ <EmployeeForm /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="customers" element={ <CustomerList /> } />
                <Route path="customers/:customerId" element={ <CustomerDetails /> } />
            </Route>
        </Routes>
    )
}