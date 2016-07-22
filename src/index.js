import transpiler from 'setlxjs-transpiler';
import 'setlxjs-lib/dist/hlp/';
import 'setlxjs-lib/dist/std/';

const editor = document.createElement('div');
document.body.appendChild(editor);

editor.style.width = '50%';
editor.style.margin = '200px auto 20px';

CodeMirror(editor, { theme: 'monokai', mode: 'javascript' });
