const Ajv = require("ajv");
const swagger = require("../swagger.json");
const { MIDDLEWARE } = require("./constants");
const { handleError } = require("../utils/handleError");


var ajv = new Ajv({
    allErrors: true,
  }).addSchema(swagger, "swagger.json");

exports.validate = (req, res, next) => {
  let validated;
  const errors = [];
  const schema = swagger;
  if (!schema) {
    return next();
  }
  const method = req.method.toLowerCase();
  let path = req.originalUrl
    .replace(MIDDLEWARE.VALIDATOR.PATH.TRAILING_SLASH_REGEX, "")
    .match(MIDDLEWARE.VALIDATOR.PATH.URL_PATH_WITHOUT_BASE)[0]
    .split('?')[0]; // removes query strings 
  const methodSchema = schema.paths[path]? schema.paths[path][method] : null;
  const headerSchema = methodSchema
      ? methodSchema.parameters.filter((obj => obj.in === "path"))
    : [];
  headerSchema.forEach((element) => {
    // get element by name
    const prop = req.query[element.name];
    if (!prop && element.required) {
      errors.push(`${element.name} is required in request query`);
    }
    if (prop) {
        validated = ajv.validate(
            { $ref: `swagger.json#/definitions/${[element.name]}` },
            prop
          )
          if (!validated) {
            errors.push(`${element.name} type incorrect`);
          }
    }
  });
  if (errors.length > 0) {
    const err = {errorCode : 400 , message : JSON.stringify(errors)}
    return handleError(req, res, err);
  }
  return next();
};
