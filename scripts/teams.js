
let addTeamLeadDropDown = function(employees) {
    fieldset = document.getElementById('new-team-fieldset')

    const label = generateLabel('newlead', ' Team Lead: ');

    dropdown = document.createElement('select');
    dropdown.setAttribute('id', 'team-leader-input')

    let initialDropdownDisplay = document.createElement('option')
    initialDropdownDisplay.setAttribute('value', null);
    initialDropdownDisplay.textContent = ''
    dropdown.appendChild(initialDropdownDisplay)
    for(i=0; i < employees.length; i++){
        employee = document.createElement('option');
        employee.setAttribute('value', employees[i].employee_id);
        employee.textContent = employees[i].first_name + ' ' + employees[i].last_name;
        dropdown.appendChild(employee)
    }
    label.appendChild(dropdown)
    label.appendChild(document.createElement('br'))
    
    fieldset.insertBefore(label, fieldset.lastElementChild)

}

/* Retrieve data for new Teams submission */
let getNewTeamData = function() {

    let new_team_data = {};
    new_team_data["team_name_input"] = document.getElementById('team-name-input').value;
    new_team_data["daily_meeting_time_input"] = document.getElementById('daily-meeting-time-input').value;
    new_team_data["meeting_location_input"] = document.getElementById('meeting-location-input').value;
    new_team_data["team_leader_input"] = document.getElementById('team-leader-input').value;
    
    return new_team_data
    }

function deleteTable(){
    //deletes the table
    const rootParent = document.getElementById('featured-teams');
    
    while(rootParent.firstElementChild != null){
        rootParent.removeChild(rootParent.firstElementChild)
    }

}


let displayTable = function (dataSet) {
    const rootParent = document.getElementById('featured-teams');
    for (let i = 0; i < dataSet.length; i++) {
        rootParent.appendChild(generateTeamCard(dataSet[i]));
    }

    bindAddMemberButtons(dataSet);
    bindDeleteMemberButtons(dataSet);
    bindDeleteTeamButtons(dataSet);
    bindEditTeamButtons(dataSet);
}

let generateTeamCard = function (dataSet) {
    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', `update-fields${dataSet.team_id}`)
    /* Add content to card */
    fieldset.appendChild(generateID(dataSet));
    fieldset.appendChild(generateTeamName(dataSet));
    fieldset.appendChild(generateDailyMeetingTime(dataSet));
    fieldset.appendChild(generateMeetingLocation(dataSet));
    fieldset.appendChild(generateTeamLeader(dataSet));
    fieldset.appendChild(generateEditButton(dataSet));

    fieldset.appendChild(generateTeamMemberHeader(dataSet.team_id));
    fieldset.appendChild(generateTeamMemberList(dataSet))

    fieldset.appendChild(generateDeleteTeamButton(dataSet))

    /* Complete append of items to document. */

    form.appendChild(fieldset);
    return form;
}

let generateLabel = function (name, content) {
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = content
    return label;
}

let generateID = function (dataSet) {
    const id = document.createElement('h3');
    id.textContent = 'Team ' + dataSet['team_id'] + ':';
    id.className = 'team-id'
    return id;
}

let generateTeamName = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `team-name${dataSet.team_id}`);
    input.setAttribute('value', dataSet.team_name)
    input.disabled = true;
    const label = generateLabel(`team-name${dataSet.id}`, ' Team Name: ');
    label.appendChild(input);
    return label;

}

let generateDailyMeetingTime = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `daily-meeting-time${dataSet.team_id}`);
    input.setAttribute('value', dataSet.daily_meeting_time)
    input.disabled = true;
    const label = generateLabel(`daily-meeting-time${dataSet.team_id}`, ' Daily Meeting Time: ');
    label.appendChild(input);
    return label;
}

let generateMeetingLocation= function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `meeting-location${dataSet.team_id}`);
    input.setAttribute('value', dataSet.meeting_location)
    input.disabled = true;
    const label = generateLabel(`meeting-location${dataSet.team_id}`, ' Meeting Location: ');
    label.appendChild(input);
    return label;
}

