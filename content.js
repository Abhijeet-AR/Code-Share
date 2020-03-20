console.log('conent click');

function get_code() {
    let lines = document.querySelector('#codeshell-wrapper > div.hr_tour-code-solution.movable-hand.flex-row > div > div.code-editors > div.code-body > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code');
    lines = lines.innerText;

    let code_arr = lines.split('\n');

    let code = '';
    for(let i = 1; i < code_arr.length; i+=2){

        if(code_arr[i].charCodeAt(0) != 8203)
            code += code_arr[i];
        
        code += '\n';
    }
    
    console.log(code);
    return code;
}

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