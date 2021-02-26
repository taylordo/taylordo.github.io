/* Retrieve data for new feature submission */

let getFeatData = function() {
    const description = document.getElementById('new_description_input').value;
    const date = document.getElementById('new_date_input').value;
    const status = document.getElementById('new_status_input').value;
    const team = document.getElementById('new_team_input').value;
    
    let featSubData = {};
    featSubData["description"] = description;
    featSubData["date"] = date;
    featSubData["status"] = status;
    featSubData["team"] = team;

    console.log(featSubData)
    
    return featSubData
    }

/* Generate Table of pre-existing Features onto  */

let attachFeatCard = function (dataSet, team) {
    const rootParent = document.getElementById('featured-features');
    for (let i = 0; i < dataSet.length; i++) {
        rootParent.appendChild(generateFeatCard(dataSet[i], team));
    }
}

let generateFeatCard = function (dataSet, team) {
    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    const br = document.createElement('br');
    /* Add content to card */
    fieldset.appendChild(generateHeader(dataSet));
    fieldset.appendChild(generateTextArea(dataSet));
    fieldset.appendChild(br);
    fieldset.appendChild(generateDate(dataSet));
    fieldset.appendChild(generateStatus(dataSet));
    fieldset.appendChild(generateTeam(dataSet, team));
    fieldset.appendChild(generateUpdate(dataSet));
    fieldset.appendChild(generateDelete(dataSet));
    

    /* Complete append of items to document. */
    form.appendChild(fieldset);

    return form;
}

let generateHeader = function (dataSet) {
    const header = document.createElement('h3');
    header.textContent = "Feature" + " " + dataSet.feature_id;
    return header;
}

let generateLabel = function (name, content) {
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = content
    return label;
}

let generateTextArea = function (dataSet) {
    const textArea = document.createElement('textarea');
    textArea.setAttribute('name', `description${dataSet.feature_id}`);
    textArea.setAttribute('rows', 4);
    textArea.setAttribute('columns', 150);
    textArea.setAttribute('id', 'description');
    textArea.textContent = dataSet.description;
    textArea.disabled = true;
    return textArea;
}

let generateDate = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.setAttribute('id', `date${dataSet.feature_id}`);
    let newDate = sliceDate(dataSet.deadline)
    input.setAttribute('value', newDate);
    input.disabled = true;
    const label = generateLabel(`date${dataSet.feature_id}`, ' Deadline: ')
    label.appendChild(input);
    return label;
}

let sliceDate = function (date) {
    const newDate = date.slice(0,10);
    return newDate
}

let generateStatus = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', `status${dataSet.feature_id}`)
    input.setAttribute('value', dataSet.status);
    input.disabled = true;
    const label = generateLabel(`status${dataSet.feature_id}`, 'Status: ');
    label.appendChild(input);
    return label;
}

let generateTeam = function (dataSet, team) {
    let input = document.createElement('select');
    let nullOption = document.createElement('option');
    nullOption.textContent = 'No Team';
    nullOption.setAttribute('value', null);
    if (dataSet.team === null) {
        input.add(nullOption);
        for(i = 0; i < team.length; i++) {
            let option = document.createElement('option');
            option.setAttribute('id', `team${team[i].team_id}`)
            option.textContent = team[i].team_name
            input.add(option)
        } 
    } else {
        for(i = 0; i < team.length; i++) {
            if(dataSet.team === team[i].team_id) {
                let option = document.createElement('option');
                option.setAttribute('id', `team${team[i].team_id}`)
                option.textContent = team[i].team_name
                input.add(option)
                break;
            }
        }
        input.add(nullOption);
        for(j = 0; j < team.length; j++) {
            if(dataSet.team !== team[j].team_id) {
                let option = document.createElement('option');
                option.setAttribute('id', `team${team[j].team_id}`)
                option.textContent = team[j].team_name
                input.add(option)
            }
        }
    }
    input.setAttribute('type', 'text');
    input.setAttribute('id', `team${dataSet.feature_id}`)
    // Add select if no team
    input.setAttribute('value', dataSet.team);
    input.disabled = true;
    const label = generateLabel(`team${dataSet.feature_id}`, 'Team Assigned: ');
    label.appendChild(input);
    return label;
}

let generateUpdate = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `edit${dataSet.feature_id}`);
    input.setAttribute('value', 'Edit');
    return input;
}

let generateDelete = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `delete${dataSet.feature_id}`);
    input.setAttribute('value', 'Delete');
    return input;
}

let generateTeamChoice = function(dataSet) {
    const teamSubmit = document.getElementById('new_team_input');
    for (i = 0; i < dataSet.length; i++) {
        let option = document.createElement('option')
        option.textContent = `${dataSet[i].team_name}`;
        option.setAttribute('value', dataSet[i].team_id);
        teamSubmit.add(option)
    }
}

let deleteTable = function() {
    const features = document.getElementById('featured-features');

    while(features.firstElementChild != null){
        features.removeChild(features.firstElementChild)
    }
}

let baseUrl = "http://flip1.engr.oregonstate.edu:4758/"

//Initial Display
document.addEventListener('DOMContentLoaded', function(event) {
var req = new XMLHttpRequest();
req.open('GET', baseUrl, true);
req.send(null);

req.addEventListener('load', function(){
    if (req.status >=200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
    
    } else {
        console.log(req.statusText);
    }

    deleteTable()
    generateTeamChoice(response['team']);
    attachFeatCard(response['rows'], response['team']);
    event.preventDefault();
})

});

// Event listener for new bugs button
document.getElementById('new_submit_input').addEventListener('click', function(event){
var req = new XMLHttpRequest();
req.open("POST", baseUrl, true);
req.setRequestHeader('Content-Type', 'application/json');

req.addEventListener('load',function(){
    if(req.status >=200 && req.status < 400){
        var response = JSON.parse(req.responseText)
        
        console.log(response)
        // deleteTable()
        // generateTeamChoice(response['team']);
        // attachFeatCard(response['rows'], response['team']);
        location.reload();
        
    }
    else{
        console.log(req.statusText)
    }
});

new_feat_data = getFeatData()
console.log(new_feat_data)
req.send(JSON.stringify(new_feat_data));
// document.getElementById("new_submit").reset();
// event.preventDefault();

})