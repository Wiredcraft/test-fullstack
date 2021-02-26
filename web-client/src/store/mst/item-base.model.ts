import { types } from "mobx-state-tree";

/**
 * shared props and views for all feedy-models
 */
export const ItemBaseModel = types.model("ItemDaBase", {
  id: types.identifier,
  updatedAt: types.Date,
  createdAt: types.Date,
  // deleted: types.boolean,
});
