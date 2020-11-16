import SelectionTree from "./SelectionTree";

describe("SelectionTree", () => {
    describe("empty()", () => {
        it("should return true when selection tree is empty", () => {
            const tree = new SelectionTree([]);
            expect(tree.empty()).toBe(true);
        })
        it("should return false when selection tree is not empty", () => {
            const tree = new SelectionTree(["id"]);
            expect(tree.empty()).toBe(false);
        })
    })

    describe("selected()", () => {
        it("should checks selection tree has select specified root field", () => {
            const tree = new SelectionTree(["id"]);
            expect(tree.selected("id")).toBe(true);
            expect(tree.selected("title")).toBeFalsy();
        })
    })

    describe("fields()", () => {
        it("should return root selection fields", () => {
            const tree = new SelectionTree(["id", "title", "author"]);
            expect(tree.fields().sort()).toEqual(["id", "title", "author"].sort());
        })
        it("should remove duplicated items when construction", () => {
            const tree = new SelectionTree(["id", "id", "title", "author"]);
            expect(tree.fields().sort()).toEqual(["id", "title", "author"].sort());
        })
    })

    describe("subtree()", () => {
        it("should return the sub selection tree with specified name", () => {
            const tree = new SelectionTree(["id", "title", "author"], {user: new SelectionTree(["id", "name"])});
            expect(tree.subtree("user")).toBeDefined();
            expect(tree.subtree("user").fields().sort()).toEqual(["id", "name"].sort());
        })
    })
})
