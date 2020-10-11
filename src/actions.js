import ProjectDetails from "./components/ProjectDetails"

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
        type: 'all_projects', payload: teamprojects
    }
}

function filteredProjects(teamprojects){
    return{
        type: 'filtered_projects', payload: teamprojects
    }
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
            dispatch(filteredProjects(teamprojects))
            dispatch(fetchedProjects(teamprojects))
        })
        
    }
}

function addedProject(newProject){
    return {
        type: 'add_project', payload: newProject
    }
}

function addingNewProject(configObj){
    return (dispatch) => {
        fetch(URL + 'projects', configObj)
        .then(res => res.json())
        .then(newProject => {
            dispatch(addedProject(newProject))
        })
        
    }
}



function updatedUser(updatedUserInfo){
    return {
        type: 'add_current_user', payload: updatedUserInfo}
}

function updatingUser(employee, id){
    let configObj = {method: 'PATCH', 
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify(employee)
    }
    return (dispatch) => {
        fetch(URL + 'employees/' + id, configObj)
        .then(res => res.json())
        .then(updatedUserInfo => {
            if (updatedUserInfo.error){
                alert('oops something went wrong')
            }else{
            alert('Profile updated!')
            dispatch(updatedUser(updatedUserInfo))}
        })
    }
}



export {addingNewProject, updatingUser, fetchingEmployee, fetchingProjects}
