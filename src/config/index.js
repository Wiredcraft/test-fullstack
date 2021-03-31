const EnvType = {
    Local: "Local",
    Develop: "Develop",
    Product: "Product"
}

let env = EnvType.Product;
let Config = {
    Api: {
        Base:"http://localhost:55556/",
        GetHackerNews:"HackerNews/GetHackerNews",
        AddHackerNews:"HackerNews/AddHackerNews",
    }
};
export default Config;