let generateTeamLeader= function (dataSet) {

    dropdown = document.createElement('select');
    dropdown.setAttribute('id', `team-leader${dataSet.team_id}`);
    dropdown.setAttribute('style', 'width:153px');

    let initialDropdownDisplay = document.createElement('option')
    initialDropdownDisplay.setAttribute('value', null);
    initialDropdownDisplay.textContent = ''
    dropdown.appendChild(initialDropdownDisplay)

    var team_leader_id = dataSet.team_leader;

    for(i=0; i < all_employees.length; i++){
        employee = document.createElement('option');
        employee.setAttribute('value', all_employees[i].employee_id);

        if (team_leader_id == all_employees[i].employee_id){
            employee.selected = true;
        }

        employee.textContent = all_employees[i].first_name + ' ' + all_employees[i].last_name;
        dropdown.appendChild(employee)

    }

    dropdown.disabled = true;
    const label = generateLabel(`team-leader${dataSet.id}`, ' Team Lead: ');
    label.appendChild(dropdown);
    return label;
}

let generateEditButton = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `edit-team${dataSet.team_id}`);
    input.setAttribute('value', 'Edit');
    return input;
}

let generateTeamMemberHeader = function (team_id) {
    const header = document.createElement('h3');
    header.setAttribute('id', `team-member-header${team_id}`)
    header.textContent = 'Team Members:';
    return header;
}


let generateTeamMemberList = function (dataSet){

    let member_list = document.createElement('ul')
    member_list.setAttribute('id', `member_list${dataSet['team_id']}`)

    for(i = 0; i < dataSet['members'].length; i++){
        let member_entry = document.createElement('li')
        let member = document.createElement('input')
        member.setAttribute('value', dataSet['members'][i].first_name + ' ' + dataSet['members'][i].last_name);
        member.disabled = true;
        member_entry.appendChild(member)
        member_entry.appendChild(generateDeleteMemberButton(dataSet['members'][i].employee_id, dataSet['team_id']))
        member_list.appendChild(member_entry);
    }

    member_list.appendChild(generateNewTeamMemberDropdown(dataSet['team_id'], all_employees));

    return member_list;
}

let generateDeleteMemberButton = function (member_id, team_id) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `delete-member${member_id}from-team${team_id}`);
    input.setAttribute('value', 'Delete Member');
    return input;
}

let generateNewTeamMemberDropdown = function (team_id, employees) {
    let new_member_entry = document.createElement('li')

    dropdown = document.createElement('select');
    dropdown.setAttribute('id', `new-member-input-for-team${team_id}`);
    dropdown.setAttribute('style', 'width:153px');

    let initialDropdownDisplay = document.createElement('option')
    initialDropdownDisplay.setAttribute('id', `null-option${team_id}`)
    initialDropdownDisplay.setAttribute('value', null);
    initialDropdownDisplay.textContent = ''
    dropdown.appendChild(initialDropdownDisplay)

    for(i=0; i < employees.length; i++){
        employee = document.createElement('option');
        employee.setAttribute('value', employees[i].employee_id);
        employee.textContent = employees[i].first_name + ' ' + employees[i].last_name;
        dropdown.appendChild(employee)
    }

    new_member_entry.appendChild(dropdown);
    new_member_entry.appendChild(generateAddNewTeamMemberButton(team_id))

    return new_member_entry;
}

let generateAddNewTeamMemberButton = function (team_id){
    button = document.createElement('input');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', `add-member-to-team${team_id}`);
    button.setAttribute('value', 'Add New Member')

    return button;
    
}

let generateDeleteTeamButton = function (team) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `delete-team${team['team_id']}`);
    input.setAttribute('value', 'Delete Team');
    return input
}

let enableUpdateFields = function (team_id) {

    field = document.getElementById(`team-name${team_id}`)
    field.disabled = false;

    field = document.getElementById(`daily-meeting-time${team_id}`)
    field.disabled = false;

    field = document.getElementById(`meeting-location${team_id}`)
    field.disabled = false;

    field = document.getElementById(`team-leader${team_id}`)
    field.disabled = false;
}

