function init() {
    document.querySelector('#GenerateButton').addEventListener('click', generateText);
}

function generateText() {
    console.log('Generating output!')
    let titleOut = document.querySelector("#TitleOut");
    let conditionOut = document.querySelector("#ConditionOut");
    let storageInclusion = ' Storage, ';
    if (document.querySelector('#StorageSelect').value != 'none') {
        storageInclusion = '';
    }
    titleOut.textContent = 'F3/C3: This unit has been POST tested for power, display, and the ability to boot to bios. \
    Please refer to photos for wear and damages as the unit \
    shows wear in multiple spots. This unit will not include' + storageInclusion + ' Operating System, or Power Adapter; these items will be needed for full functionality of the laptop. Comes w/30 Day Warranty'
}

init()