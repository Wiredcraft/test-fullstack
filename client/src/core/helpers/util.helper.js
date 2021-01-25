// Universal Helper
export const mapTime = timestamp => {
  const seconds = Math.floor((new Date() - timestamp * 1000) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years`;
  }
  interval = Math.floor(seconds / 2592000);

  if (interval > 1) {
    return `${interval} months`;
  }
  interval = Math.floor(seconds / 86400);

  if (interval > 1) {
    return `${interval} days`;
  }
  interval = Math.floor(seconds / 3600);

  if (interval > 1) {
    return `${interval} hours`;
  }
  interval = Math.floor(seconds / 60);

  if (interval > 1) {
    return `${interval} minutes`;
  }

  return `${Math.floor(seconds)} seconds`;
};

// Reducer Helper
function arrayWithItems(array) {
  if (!array) return false;
  if (array.constructor !== Array) return false;

  return (array.length > 0);
}

export function getItemById(list, id) {
  if (!arrayWithItems(list)) return null;
  if (!id) return null;

  const itemsById = list
    .filter(item => id === item.cuid);
  const itemById = arrayWithItems(itemsById) ? itemsById[0] : null;

  return { ...itemById };
};


export function getListWithItem(list, item, filters = null) {
  if (!arrayWithItems(list)) return null;
  if (!item) return [ ...list ];

  const newItem = list
    .every(existingItem => item.cuid !== existingItem.cuid);

  if (newItem) return [ ...list, { ...item } ];
  list.map(existingItem => item.cuid === existingItem.cuid ? item : existingItem);
  
  return [ ...list ];
};