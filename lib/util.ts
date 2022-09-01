/* eslint-disable @typescript-eslint/ban-types */
import { Logger } from '@nestjs/common';

const MISSING_REQUIRED_DEPENDENCY = (name: string, reason: string) =>
  `The "${name}" package is missing. Please, make sure to install this library ($ npm install ${name}) to take advantage of ${reason}.`;

const logger = new Logger('PackageLoader');

export function loadPackage(packageName: string, context: string, loaderFn?: Function) {
  try {
    return loaderFn ? loaderFn() : require(packageName);
  } catch (e) {
    logger.error(MISSING_REQUIRED_DEPENDENCY(packageName, context));
    process.exit(1);
  }
}
