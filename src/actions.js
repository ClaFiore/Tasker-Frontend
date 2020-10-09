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


function fetchedProjects(teamprojects){
    return {
        type: 'all_projects', payload: teamprojects}
}

function fetchingProjects(teamId){
    let configObj = {method: 'GET', 
    headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
    }
    return (dispatch) => {
        fetch(URL + 'projects', configObj)
        .then(res => res.json())
        .then(allProjects => {
            let teamprojects = allProjects.filter(project => project.team_id === teamId)
            dispatch(fetchedProjects(teamprojects))
        })
        
    }
}



export {fetchingEmployee, fetchedCurrent_Employee, fetchingProjects, fetchedProjects}
