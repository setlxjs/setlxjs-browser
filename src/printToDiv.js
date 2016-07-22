import stringify from 'setlxjs-lib/dist/util/stringify';

const _stringify = str => stringify(str, false);

const encode = {
  '  ': ' &nbsp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;',
}
const htmlify = str => str.replace(/[<>"']|  /g, match => encode[match])

const printToDiv = div => (...args) => {
  div.innerHTML += args.map(_stringify).map(htmlify).join('') + '</br>';
}

export default printToDiv;
