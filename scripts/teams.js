
/* Retrieve data for new Teams submission */

let getNewTeamData = function() {

    let new_team_data = {};
    new_team_data["team_name_input"] = document.getElementById('team-name-input').value;
    new_team_data["team_leader_input"] = document.getElementById('team-leader-input').value;
    new_team_data["daily_meeting_time_input"] = document.getElementById('daily-meeting-time-input').value;
    new_team_data["meeting_location_input"] = document.getElementById('meeting-location-input').value;
    new_team_data["feature_input"] = document.getElementById('feature-input').value;

    console.log(new_team_data)
    
    return new_team_data
    }

let displayTable = function (dataSet) {
    const rootParent = document.getElementById('featured-teams');
    for (let i = 0; i < dataSet.length; i++) {
        rootParent.appendChild(generateTeamCard(dataSet[i]));
    }
}

let generateTeamCard = function (dataSet) {
    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    /* Add content to card */
    fieldset.appendChild(generateID(dataSet));
    fieldset.appendChild(generateTeamName(dataSet));
    fieldset.appendChild(generateDailyMeetingTime(dataSet));
    fieldset.appendChild(generateMeetingLocation(dataSet));
    fieldset.appendChild(generateTeamLeader(dataSet));
    fieldset.appendChild(generateEditButton(dataSet));
    fieldset.appendChild(generateTeamMemberHeader());
    //fieldset.appendChild(generateTeamMemberList(dataSet));

    //fieldset.appendChild(generateDeleteButton(dataSet));

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
    input.setAttribute('id', `team-name${dataSet.id}`);
    input.setAttribute('value', dataSet.team_name)
    input.disabled = true;
    const label = generateLabel(`team-name${dataSet.id}`, ' Team Name: ');
    label.appendChild(input);
    return label;

}

let generateDailyMeetingTime = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `daily-meeting-time${dataSet.id}`);
    input.setAttribute('value', dataSet.daily_meeting_time)
    input.disabled = true;
    const label = generateLabel(`daily-meeting-time${dataSet.id}`, ' Daily Meeting Time: ');
    label.appendChild(input);
    return label;
}

let generateMeetingLocation= function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `meeting-location${dataSet.id}`);
    input.setAttribute('value', dataSet.meeting_location)
    input.disabled = true;
    const label = generateLabel(`meeting-location${dataSet.id}`, ' Meeting Location: ');
    label.appendChild(input);
    return label;
}

let generateTeamLeader= function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `team-leader${dataSet.id}`);
    input.setAttribute('value', dataSet.team_leader)
    input.disabled = true;
    const label = generateLabel(`team-leader${dataSet.id}`, ' Team Leader: ');
    label.appendChild(input);
    return label;
}

let generateEditButton = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `edit${dataSet.id}`);
    input.setAttribute('value', 'Edit');
    return input;
}

let generateTeamMemberHeader = function (dataSet) {
    const id = document.createElement('h3');
    id.textContent = 'Team Members:';
    return id;
}

/*
My Brain is no longer working. Come back later and figure out how to add the team member list

let generateTeamMemberList = function (dataSet){
    const rootParent = document.getElementById('featured-teams');
    let member_list = document.createElement('ul')
    member_list.appendChild(rootParent)

    for(i = 0; i < dataSet['members'].length; i++){
        let member = document.createElement('li')
        //member.textContent = dataSet['members'][i];
        member.textContent = 'YEA'
        member.appendChild(member_list);
    }
}
*/

let generateDeleteButton = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `delete${dataSet.id}`);
    input.setAttribute('value', 'Delete');
    return input;
}





const teams_test_data = [{'team_id': '001', 
    'team_name': 'Franks Team',
    'daily_meeting_time': '2pm',
    'meeting_location': 'conference room',
    'team_leader': 'Frank',
    'members': ['Don', 'Chris', 'Frank']
    },
    {'team_id': '002', 
    'team_name': 'Zoom Team',
    'daily_meeting_time': '3pm',
    'meeting_location': 'zoom link',
    'team_leader': 'Billy',
    'members' : ['Bob', 'Bill', 'Steve']
    },
    {'team_id': '003', 
    'team_name': 'Team 3',
    'daily_meeting_time': '9am',
    'meeting_location': 'room 3',
    'team_leader': 'Don',
    'members' : ['Nancy', 'Sheryl', 'Dana']
    }]





document.addEventListener('DOMContentLoaded', displayTable(teams_test_data))

document.getElementById('newsubmit').addEventListener('click', getNewTeamData);