let disableUpdateFields = function (team_id) {
    field = document.getElementById(`team-name${team_id}`)
    field.disabled = true;

    field = document.getElementById(`daily-meeting-time${team_id}`)
    field.disabled = true;

    field = document.getElementById(`meeting-location${team_id}`)
    field.disabled = true;

    field = document.getElementById(`team-leader${team_id}`)
    field.disabled = true;

    //restore edit button
    edit_button = document.getElementById(`edit-team${team_id}`)
    edit_button.style.display = 'inline';
}

let changeEditToSubmit = function (team_id, dataSet){
    
    edit_button = document.getElementById(`edit-team${team_id}`)
    edit_button.style.display = 'none';

    submit_changes_button = document.createElement('input')
    submit_changes_button.setAttribute('type', 'submit');
    submit_changes_button.setAttribute('id', `update-employee${employee_id}`);
    submit_changes_button.setAttribute('value', 'Update');

    fieldset = document.getElementById(`update-fields${team_id}`)
    fieldset.insertBefore(submit_changes_button, document.getElementById(`team-member-header${team_id}`))

    bind_submit_changes_button(submit_changes_button, team_id, dataSet);
    
}

let disableOtherButtonsAndFields = function (dataSet){
    
    for (var j = 0; j < dataSet.length; j++){
        //disable edit team buttons
        edit_button = document.getElementById(`edit-team${dataSet[j].team_id}`);
        edit_button.disabled = true;

        //diable delete team buttons
        delete_button = document.getElementById(`delete-team${dataSet[j].team_id}`);
        delete_button.disabled = true;

        //disable delete member buttons
        for (k = 0; k < dataSet[j].members.length; k++){
            member_id= dataSet[j].members[k].employee_id;
            team_id = dataSet[j].team_id;

            delete_member_button = document.getElementById(`delete-member${member_id}from-team${team_id}`)
            delete_member_button.disabled = true;
        }

        //disable add new member buttons and fields
        add_member_button = document.getElementById(`add-member-to-team${team_id}`)
        add_member_button.disabled = true;

        new_member_field = document.getElementById(`new-member-input-for-team${team_id}`)
        new_member_field.disabled = true;

    }

    
    //disable new team fields
    document.getElementById('new-team-submit-button').disabled = true;
    document.getElementById('team-name-input').disabled = true;
    document.getElementById('daily-meeting-time-input').disabled = true;
    document.getElementById('meeting-location-input').disabled = true;
    document.getElementById('team-leader-input').disabled = true;

}

let restoreOtherFieldsAndButtons = function(dataSet){

    for (var j = 0; j < dataSet.length; j++){
        //restore edit team buttons
        edit_button = document.getElementById(`edit-team${dataSet[j].team_id}`);
        edit_button.disabled = false;

        //restore delete team buttons
        delete_button = document.getElementById(`delete-team${dataSet[j].team_id}`);
        delete_button.disabled = false;

        //restore delete member buttons
        for (k = 0; k < dataSet[j].members.length; k++){
            member_id= dataSet[j].members[k].employee_id;
            team_id = dataSet[j].team_id;

            delete_member_button = document.getElementById(`delete-member${member_id}from-team${team_id}`)
            delete_member_button.disabled = false;
        }

        //restore add new member buttons and fields
        add_member_button = document.getElementById(`add-member-to-team${team_id}`)
        add_member_button.disabled = false;

        new_member_field = document.getElementById(`new-member-input-for-team${team_id}`)
        new_member_field.disabled = false;

    }

    //restore new team fields
    document.getElementById('new-team-submit-button').disabled = false;
    document.getElementById('team-name-input').disabled = false;
    document.getElementById('daily-meeting-time-input').disabled = false;
    document.getElementById('meeting-location-input').disabled = false;
    document.getElementById('team-leader-input').disabled = false;

}

