# Bootstrap Shell

## Overview
Adds Bootstrap and its depedencies and pre-configures the angular cli application (based on https://github.com/angular/angular-cli/wiki/stories-include-bootstrap)

## Command

```sh
ng generate bootstrap-shell --collection bootstrap-schematics [options]
# or
ng generate bootstrap-shell -c bootstrap-schematics [options]
```

## Options

Version of Bootstrap (`3` or `4`) 

* `--version` (alias: `-v`)

  * Type: `'3' | '4'`
  * Default: `4`

Name or index of related client app.

* `--clientApp` (alias: `-a`)
  * Type: `string`
  * Default: `0`

## Examples

 Add Bootstrap 4 to your Angular CLI project 

```sh
ng generate bootstrap-shell -c bootstrap-schematics -v 4
```