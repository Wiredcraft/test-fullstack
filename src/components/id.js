let lastId = 0;

/**
 * Generate a number ID, this is for client side only
 * and it's only memory-level unique.
 */
export const newId = (prefix = 'id') => `${prefix}${lastId++}`;
