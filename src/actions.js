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

function updatedProject(editedProject){
    return{
        type: 'update_project', payload: editedProject
    }
}

function updatingProject(configObj, projectId){
    return (dispatch) => {
        fetch(URL + 'projects/' + projectId, configObj)
        .then(res => res.json())
        .then(editedProject => {
            dispatch(updatedProject(editedProject))
        })
    }
}

function deletedProject(projectId){
    return{
        type: 'deleted_project', payload: projectId
    }
}

function deletingProject(projectId){
    return (dispatch) => {
        fetch (URL + 'projects/' + projectId, {method: 'DELETE', headers: {Authorization: `Bearer ${localStorage.token}`}})
        .then(() => {
            dispatch(deletedProject(projectId))
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
            dispatch(updatedUser(updatedUserInfo))}
        })
    }
}

function addedTask(newTask){
    return {
        type: 'add_task', payload: newTask
    }
}

function addingTask(configObj){
    return (dispatch) => {
        fetch(URL + 'tasks', configObj)
        .then(res => res.json())
        .then(newTask => {
            dispatch(addedTask(newTask))
        })
    }
}




function myfetchedTasks(myTasks){
    return{
        type: 'all_tasks', payload: myTasks
    }
}

function fetchingTasks(current_employee_id){
    let configObj = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`}
    }
    return (dispatch) => {
        fetch(URL + 'tasks/', configObj)
        .then(res => res.json())
        .then(allTasks => {
            let myTasks = allTasks.filter(task => task.team_member_id === current_employee_id)
            dispatch(myfetchedTasks(myTasks))
        })
    }
}
function editTask(updatedTask){
    return{
        type: 'edit_task', payload: updatedTask
    }
}

function markingTaskStatus(id, configObj){
    return (dispatch) => {
        fetch(URL + 'tasks/' + id, configObj)
        .then(res => res.json())
        .then(updatedTask => {
            console.log(updatedTask)
            dispatch(editTask(updatedTask))
        })
    }
}

function deletedTask(id){
    return{
        type: 'delete_task', payload: id
    }
}
function deletingTask(id, configObj){
    return (dispatch) => {
        fetch(URL + 'tasks/' + id, configObj)
        .then(() => {
            dispatch(deletedTask(id))
        })
    }
}

function gotManagedMembers(team_members){
    return{
        type: 'all_managed_members', payload: team_members
    }
}
function gettingManagedMembers(id){
    return (dispatch) => {
        fetch(URL + 'teams/' + id)
        .then(res => res.json())
        .then(teamInfo => {
            dispatch(gotManagedMembers(teamInfo.team_members))
        })
    }
}


function assignedTask(newTask){
    return{
        type: 'assigned_task', payload: newTask
    }
}

function assigningTask(configObj){
    return (dispatch) => {
        fetch(URL + 'tasks', configObj)
        .then(res => res.json())
        .then(newTask => {
            console.log(newTask)
            if (newTask.error){
                alert('Sorry, something went wrong')
            }
            else
            dispatch(assignedTask(newTask))
            })
    }
}

function fetchedNotifications(notifications){
    return{
        type: 'my_notifications', payload: notifications
    }
}
function fetchingNotifications(user_id){
    let configObj = {method: 'GET', 
                    headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`}
    }
    return (dispatch) => {
    fetch(URL + 'notifications', configObj)
    .then(res => res.json())
    .then(allNotifications => {
        let current_user_notifications = allNotifications.filter(notif => notif.team_member_id === user_id)
        dispatch(fetchedNotifications(current_user_notifications))
    })
    }
}

function readNotification(updatedNotification){
    return{
        type: 'updated_notification', payload: updatedNotification
    }
}

function readingNotification(notification_id, configObj){
    return (dispatch) => {
    fetch(URL + 'notifications/' + notification_id, configObj)
    .then(res => res.json())
    .then(updatedNotification => {
        dispatch(readNotification(updatedNotification))
    })
    }
}


export {readingNotification, fetchingNotifications, assigningTask, gettingManagedMembers, deletingTask, markingTaskStatus, fetchingTasks, addingTask, deletingProject, updatingProject, addingNewProject, updatingUser, fetchingEmployee, fetchingProjects}
