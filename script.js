function init() {
    document.querySelector('#GenerateButton').addEventListener('click', generateText);
}

function generateText() {
    console.log('Generating output!')
    let titleOut = document.querySelector("#TitleOut");
    let conditionOut = document.querySelector("#ConditionOut");
    // get specs from input
    let model = document.querySelector('#modelName').value;
    let cpu = document.querySelector('#cpuModel').value;
    let memory = document.querySelector('#RAM').value + ' RAM';
    let storage = document.querySelector('#StorageSelect').value + ' ' + document.querySelector('#StorageType').value;
    let os = '';
    let missing = []

    let battery = document.querySelector('#batteryPercent').value + '% BATT';


    // Generate and display title
    titleOut.textContent = model + ' | ' + cpu + ' | ' + memory
    if (document.querySelector('#StorageSelect').value == 'none') {
        missing.push('STORAGE')
    }
    else {
        titleOut.textContent += ' | ' + storage;
    }
    if (document.querySelector('#os').checked) {
        os = 'WIN 11 PRO'
        titleOut.textContent += ' | ' + os;
    }
    else {
        missing.push('OS')
    }
    if (document.querySelector('#battery').checked) {
        titleOut.textContent += ' | ' + battery
    }
    else {
        missing.push('BATTERY')
    }
    
    titleOut.textContent += ' | NO ' + missing.join('/');
    // Generate condition
    conditionOut.textContent = ''
}

init()