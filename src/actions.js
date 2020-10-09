const URL = 'http://localhost:3000/api/v1/'

function fetchedCurrent_Employee(current_employee) {
        return {type: "add_current_user", payload: current_employee}
      }

function fetchingEmployee(){
    let configObj = {method: 'GET', 
    headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
    }
    return (dispatch) => {
        fetch(URL + 'employees/employee', configObj)
        .then(res => res.json())
        .then(current_employee => {
            dispatch(fetchedCurrent_Employee(current_employee))
        })
        
    }
}

export {fetchingEmployee, fetchedCurrent_Employee}
