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
      if (error.line) {
        codemirror.addLineClass(error.line - 1, 'background', 'error-line');
        codemirror.on('change', function me() {
          codemirror.removeLineClass(error.line - 1, 'background', 'error-line');
          codemirror.off('change', me);
        });
      } else {
        if (error.toString().match(/SyntaxError/)) {
          print('An Error occured. This might be due to an error in the transpiler or your');
          print('browser is not compatible with the new ES2015 Syntax. Please use newest versions');
          print('of Google Chrome or Firefox!');
          print('');
        } else {
          print('You have an Error in your SetlX code:');
          print('');
        }
      }
      print(error);
    });
};
