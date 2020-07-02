/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const config = {
	url: "https://api.mett.nl/swagger/v1/swagger.json",
	out: path.join(__dirname, "./src/mett/communication/types.ts")
};

axios
	.get(config.url)
	.then((result: any) => {
		const swagger = result.data;
		const paths = swagger.paths;
		const schemas = swagger.components.schemas;
		const typeString = createTypes(schemas, paths);
		fs.writeFileSync(config.out, typeString);
	})
	.catch((err: Error) => {
		console.error(err.message);
	});

function createTypes(schemas: any, paths: any) {
	let typeScriptString = "";
	// First go through all the schema and define those types
	for (const schema in schemas) {
		if (schemas.hasOwnProperty(schema)) {
			const element = schemas[schema];
			let TSType: string;
			let content = "";
			switch (element.type) {
				case "string":
					TSType = "enum";
					element.enum.forEach((enumType: any, index: number) => {
						content += `${index ? "," : ""}\n\t${enumType} = "${enumType}"`;
					});
					break;
				case "object":
					TSType = "interface";
					for (const propertyKey in element.properties) {
						if (element.properties.hasOwnProperty(propertyKey)) {
							const property = element.properties[propertyKey];
							const nullable = property.nullable;
							if (property.$ref) {
								content += `\n\t${propertyKey}?: ${property.$ref.match(/[^/]*$/)[0]};`;
							} else {
								const type = property.type;
								switch (type) {
									case "array":
										if (property.items.$ref) {
											content += `\n\t${propertyKey}?: ${
												property.items.$ref.match(/[^/]*$/)[0]
											}[];`;
										} else {
											// Case not supported for now, implement if necessary
											continue;
										}
										break;

									case "string":
										if (property.format === "date-time") {
											content += `\n\t${propertyKey}${nullable ? "?" : ""}: Date;`;
										} else {
											content += `\n\t${propertyKey}${nullable ? "?" : ""}: string;`;
										}
										break;

									case "integer":
										content += `\n\t${propertyKey}${nullable ? "?" : ""}: number;`;
										break;

									case "boolean":
										content += `\n\t${propertyKey}${nullable ? "?" : ""}: boolean;`;
										break;

									case "object":
										content += `\n\t${propertyKey}${nullable ? "?" : ""}: any;`;
										break;

									default:
										// Skip unknown types
										continue;
								}
							}
						}
					}
					// Need to support other types?
					break;

				default:
					// If it is not one of the above types skip this schema
					continue;
			}
			typeScriptString += `export ${TSType} ${schema} {${content}\n}\n\n`;
		}
	}

	// Then go through all the routes to define types for request/response
	for (const path in paths) {
		if (paths.hasOwnProperty(path)) {
			const routeEndpoint = paths[path];
			for (const httpMethod in routeEndpoint) {
				if (routeEndpoint.hasOwnProperty(httpMethod)) {
					const methodItem = routeEndpoint[httpMethod];
					if (methodItem.operationId) {
						console.log(path, httpMethod);
						// First add a type for the response
						if (!methodItem.responses["200"].content) {
							// No content return specified
							typeScriptString += `/**\n * ${methodItem.summary}\n * ${
								methodItem.description
							}\n * Route: ${path}\n * Method: ${httpMethod.toUpperCase()}\n */\nexport type Api${
								methodItem.operationId
							}Response = any;\n\n`;
						} else {
							const responseSchema = methodItem.responses["200"].content["application/json"].schema;
							if (responseSchema.$ref) {
								typeScriptString += `/**\n * ${methodItem.summary}\n * ${
									methodItem.description
								}\n * Route: ${path}\n * Method: ${httpMethod.toUpperCase()}\n */\nexport type Api${
									methodItem.operationId
								}Response = ${responseSchema.$ref.match(/[^/]*$/)[0]};\n\n`;
							} else {
								switch (responseSchema.type) {
									case "array":
										typeScriptString += `/**\n * ${methodItem.summary}\n * ${
											methodItem.description
										}\n * Route: ${path}\n * Method: ${httpMethod.toUpperCase()}\n */\nexport type Api${
											methodItem.operationId
										}Response = ${responseSchema.items.$ref.match(/[^/]*$/)[0]}[];\n\n`;
										break;
									case "boolean":
										typeScriptString += `/**\n * ${methodItem.summary}\n * ${
											methodItem.description
										}\n * Route: ${path}\n * Method: ${httpMethod.toUpperCase()}\n */\nexport type Api${
											methodItem.operationId
										}Response = boolean;\n\n`;
										break;

									default:
										// Other types not implemented, skip
										break;
								}
							}
						}
						if (methodItem.requestBody) {
							// Then add request type if this is specified
							const requestSchema = methodItem.requestBody.content["application/json"].schema;
							if (requestSchema.$ref) {
								typeScriptString += `/**\n * ${methodItem.summary}\n * ${
									methodItem.description
								}\n * Route: ${path}\n * Method: ${httpMethod.toUpperCase()}\n */\nexport type Api${
									methodItem.operationId
								}Request = ${requestSchema.$ref.match(/[^/]*$/)[0]};\n\n`;
							} else {
								// Only implemented request with a defined reference schema
							}
						} else if (methodItem.parameters) {
							if (
								httpMethod == "get" &&
								typeScriptString.search(`${methodItem.operationId}Request`) !== -1
							) {
								typeScriptString += `/**\n * ${methodItem.summary}\n * ${
									methodItem.description
								}\n * Route: ${path}\n * Method: ${httpMethod.toUpperCase()}\n */\nexport type Api${
									methodItem.operationId
								}Request = ${methodItem.operationId}Request;\n\n`;
							} else {
								let content = "";
								methodItem.parameters.forEach((param: any) => {
									if (param.in === "query") {
										// Only model what needs to be in the query
										if (param.schema.$ref) {
											content += `\t${param.name}?: ${param.schema.$ref.match(/[^/]*$/)[0]};\n`;
										} else {
											switch (param.schema.type) {
												case "string":
													if (param.schema.format === "date-time") {
														content += `\t${param.name}?: Date;\n`;
													} else {
														content += `\t${param.name}?: string;\n`;
													}
													break;
												case "integer":
													content += `\t${param.name}?: number;\n`;
													break;
												case "object":
													content += `\t${param.name}?: any;\n`;
													break;
												case "boolean":
													content += `\t${param.name}?: boolean;\n`;
													break;
												default:
													break;
											}
										}
									}
								});
								typeScriptString += `/**\n * ${methodItem.summary}\n * ${
									methodItem.description
								}\n * Route: ${path}\n * Method: ${httpMethod.toUpperCase()}\n */\nexport interface Api${
									methodItem.operationId
								}Request {${content.length ? "\n" : ""}${content}}\n\n`;
							}
						}
					} else {
						// For now only do routes with meta information set
						continue;
					}
				}
			}
		}
	}
	return typeScriptString.slice(0, typeScriptString.length - 1);
}
