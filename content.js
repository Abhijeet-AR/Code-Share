console.log('conent click');

// document.addEventListener('select', function (evt) {
//     console.log('selected', evt);
// });

function get_code() {
    let lines = document.querySelector('#codeshell-wrapper > div.hr_tour-code-solution.movable-hand.flex-row > div > div.code-editors > div.code-body > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code');
    lines = lines.innerText;

    let code_arr = lines.split('\n');
    // console.log(code_arr);
    let code = '';
    for(let i = 1; i < code_arr.length; i+=2){
        // console.log(code_arr[i]);

        if(code_arr[i].charCodeAt(0) != 8203)
            code += code_arr[i];
        
        code += '\n';
        // console.log(code);
    }
    
    // alert(code);
    console.log(code);
    return code;
    // let text_area = document.querySelector('#editor > div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code > div > pre');
    // text_area.click();


}

// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
//     console.log('msg', msg);
//     alert(msg.txt);

//     console.log('Pasting');
//     document.execCommand('paste', msg.txt);
// })

function copy_clipboard(text) {
    var textArea = document.createElement("textarea");
  
    textArea.value = text;
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      if(!document.execCommand('copy')) 
          alert('Error: Could not copy');

    } catch (err) {
      alert('Error: Could not copy');
    }
  
    document.body.removeChild(textArea);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log('msg', msg);
    
    if(msg.cmd == 'copy'){
        let code = get_code();
        copy_clipboard(code);
    }

    else if(msg.cmd == 'paste'){
        document.execCommand('paste');
        copy_clipboard(msg.url);
    }
})