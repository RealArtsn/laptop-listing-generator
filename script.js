function init() {
    document.querySelector('#copyTitle').addEventListener('click', copyTitle);
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

    let battery = document.querySelector('#batteryPercent').value + '% BATT';


    // Generate and display title
    titleOut.textContent = model + ' | ' + cpu + ' | ' + memory;
    if (document.querySelector('#StorageSelect').value == 'none') {
        missing.push('STORAGE')
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
    }
    if (document.querySelector('#battery').checked) {
        titleOut.textContent += ' | ' + battery;
    }
    else {
        missing.push('BATTERY');
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
    // Generate condition
    conditionOut.textContent = ''
}

function copyTitle() {
    let titleOut = document.querySelector('#TitleOut');
    navigator.clipboard.writeText(titleOut.textContent);
    titleOut.style.backgroundColor = 'LightGreen';
}

init()