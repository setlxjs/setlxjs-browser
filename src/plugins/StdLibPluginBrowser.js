import StdLibPlugin from 'setlxjs-transpiler/build/plugins/StdLibPlugin';

export default class StdLibPluginBrowser extends StdLibPlugin {
  imports() {
    return this.imps.filter(imp => imp.varName !== 'print').map(
      imp => `var ${imp.varName} = $$stdLib.${imp.importName};`
    ).join('\n');;
  }
}
