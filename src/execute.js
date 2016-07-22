import transpiler from 'setlxjs-transpiler';
import * as hlp from 'setlxjs-lib/dist/hlp';
import * as std from 'setlxjs-lib/dist/std';
import StdLibPluginBrowser from './plugins/StdLibPluginBrowser';
import HelperPluginBrowser from './plugins/HelperPluginBrowser';

export default function execute(content, print) {
  const startedAt = performance.now();
  return transpiler(content, {
    plugins: {
      stdLibPlugin: new StdLibPluginBrowser(),
      helperPlugin: new HelperPluginBrowser(),
    },
  })
    .then(res => {
      const code = new Function('$$stdLib', '$$hlpLib', 'print', res);
      const transpiledAt = performance.now();
      code(std, hlp, print);
      const executedAt = performance.now();
      print('');
      print('Finished programm:');
      print('Transpilation took ' + (transpiledAt - startedAt) + ' ms.');
      print('Execution took ' + (executedAt - transpiledAt) + ' ms.');
    });
}
