import { normalize } from "@angular-devkit/core";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner, UnitTestTree } from "@angular-devkit/schematics/testing";
import { getFileContent } from '@schematics/angular/utility/test';
import * as path from 'path';
import { getAppByIndexOrName } from "../utils/app";
import { baseApp } from "../utils/testing";
const collectionPath = path.join(__dirname, '../collection.json');

describe('bootstrap-shell-schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;
  let tree: UnitTestTree;

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', collectionPath);
  });

  describe(`when the style file default extension for application equals 'css'`, () => {
    beforeEach(() => {
      appTree = baseApp({ directory: '', name: 'app', style: 'css' });
    });

    describe(`and bootstrap v4 is selected`, () => {
      beforeEach(() => {
        tree = runner.runSchematic('ng-add', { version: '4' }, appTree);
      });

      it('should update package.json', () => {
        const packageJson = JSON.parse(getFileContent(tree, '/package.json'));

        expect(packageJson.dependencies['bootstrap']).toBeDefined();
        expect(packageJson.dependencies['ngx-bootstrap']).toBeDefined();
      });

      it('should update the app styles configuration', () => {
        const clientApp = getAppByIndexOrName(tree, '0')
        expect(clientApp.styles).toContain('../node_modules/bootstrap/dist/css/bootstrap.min.css');
      });
    });

    describe(`and bootstrap v3 is selected`, () => {
      beforeEach(() => {
        tree = runner.runSchematic('ng-add', { version: '3' }, appTree);
      });

      it('should update package.json', () => {
        const packageJson = JSON.parse(getFileContent(tree, '/package.json'));

        expect(packageJson.dependencies['bootstrap']).toBeDefined();
        expect(packageJson.dependencies['ngx-bootstrap']).toBeDefined();
      });

      it('should update the app styles configuration', () => {
        const clientApp = getAppByIndexOrName(tree, '0')
        expect(clientApp.styles).toContain('../node_modules/bootstrap/dist/css/bootstrap.min.css');
      });
    });
  });

  describe(`when the style file default extension for application equals 'scss'`, () => {
    beforeEach(() => {
      appTree = baseApp({ directory: '', name: 'app', style: 'scss' });
    });

    describe(`and bootstrap v4 is selected`, () => {
      beforeEach(() => {
        tree = runner.runSchematic('ng-add', { version: '4' }, appTree);
      });

      it('should update package.json', () => {
        const packageJson = JSON.parse(getFileContent(tree, '/package.json'));

        expect(packageJson.dependencies['bootstrap']).toBeDefined();
        expect(packageJson.dependencies['ngx-bootstrap']).toBeDefined();
      });

      it('should update styles.scss', () => {
        const app = getAppByIndexOrName(tree, '0')
        const stylesPath = normalize(`/${app!.root}/styles.scss`);

        const buffer = tree.read(stylesPath);
        const src = buffer!.toString();

        expect(src).toContain(`@import 'variables';`);
        expect(src).toContain(`@import '../node_modules/bootstrap/scss/bootstrap'`);
      });

      it('should add _variables.scss', () => {
        const app = getAppByIndexOrName(tree, '0');
        const stylesPath = normalize(`/${app!.root}/_variables.scss`);
        expect(tree.files).toContain(stylesPath);
      });
    });

    describe(`and bootstrap v3 is selected`, () => {
      beforeEach(() => {
        appTree = baseApp({ directory: '', name: 'app', style: 'scss' });
        tree = runner.runSchematic('ng-add', { version: '3' }, appTree);
      });

      it('should update package.json', () => {
        const packageJson = JSON.parse(getFileContent(tree, '/package.json'));

        expect(packageJson.dependencies['bootstrap-sass']).toBeDefined();
        expect(packageJson.dependencies['ngx-bootstrap']).toBeDefined();
      });

      it('should update styles.scss', () => {
        const app = getAppByIndexOrName(tree, '0');
        const stylesPath = normalize(`/${app!.root}/styles.scss`);

        const buffer = tree.read(stylesPath);
        const src = buffer!.toString();

        expect(src).toContain(`@import 'variables';`);
        expect(src).toContain(`@import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap';`);
      });

      it('should add _variables.scss', () => {
        const app = getAppByIndexOrName(tree, '0');
        const stylesPath = normalize(`/${app!.root}/_variables.scss`);
        expect(tree.files).toContain(stylesPath);
      });
    });
  });
});
