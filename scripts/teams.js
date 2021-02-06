
/* Retrieve data for new Teams submission */

let getTeamData = function() {
    const name = document.getElementById('newname').value;
    const lead = document.getElementById('newlead').value;
    const meeting = document.getElementById('newmeeting').value;
    const location = document.getElementById('newlocation').value;
    const feature = document.getElementById('newfeature').value;
    
    let teamSubData = {};
    teamSubData["name"] = name;
    teamSubData["lead"] = lead;
    teamSubData["meeting"] = meeting;
    teamSubData["location"] = location;
    teamSubData["feature"] = feature;

    console.log(teamSubData)
    
    return teamSubData
    }

/* Generate Table of pre-existing Features onto  */

document.getElementById('newsubmit').addEventListener('click', getTeamData);