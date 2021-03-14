/* New employee submission data harvested from form */

let getNewEmployeeData = function() {
    const first_name_input = document.getElementById('first-name-input').value;
    const last_name_input = document.getElementById('last-name-input').value;
    const email_input = document.getElementById('email-input').value;
    const date_input = document.getElementById('date-input').value;
    
    let new_employee_data = {};
    new_employee_data["first_name_input"] = first_name_input;
    new_employee_data["last_name_input"] = last_name_input;
    new_employee_data["email_input"] = email_input;
    new_employee_data["date_input"] = date_input;
    
    return new_employee_data;
}

function deleteTable(){
    //deletes the table
    const rootParent = document.getElementById('featured-employees');
    
    while(rootParent.firstElementChild != null){
        rootParent.removeChild(rootParent.firstElementChild)
    }

}

let displayTable = function (dataSet) {
    const rootParent = document.getElementById('featured-employees');
    for (let i = 0; i < dataSet.length; i++) {
        rootParent.appendChild(generateEmployeeCard(dataSet[i]));
    }
    bindDeleteEmployeeButtons(dataSet);
    bindEditEmployeeButtons(dataSet);
}

let generateEmployeeCard = function (dataSet) {
    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', `update-fields${dataSet.employee_id}`);
    /* Add content to card */
    fieldset.appendChild(generateID(dataSet));
    fieldset.appendChild(generateFirstName(dataSet));
    fieldset.appendChild(generateLastName(dataSet));
    fieldset.appendChild(generateEmail(dataSet));
    fieldset.appendChild(generateDate(dataSet));
    fieldset.appendChild(generateEditButton(dataSet));
    fieldset.appendChild(generateDeleteButton(dataSet));

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
    const id = document.createElement('span');
    id.textContent = dataSet['employee_id'] + ':';
    id.className = 'employee-id'
    return id;
}

let generateFirstName = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `first-name${dataSet.employee_id}`);
    input.setAttribute('value', dataSet.first_name)
    input.disabled = true;
    const label = generateLabel(`first-name${dataSet.employee_id}`, ' First Name: ');
    label.appendChild(input);
    return label;

}

let generateLastName = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `last-name${dataSet.employee_id}`);
    input.setAttribute('value', dataSet.last_name)
    input.disabled = true;
    const label = generateLabel(`last-name${dataSet.employee_id}`, ' Last Name: ');
    label.appendChild(input);
    return label;
}

let generateEmail = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'email');
    input.setAttribute('id', `email${dataSet.employee_id}`);
    input.setAttribute('value', dataSet.email_address)
    input.disabled = true;
    const label = generateLabel(`email${dataSet.employee_id}`, ' Email: ');
    label.appendChild(input);
    return label;
}

let truncateDate = function(longDate){
    //takes the longDate from sql as a parameter and cuts the time off the end
    date = ""
    for (j=0; j<longDate.length; j++){
        if (longDate[j] == 'T'){
            break;
        }
        else{
            date += longDate[j]
        }
    }
    return date;
}

let generateDate = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.setAttribute('id', `date${dataSet.employee_id}`);
    input.setAttribute('value', truncateDate(dataSet.date_of_hire))
    input.disabled = true;
    const label = generateLabel(`date${dataSet.employee_id}`, ' Date of Hire: ');
    label.appendChild(input);
    return label;
}

let generateEditButton = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `edit-employee${dataSet.employee_id}`);
    input.setAttribute('value', 'Edit');
    return input;
}

let generateDeleteButton = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `delete-employee${dataSet.employee_id}`);
    input.setAttribute('value', 'Delete');
    return input;
}

let enableUpdateFields = function (employee_id, dataSet) {

    fieldset = document.getElementById(`update-fields${employee_id}`)

    field = document.getElementById(`first-name${employee_id}`)
    field.disabled = false;

    field = document.getElementById(`last-name${employee_id}`)
    field.disabled = false;

    field = document.getElementById(`email${employee_id}`)
    field.disabled = false;

    field = document.getElementById(`date${employee_id}`)
    field.disabled = false;
    
    edit_button = document.getElementById(`edit-employee${employee_id}`)
    edit_button.style.display = 'none';

    update_button = document.createElement('input')
    update_button.setAttribute('type', 'submit');
    update_button.setAttribute('id', `update-employee${employee_id}`);
    update_button.setAttribute('value', 'Update');
    fieldset.insertBefore(update_button, fieldset.lastElementChild)

    bind_update_button(update_button, employee_id, dataSet);
}

let disableUpdateFields = function (employee_id) {

    fieldset = document.getElementById(`update-fields${employee_id}`)

    field = document.getElementById(`first-name${employee_id}`)
    field.disabled = true;

    field = document.getElementById(`last-name${employee_id}`)
    field.disabled = true;

    field = document.getElementById(`email${employee_id}`)
    field.disabled = true;

    field = document.getElementById(`date${employee_id}`)
    field.disabled = true;
    
    //restore edit button
    edit_button = document.getElementById(`edit-employee${employee_id}`)
    edit_button.style.display = 'inline';
}