let getUpdateData = function (team_id){
    let update_data = {};

    update_data['team_id'] = team_id
    update_data['team_name_input'] = document.getElementById(`team-name${team_id}`).value;
    update_data['daily_meeting_time_input'] = document.getElementById(`daily-meeting-time${team_id}`).value;
    update_data['meeting_location_input'] = document.getElementById(`meeting-location${team_id}`).value;
    update_data['team_leader_input'] = document.getElementById(`team-leader${team_id}`).value;

    return update_data;

}

let getTeamByTeamId = function (dataSet, team_id){
    for(i = 0; i < dataSet.length; i++){
        if (dataSet[i].team_id == team_id){
            return dataSet[i]
        }
    }
}

const teams_test_data = { 'teams': [{'team_id': '001', 
    'team_name': 'Franks Team',
    'daily_meeting_time': '2pm',
    'meeting_location': 'conference room',
    'team_leader': 'Frank',
    'members': [[1,'Don'], [2,'Chris'], [3,'Frank']]
    },
    {'team_id': '002', 
    'team_name': 'Zoom Team',
    'daily_meeting_time': '3pm',
    'meeting_location': 'zoom link',
    'team_leader': 'Billy',
    'members' : [[4,'Bob'], [5,'Bill'], [6,'Steve']]
    },
    {'team_id': '003', 
    'team_name': 'Team 3',
    'daily_meeting_time': '9am',
    'meeting_location': 'room 3',
    'team_leader': 'Don',
    'members' : [[7,'Nancy'], [8,'Sheryl'], [9,'Dana']]
    }],

    'employees' : [[1,'Don'], [2,'Chris'], [3,'Frank'], 
    [4,'Bob'], [5,'Bill'], [6,'Steve'], 
    [7,'Nancy'], [8,'Sheryl'], [9,'Dana']] }


const employee_test_data = [[1,'Don'], [2,'Chris'], [3,'Frank'], 
                            [4,'Bob'], [5,'Bill'], [6,'Steve'], 
                            [7,'Nancy'], [8,'Sheryl'], [9,'Dana']]



let baseUrl = "http://flip1.engr.oregonstate.edu:4756/teams"

//Initial Display
document.addEventListener('DOMContentLoaded', function(event) {
    var req = new XMLHttpRequest();
    req.open('GET', baseUrl, true);
    req.send(null);
    
    /*Get Teams Data */
    req.addEventListener('load', function(){
        if (req.status >=200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
        
        } else {
            console.log(req.statusText);
        }

        all_employees = response['employees']
        addTeamLeadDropDown(all_employees)
        displayTable(response['teams'])

        event.preventDefault();
    })
});



//Event Listener for New Team Button
document.getElementById('new-team-submit-button').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    req.open("POST", baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status <400){
            var response = JSON.parse(req.responseText)

            deleteTable()
            displayTable(response['teams'])
        }
        else{
            console.log(req.statusText)
        }
    });

    new_team_data = getNewTeamData()
    new_team_data['new_team'] = true;
    req.send(JSON.stringify(new_team_data));
    document.getElementById("new-team-form").reset();
    event.preventDefault();
});

/* Add Event Listeners for Add Team Member Buttons*/
let bindAddMemberButtons = function(dataSet){
    for(i = 0; i < dataSet.length; i++){
        team_id = dataSet[i]['team_id'];

        button = document.getElementById(`add-member-to-team${team_id}`);
        button.addEventListener('click', function(team_id){
            employee_id = document.getElementById(`new-member-input-for-team${team_id}`).value;

            //Make sure the employee we're trying to add isn't already on the team
            current_team = getTeamByTeamId(dataSet, team_id);
            current_team_members = current_team.members;
            current_member_ids = []
            for (j = 0; j < current_team_members.length; j++){
                current_member_ids.push(parseInt(current_team_members[j]['employee_id']))
            }
            
            //If the employee isn't already on the team and an employee was selected
            if(!current_member_ids.includes(parseInt(employee_id)) && employee_id != 'null'){
                var req = new XMLHttpRequest();
                req.open("POST", baseUrl, true);
                req.setRequestHeader('Content-Type', 'application/json');
            
                req.addEventListener('load', function(){
                    if(req.status >= 200 && req.status <400){
                        var response = JSON.parse(req.responseText)
            
                        deleteTable()
                        displayTable(response['teams'])
                    }
                    else{
                        console.log(req.statusText)
                    }
                });
            

                var new_member_data = {'employee_id_input' : employee_id, 'team_id_input' : team_id}
                new_member_data['new_member'] = true;
                req.send(JSON.stringify(new_member_data));
                event.preventDefault();
            }
            else{
                document.getElementById(`null-option${team_id}`).selected = true;
                event.preventDefault();
            }
        }.bind(button, team_id));
    }
}

