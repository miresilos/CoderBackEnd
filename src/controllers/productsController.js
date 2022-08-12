const data = [];
let id = 0;

const list = () => {
    return data;
};

const findOneById = (id) => {
    return data.find((product) => product.id == id)
};

const add = (title, price, thumbnail) => {
    let timestamp = Date.now();
    let description = "Lorem ipsum dolor sit amet, constantinople...";
    let code = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        let r = (timestamp + Math.random() * 16) % 16 | 0;
        timestamp = Math.floor(timestamp / 16);
        return (c == "x" ? r : (r & 0*3 | 0*8)).toString(16);
    });
    let stock = 999;
    const product = { id: ++id, timestamp, title, description, code, thumbnail, price, stock  };
    data.push(product);
    return product;
};

const deleteById = (id) => {
    data.forEach((product, i) => {
        if (product.id == id) data.splice(i, 1);
    });
};

const updateById = (id, newTitle, newPrice, newThumbnail) => {
    const product = findOneById(id);
    product.title = newTitle;
    product.price = newPrice;
    product.thumbnail = newThumbnail;
};

module.exports = { add, list, findOneById, deleteById, updateById };

const products = [
    {
        title: "Lápiz",
        price: 60,
        thumbnail: "asd"
      },
      {
        title: "Libro",
        price: 600,
        thumbnail: "asddas"
      },
      {
        title: "Algo bonito",
        price: 200,
        thumbnail: "adfadsddas"
      }
];

for (let i = 0; i < products.length; i++) {
    module.exports.add(products[i].title, products[i].price, products[i].thumbnail);
};