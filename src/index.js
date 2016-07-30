import execute from './execute';
import printToDiv from './printToDiv';
import './setlxLanguage';

const editor = document.getElementById('editor');
const cons = document.getElementById('cons');

const button = document.createElement('button');
button.innerHTML = 'RUN!';

document.body.appendChild(editor);
document.body.appendChild(button);
document.body.appendChild(cons);

document.getElementById('menu').innerHTML += '<div>' + SETLXJS_VERSION + '</div>';

const codemirror = CodeMirror(editor, {
  theme: 'monokai',
  value: '// write your programm here and hit the run button above\nprint("hello world");',
  lineNumbers: true,
  mode: 'setlx',
});

editor.firstChild.style.height = '100%';

const print = printToDiv(cons);

button.onclick = () => {
  cons.innerHTML = '';
  execute(codemirror.getValue(), print)
    .catch(error => {
      print(error);

      codemirror.addLineClass(error.line - 1, 'background', 'error-line');
      const evt = codemirror.on('change', function me() {
        codemirror.removeLineClass(error.line - 1, 'background', 'error-line');
        codemirror.off('change', me);
      });
    });
};
