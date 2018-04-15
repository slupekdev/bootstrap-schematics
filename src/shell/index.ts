import { normalize } from '@angular-devkit/core';
import { Rule, SchematicContext, SchematicsException, Tree, chain } from '@angular-devkit/schematics';
import { getAppFromConfig, getConfig } from '@schematics/angular/utility/config';
import { getAppByIndexOrName, getDefaults } from '../utils/app';
import { bootstrap3SassVersion, bootstrap3Version, bootstrap4Version, ngxBootstrapVersion } from '../utils/lib-versions';
import { addPackageToPackageJson } from '../utils/package';
import { Schema } from './schema';

/**
 * Scaffolds the basics of a bootstrap application
 */

export default function (options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {

    options.styleext = options.styleext || getDefaults(tree)!.styleExt;

    return chain([
      addVariablesFile(options),
      addDependencies(options),
      updateConfigFile(options),
      importStyles(options),
    ])(tree, context);
  };
};

/**
 * Insert a bootstrap.min.css to .angular-cli.json file.
 */
function updateConfigFile(options: Schema): Rule {
  return (host: Tree) => {

    if (options.styleext === 'css') {
      const config = getConfig(host);
      const app = getAppFromConfig(config, options.app || '0');
      if (app === null) {
        throw new SchematicsException('Client app not found.');
      }

      if (!app.styles) {
        app.styles = [];
      }

      app.styles.push('../node_modules/bootstrap/dist/css/bootstrap.min.css');

      host.overwrite('/.angular-cli.json', JSON.stringify(config, null, 2));
    }

    return host;
  };
}

/**
 * Add ngx-bootstrap, bootstrap or bootstrap-sass to package.json
 */
function addDependencies(options: Schema): Rule {
  return (host: Tree) => {
    addPackageToPackageJson(host, 'dependencies', 'ngx-bootstrap', ngxBootstrapVersion);

    if (options.version === "4") {
      addPackageToPackageJson(host, 'dependencies', 'bootstrap', bootstrap4Version);
    } else {
      if (options.styleext === 'scss') {
        addPackageToPackageJson(host, 'dependencies', 'bootstrap-sass', bootstrap3SassVersion);
      } else {
        addPackageToPackageJson(host, 'dependencies', 'bootstrap', bootstrap3Version);
      }
    }

    return host;
  };
}

/**
 * Add a _variables.scss file.
 */
function addVariablesFile(options: Schema): Rule {
  return (host: Tree) => {
    if (options.styleext === 'scss') {
      const app = getAppByIndexOrName(host, options.app);
      const variableFilePath = normalize(`/${app!.root}/_variables.scss`);
      let content = ``;

      if (options.version === "3") {
        content = `$icon-font-path: '../node_modules/bootstrap-sass/assets/fonts/bootstrap/';`;
      }

      host.create(variableFilePath, content);
    }
    return host;
  };
}

/**
 * Add imports to style.ext file
 */
function importStyles(options: Schema): Rule {
  return (host: Tree) => {
    if (options.styleext === 'scss') {
      const app = getAppByIndexOrName(host, options.app);
      const stylesPath = normalize(`/${app!.root}/styles.scss`);

      const buffer = host.read(stylesPath);
      if (buffer === null) {
        throw new SchematicsException('Could not find styles.scss');
      }

      let content = buffer.toString() + "@import 'variables';\r\n"

      if (options.version === "4") {
        content = content + "@import '../node_modules/bootstrap/scss/bootstrap';\r\n";
      }
      else {
        content = content + "@import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap';\r\n";
      }

      host.overwrite(stylesPath, content);
    }

    return host;
  };
}