let disableOtherButtonsAndFields = function (dataSet){
    for (var j = 0; j < dataSet.length; j++){
        edit_button = document.getElementById(`edit-employee${dataSet[j].employee_id}`);
        edit_button.disabled = true;
    }

    for (var j = 0; j < dataSet.length; j++){
        edit_button = document.getElementById(`delete-employee${dataSet[j].employee_id}`);
        edit_button.disabled = true;
    }

    document.getElementById('new-employee-submit-button').disabled = true;
    document.getElementById('first-name-input').disabled = true;
    document.getElementById('last-name-input').disabled = true;
    document.getElementById('email-input').disabled = true;
    document.getElementById('date-input').disabled = true;

}

let restoreOtherFieldsAndButtons = function(dataSet){
    for (var j = 0; j < dataSet.length; j++){
        edit_button = document.getElementById(`edit-employee${dataSet[j].employee_id}`);
        edit_button.disabled = false;
    }

    for (var j = 0; j < dataSet.length; j++){
        edit_button = document.getElementById(`delete-employee${dataSet[j].employee_id}`);
        edit_button.disabled = false;
    }

    document.getElementById('new-employee-submit-button').disabled = false;
    document.getElementById('first-name-input').disabled = false;
    document.getElementById('last-name-input').disabled = false;
    document.getElementById('email-input').disabled = false;
    document.getElementById('date-input').disabled = false;


}

let getUpdateData = function (employee_id){
    let update_data = {};

    update_data['employee_id'] = employee_id
    update_data["first_name_input"] = document.getElementById(`first-name${employee_id}`).value;
    update_data["last_name_input"] = document.getElementById(`last-name${employee_id}`).value;
    update_data["email_input"] = document.getElementById(`email${employee_id}`).value;
    update_data["date_input"] = document.getElementById(`date${employee_id}`).value;

    return update_data;

}

const testData = [{'id': '001', 
                   'first_name': 'Frank',
                   'last_name': 'Thomas',
                   'email': 'fthomas@email.com',
                   'date': '2016-02-02'
                   },
                   {'id': '002', 
                    'first_name': 'Eric',
                    'last_name': 'Johnson',
                    'email': 'ejohnson@email.com',
                    'date': '2014-02-02'
                   },
                {'id': '003',
                'first_name': 'Donald',
                'last_name': 'Taylor',
                'email': 'taylordo@oregonstate.edu',
                'date': '2021-02-16'}]

let baseUrl = "http://flip1.engr.oregonstate.edu:4756/employees"

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

        displayTable(response['rows'])
        event.preventDefault();
    })

});

//Event listener for new employee button
document.getElementById('new-employee-submit-button').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    req.open("POST", baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    
    req.addEventListener('load',function(){
        if(req.status >=200 && req.status < 400){
            var response = JSON.parse(req.responseText)
            
            deleteTable()
            displayTable(response['rows'])
        }
        else{
            console.log(req.statusText)
        }
    });
    
    new_employee_data = getNewEmployeeData()
    req.send(JSON.stringify(new_employee_data));
    document.getElementById("new-employee-form").reset();
    event.preventDefault();

  })


/* Add Event Listeners for Delete Employee Buttons*/
let bindDeleteEmployeeButtons = function(dataSet){
    for(i = 0; i < dataSet.length; i++){
        employee_id = dataSet[i]['employee_id'];

        button = document.getElementById(`delete-employee${employee_id}`);
        button.addEventListener('click', function(employee_id){

        var req = new XMLHttpRequest();
        req.open("DELETE", baseUrl, true);
        req.setRequestHeader('Content-Type', 'application/json');
    
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status <400){
                var response = JSON.parse(req.responseText)
    
                deleteTable()
                displayTable(response['rows'])
            }
            else{
                console.log(req.statusText)
            }
        });
    
        var delete_data = {'employee_id' : employee_id}
        req.send(JSON.stringify(delete_data));
        event.preventDefault();
            
        }.bind(button, employee_id));
    }
}

/* Add Event Listeners for Edit Employee Buttons*/
let bindEditEmployeeButtons = function(dataSet){
    for(i = 0; i < dataSet.length; i++){
        employee_id = dataSet[i]['employee_id'];

        button = document.getElementById(`edit-employee${employee_id}`);
        button.addEventListener('click', function(employee_id){

        enableUpdateFields(employee_id, dataSet);
        disableOtherButtonsAndFields(dataSet);
        
        event.preventDefault();
        }.bind(button, employee_id));   
    }
}

//Event Listener for Update Button
let bind_update_button = function(update_button, employee_id, dataSet){
    update_button.addEventListener('click', function(){
      
        var req = new XMLHttpRequest();
        req.open("PUT", baseUrl, true);
        req.setRequestHeader('Content-Type', 'application/json');
    
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status <400){
                var response = JSON.parse(req.responseText)
    
                deleteTable()
                displayTable(response['rows'])
            }
            else{
                console.log(req.statusText)
            }
        });
    
        update_data = getUpdateData(employee_id);
        req.send(JSON.stringify(update_data));
        
        disableUpdateFields(employee_id);
        restoreOtherFieldsAndButtons(dataSet);
        update_button.style.display = 'none';
        event.preventDefault();
    })
}