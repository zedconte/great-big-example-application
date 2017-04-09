import app from '../app/app';
const path = require('path');
const NeDB = require('nedb');

/**
 * Return the right kind of model depending on which database
 * is configured
 * @param entity the string name of the collection/table
 * @param model NeDB model object defined in a -model.ts file
 */
export function getModel(entity: string, model: any): any {

  // First see if nedb is set in the config file
  const config = app.get('nedb');
  if (config) {
    return new NeDB({
      filename: path.join(config, `${entity}.db`),
      autoload: true
    });
  }

  // If not return the Mongo model object
  return model;

}