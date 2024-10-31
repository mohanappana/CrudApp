import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {
    // Method to save an employee
    saveEmployee(employee) {
        // Sending a POST request with employee data
        return axios.post(EMPLOYEE_API_BASE_URL, employee)
            .then(response => {
                // Handle success response
                return response.data; // You can return the response data for further handling
            })
            .catch(error => {
                // Handle errors
                console.error("There was an error saving the employee!", error);
            });
    }

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }
    
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL+ "/" +id);
    }

    getEmployeeById(id){
        return axios.get(EMPLOYEE_API_BASE_URL+"/"+id);
    
    }

    updateEmployee(employee,id){
        return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, employee);
    }
}

export default new EmployeeService();
