import transpiler from 'setlxjs-transpiler';
import * as hlp from 'setlxjs-lib/dist/hlp';
import * as std from 'setlxjs-lib/dist/std';
import StdLibPluginBrowser from './plugins/StdLibPluginBrowser';
import HelperPluginBrowser from './plugins/HelperPluginBrowser';

export default function execute(content, print) {
  return transpiler(content, {
    plugins: {
      stdLibPlugin: new StdLibPluginBrowser(),
      helperPlugin: new HelperPluginBrowser(),
    },
  })
    .then(res => {
      const code = new Function('$$stdLib', '$$hlpLib', 'print', res);
      code(std, hlp, print);
    });
}
