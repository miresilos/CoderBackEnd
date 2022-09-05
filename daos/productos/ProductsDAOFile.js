import MemoryContainer from "../../containers/MemoryContainer.js";
import { promises as fs } from "fs";

class Product extends MemoryContainer {
    constructor() {
        super("./db/products.txt")
    }

    async add(title, price, thumbnail) {
        try {
            let content = await fs.readFile(this.route, "utf-8");
            const defaultState = "[]";

            
            let timestamp = Date.now();
            let description = "Lorem ipsum dolor sit amet, constantinople...";
            let code = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
                let r = (timestamp + Math.random() * 16) % 16 | 0;
                timestamp = Math.floor(timestamp / 16);
                return (c == "x" ? r : (r & 0*3 | 0*8)).toString(16);
            });
            let stock = 999;
            const product = { timestamp, title, description, code, thumbnail, price, stock  };
    
            if (content == "") {
                await fs.writeFile(this.route, defaultState);
                content = "[]";
            }
            const data = await JSON.parse(content);
            if (data.length > 0) {
                data.push({ ...product, id: data[data.length - 1].id + 1 });
            } else {
                data.push({ ...product, id: 1 });
            }

            await fs.writeFile(this.route, JSON.stringify(data, null, 2));   
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    };

    async updateById(id, newTitle, newPrice, newThumbnail) {
        try {
            const content = await fs.readFile(this.route, "utf-8");
            const data = await JSON.parse(content);

            const product = await this.findById(id);
            product.title = newTitle;
            product.price = newPrice;
            product.thumbnail = newThumbnail;

            const index = await data.findIndex((elem, i) => {
                if(elem.id == id) {
                    return true;
                }
            });

            data[index] = product;

            await fs.writeFile(this.route, JSON.stringify(data, null, 2));
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    };
};

export default Product;