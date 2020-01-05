import template from "./template";

describe("test template", () => {
  it("should render template right", () => {
    const string1 = template("this is {name}", { name: "me" });
    const string2 = template("{test1} and {test2}", { test1: "You" });
    const string3 = template("{test1} and {test2}", {
      test1: "You",
      test2: "me"
    });
    const string4 = template("{test1} and {test2}", { test: "You" });

    expect(string1).toBe("this is me");
    expect(string2).toBe("You and {test2}");
    expect(string3).toBe("You and me");
    expect(string4).toBe("{test1} and {test2}");
  });
});
