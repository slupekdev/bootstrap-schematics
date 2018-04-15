import { Tree, SchematicsException } from "@angular-devkit/schematics";
import { getConfig, getAppFromConfig, AppConfig, CliConfig } from "@schematics/angular/utility/config";

/**
 * Gets application by index or name based on angular cli configuration
 */
export function getAppByIndexOrName(host: Tree, appIndexOrName: string | undefined): AppConfig {
    const config = getConfig(host);
    const app = getAppFromConfig(config, appIndexOrName || '0');
    if (app === null) {
      throw new SchematicsException('Client app not found.');
    }
    
    return app;
}

/**
 * Gets default settings for angular cli project
 */
export function getDefaults(host: Tree) : CliConfig["defaults"] {
    const config = getConfig(host);
    return (config && config.defaults) || { styleExt: 'css' };
}
