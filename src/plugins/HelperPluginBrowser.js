import HelperPlugin from 'setlxjs-transpiler/build/plugins/HelperPlugin';

export default class HelperPluginBrowser extends HelperPlugin {
  imports() {
    return this.imps.map(
      imp => `var ${imp.varName} = $$hlpLib.${imp.importName};`
    ).join('\n');;
  }
}
