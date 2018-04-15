import { Tree, VirtualTree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';
import * as path from 'path';

const collectionPath = path.join('./node_modules/@schematics/angular/collection.json');

const appOptions: ApplicationOptions = {
  directory: '',
  name: 'app',
  prefix: 'app',
  sourceDir: 'src',
  inlineStyle: false,
  inlineTemplate: false,
  viewEncapsulation: 'None',
  version: '1.2.3',
  routing: true,
  skipTests: false,
  minimal: false
};

/**
 * Creates a basic Angular project
 */
export function baseApp(options: ApplicationOptions) {
  let appTree: Tree = new VirtualTree();
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);
  appTree = schematicRunner.runSchematic('application', Object.assign(options, appOptions), appTree);

  return appTree;
}
