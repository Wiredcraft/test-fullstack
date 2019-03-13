export default (input, schema) => {
  const entities = {};

  const visit = (input, schema, entities) => {
    if (Array.isArray(input)) {
      return input.map(value => visit(value, schema, entities));
    }

    if (schema.nestedString)
      for (let key in schema.nestedString)
        if (key in input) {
          const value = input[key];
          const valueSchema = schema.nestedString[key];

          if (!(valueSchema.key in entities)) {
            entities[valueSchema.key] = {};
          }

          const dest = entities[valueSchema.key];
          const idName = valueSchema.idName || "id";

          if (Array.isArray(value)) {
            value.forEach(v => {
              if (!(v in dest)) {
                dest[v] = { [idName]: v };
              }
            });
          }

          if (!(value in dest)) {
            dest[value] = { [idName]: value };
          }
        }

    if (schema.nested)
      for (let key in schema.nested)
        if (key in input) {
          const nested = input[key];
          input[key] = visit(nested, schema.nested[key], entities);
        }

    if (schema.key) {
      const entity = { ...input };

      if (!(schema.key in entities)) {
        entities[schema.key] = {};
      }

      const idName = schema.idName || "id";
      const id = entity[idName];

      if (id in entities[schema.key]) {
        entities[schema.key][id] = {
          ...entities[schema.key][id],
          ...entity
        };
      } else {
        entities[schema.key][id] = entity;
      }
    }

    if (!schema.key) return input;

    return input[schema.idName || "id"];
  };

  return { result: visit(input, schema, entities), entities };
};

export const denormalize = (entity, schema, entities) => {
  const unvisit = (entity, schema, parentSchema) => {
    if (Array.isArray(entity)) {
      return entity.map(value => unvisit(value, schema, parentSchema));
    }

    let result;
    let mutated = false;

    if (typeof entity === "string" || typeof entity === "number") {
      result = entities[schema.key][entity];
    } else {
      result = entity;
    }

    if (schema !== parentSchema && schema.nested)
      for (let key in schema.nested)
        if (key in result) {
          if (!mutated) {
            result = { ...result };
            mutated = true;
          }
          result[key] = unvisit(result[key], schema.nested[key], schema);
        }

    return result;
  };

  return unvisit(entity, schema, null);
};
