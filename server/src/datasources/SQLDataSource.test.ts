import {createSelectionMap} from "./SQLDataSource";

describe("createSelectionMap()", () => {
    it("convert selection field to its snake case", () => {
        expect(createSelectionMap(["myField", "id"])).toEqual({myField: "my_field", id: "id"});
    })
    it("allow use relation foreign keys", () => {
        expect(createSelectionMap(["author", "id"], {author: "authorId"})).toEqual({authorId: "author_id", id: "id"});
    })
})
