function init() {
    clearFields()
    addEventListeners()
}

function addEventListeners() {
    document.querySelector('#clearButton').addEventListener('click', clearFields);
    document.querySelectorAll('.copyButton').forEach(e => {e.addEventListener('click', copyField)});
    document.querySelectorAll('input').forEach(e => {e.addEventListener('input', generateText)});
    document.querySelectorAll('select').forEach(e => {e.addEventListener('input', generateText)});
}

function generateText() {
    console.log('Generating output!');
    let titleOut = document.querySelector("#TitleOut");
    let conditionOut = document.querySelector("#ConditionOut");
    // get specs from input
    let model = document.querySelector('#modelName').value;
    let cpu = document.querySelector('#cpuModel').value;
    let memory = document.querySelector('#RAM').value + ' RAM';
    let storage = document.querySelector('#StorageSelect').value + ' ' + document.querySelector('#StorageType').value;
    let os = '';
    let missing = [];

    let battery = document.querySelector('#batteryPercent').value + '%';


    conditionArr = [
        'F3/C3 This unit has been POST tested for power, display, and the ability to boot to BIOS.',
        document.querySelector('#condition').value, // additional condition
        '', // battery
        'Please refer to photos for wear and damages as the unit shows wear in multiple spots.',
        '', // included / not included
        'Comes W/30 Day Warranty.'
    ];

    conditionMissing = []

    // Generate and display title
    titleOut.textContent = model + ' | ' + cpu + ' | ' + memory;
    if (document.querySelector('#StorageSelect').value == 'none') {
        missing.push(document.querySelector('#StorageType').value);
        conditionMissing.push('Storage');
    }
    else {
        titleOut.textContent += ' | ' + storage;
    }
    if (document.querySelector('#os').checked) {
        os = 'WIN11 PRO'
        titleOut.textContent += ' | ' + os;
    }
    else {
        missing.push('OS')
        conditionMissing.push('Operating System');
    }
    if (document.querySelector('#battery').checked) {
        if (document.querySelector('#batteryPercent').value != '') {
            titleOut.textContent += ' | ' + battery + ' BATT';
            conditionArr[2] = `This unit has at least ${battery} available battery capacity at the time of listing.`
        }
        else {
            conditionArr[2] = 'This unit has a functioning battery.'
        }
    }
    else {
        missing.push('BATTERY');
        conditionMissing.push('Battery');
    }
    if (!document.querySelector('#adapter').checked) {
        conditionMissing.push('Power Adapter')
    }
    if (missing.length > 0) {
        titleOut.textContent += ' | NO ' + missing.join('/');
    }
    let titleLength = document.querySelector('#titleLength');
    titleLength.textContent = titleOut.textContent.length + '/80';
    if (titleOut.textContent.length > 80) {
        titleLength.style.color = 'Red'
    }
    else {
        titleLength.style.color = 'Black'
    }
    // reset background after copy
    titleOut.style.backgroundColor = '';
    conditionOut.style.backgroundColor = '';
    // Generate condition
    conditionArr[5] = joinMissingCondition(conditionMissing);
    conditionOut.textContent = conditionArr.join(' ');
}

function joinMissingCondition(conditionMissing) {
    if (conditionMissing.length == 0) {
        return '';
    }
    
    let thisOrThese = 'this';
    let plural = ['a','s']
    if (conditionMissing.length > 1) {
        thisOrThese = 'these';
        plural[0] = ''
    }
    else {
        if (conditionMissing[0] == 'Storage') {
            plural[0] = '';
        }
        plural[1] = '';
    }
    let conditionMissingList = ''
    if (conditionMissing.length > 1) {
        conditionMissingList = `${conditionMissing.slice(0,-1).join(', ')} or ${conditionMissing[conditionMissing.length - 1]}`
    }
    else {
        conditionMissingList = conditionMissing.join(', ')
    }
    let missingString = `This unit will not include ${plural[0]} ${conditionMissingList}; ${thisOrThese} item${plural[1]} will be needed for full functionality of the laptop.`
    return missingString
    
}

function copyField() {
    let copyElement = null;
    // console.log(this.id);
    if (this.id == 'copyTitle') {
        console.log('Copy the title')
        copyElement = document.querySelector('#TitleOut');
    }
    if (this.id == 'copyCondition') {
        console.log('Copy the condition')
        copyElement = document.querySelector('#ConditionOut');
    }
    navigator.clipboard.writeText(copyElement.textContent);
    copyElement.style.backgroundColor = 'LightGreen';
}

function clearFields() {
    document.querySelectorAll('input').forEach(e => {e.value = ''; e.checked = false});
    document.querySelectorAll('h5').forEach(e => {e.textContent = ''});
    document.querySelector('#StorageSelect').value = 'none';
    document.querySelector('#RAM').value = '';
}

init()