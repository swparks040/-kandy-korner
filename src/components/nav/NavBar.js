import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.staff) {
        //return employee navigation bar
        return <EmployeeNav />
    }
    else {
        //return customer navigation bar        
        return <CustomerNav />
    } 
}
