import execute from './execute';
import printToDiv from './printToDiv';

const editor = document.getElementById('editor');
const cons = document.getElementById('cons');

const button = document.createElement('button');
button.innerHTML = 'RUN!';
button.style.position = 'fixed';
button.style.top = '10px';
button.style.right = '10px';

document.body.appendChild(editor);
document.body.appendChild(button);
document.body.appendChild(cons);

const codemirror = CodeMirror(editor, {
  theme: 'monokai',
  value: 'print("hello world");'
});

editor.firstChild.style.height = '100%';

const print = printToDiv(cons);

const markLine = number => {
  codemirror.addLineClass('line-error', 'background', number);
}

button.onclick = () => {
  cons.innerHTML = '';
  execute(codemirror.getValue(), print)
    .catch(error => {
      print(error);
    });
};
