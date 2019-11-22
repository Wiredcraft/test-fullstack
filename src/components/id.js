let lastId = 0;

export const newId = (prefix = 'id') => `${prefix}${lastId++}`;