/* Add Event Listeners for Delete Team Member Buttons*/
let bindDeleteMemberButtons = function(dataSet){
    for(i = 0; i < dataSet.length; i++){
        team_id = dataSet[i]['team_id'];

        for( j = 0; j < dataSet[i].members.length; j++){
            employee_id = dataSet[i].members[j].employee_id;

            button = document.getElementById(`delete-member${employee_id}from-team${team_id}`);
            button.addEventListener('click', function(employee_id, team_id){

                var req = new XMLHttpRequest();
                req.open("DELETE", baseUrl, true);
                req.setRequestHeader('Content-Type', 'application/json');
            
                req.addEventListener('load', function(){
                    if(req.status >= 200 && req.status <400){
                        var response = JSON.parse(req.responseText)
            
                        deleteTable()
                        displayTable(response['teams'])
                    }
                    else{
                        console.log(req.statusText)
                    }
                });
            

                var delete_data = {'employee_id_input' : employee_id, 'team_id_input' : team_id}
                delete_data['delete_member'] = true;
                req.send(JSON.stringify(delete_data));

                event.preventDefault();
            }.bind(button, employee_id, team_id));
        }
    }
}

/* Add Event Listeners for Delete Team Buttons*/
let bindDeleteTeamButtons = function(dataSet){
    for(i = 0; i < dataSet.length; i++){
        team_id = dataSet[i]['team_id'];

        button = document.getElementById(`delete-team${team_id}`);
        button.addEventListener('click', function(team_id){

            var req = new XMLHttpRequest();
            req.open("DELETE", baseUrl, true);
            req.setRequestHeader('Content-Type', 'application/json');
        
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <400){
                    var response = JSON.parse(req.responseText)
        
                    deleteTable()
                    displayTable(response['teams'])
                }
                else{
                    console.log(req.statusText)
                }
            });
        

            var delete_data = {'team_id_input' : team_id}
            delete_data['delete_team'] = true;
            req.send(JSON.stringify(delete_data));

            event.preventDefault();
        }.bind(button, team_id));
        
    }
}

/* Add Event Listeners for Edit Team Buttons*/
let bindEditTeamButtons = function(dataSet){
    for(i = 0; i < dataSet.length; i++){
        team_id = dataSet[i]['team_id'];
        button = document.getElementById(`edit-team${team_id}`);
        button.addEventListener('click', function(team_id){
            enableUpdateFields(team_id);
            changeEditToSubmit(team_id, dataSet);
            disableOtherButtonsAndFields(dataSet);
        
            event.preventDefault();
        }.bind(button, team_id));   
    }
}

//Event Listener for Submit Changes Button
let bind_submit_changes_button = function(submit_changes_button, team_id, dataSet){
    submit_changes_button.addEventListener('click', function(){
      
        var req = new XMLHttpRequest();
        req.open("PUT", baseUrl, true);
        req.setRequestHeader('Content-Type', 'application/json');
    
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status <400){
                var response = JSON.parse(req.responseText)
    
                deleteTable()
                displayTable(response['teams'])
            }
            else{
                console.log(req.statusText)
            }
        });

        update_data = getUpdateData(team_id);
        req.send(JSON.stringify(update_data));
        
        disableUpdateFields(team_id);
        restoreOtherFieldsAndButtons(dataSet);

        submit_changes_button.style.display = 'none';
        
        event.preventDefault();
    })
}