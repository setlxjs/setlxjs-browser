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
