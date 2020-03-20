console.log('Code Sharing!!');

var newURL = "https://codeshare.io/new";
let codeshare_tab_id = 0;

// function share_code(){
//     var newURL = "https://codeshare.io/298ydM";
//     chrome.tabs.create({ url: newURL }, (tab) => {
//         tabid = tab.id;
//         console.log(tab);
//         // window.onload = function() {
//         //     console.log('Pasting');
//         //     document.execCommand('paste');
//         // }
//     });   
// }

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, {cmd: 'copy'});
    console.log('Code Copy request sent');

    chrome.tabs.create({ url: newURL }, (tab) => {
        console.log('Opened Code Share');
        codeshare_tab_id = tab.id;
    });

});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete' && tabId == codeshare_tab_id) {
        chrome.tabs.sendMessage(codeshare_tab_id, {cmd: 'paste', url: tab.url});
        console.log('Code Past request sent and Url copy request sent');
    }
});