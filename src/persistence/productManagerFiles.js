import fs from "fs"

export class ProducManagerFiles {
    constructor(path) {
        this.path = path
        this.products = []
    }
    
loadDB = async () => {
         
    if (fs.existsSync(this.path)) {
        const productsString = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(productsString);
        this.products = products;
       
    }
}
async getProducts() {
    try {
        await this.loadDB()
    //  console.log(this.products)
        return this.products;
    } catch (error) {
        console.log(error);
    }
}
async getProductById(idProduct) {
    try{
        const product = await this.getProducts()
        const productFound=product.find(prod => prod.id == idProduct)
        if (productFound) {
            console.log(productFound)
        } else {
            console.log("Product not found")
        }
    } catch (error) {
        console.log("error", error.message)
    }
    
      
}
async addProduct(product) {
    try {
        const { title, description, price, thumbnail, code, stock } = product
        const products = await this.getProducts()
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return "All fields are required"
        }
        if (products.some(prod => prod.code == code)) {
            return "Invalid product duplicate code"
        }
        this.products.push({
            id:this.#createId(),
            ...product,
        })
        const productsString = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, productsString);
        return "Product added successfully";
    } catch (error) {
        console.log(error);
    }

    
}
async updateProduct(id, product) {
    try {
        await this.getProducts()
        let productIndex =this.products.findIndex(prod=> prod.id == id)
        if (productIndex === -1) {
            return console.log("Product not found")
        }
        if (product.id) {
            return console.log("Cannot modify id field")
        }
      
       this.products[productIndex]= { ...this.products[productIndex], ...product }
          
        const productsString = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, productsString);
        return console.log("Product updated successfully");

    } catch (error) {
        console.log("error", error.message)
    }
}
async deleteProducts(id) {
    try {
        const products = await this.getProducts()
        let productIndex =this.products.findIndex(prod=> prod.id == id)
        if (productIndex ===-1) {
            return "Product not found"
        }

        this.products.splice(productIndex,1)

    const productsString = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, productsString);
        return "Product deleted successfully";

    } catch (error) {
        console.log(error);
    }
}

 #createId() {
            let id =
                this.products.length === 0
                    ? 1
                    : this.products[this.products.length - 1].id + 1
            return id
        }

}

const operations = async () => {
    try {
        const manager = new ProducManagerFiles("./src/persistence/files/products.json")
        const products = await manager.getProducts()
      //  console.log(products)
      //await manager.addProduct({"title": "Iphone 13","description": "Celular","price": 950,"thumbnail": "./iphone","code": "101","stock": 82})
      // await manager.addProduct({ "title": "MacBook Pro","description": "PC","price": 2600,"thumbnail": "./pc","code": "103","stock":40})
      //  await manager.addProduct({"title": "Ipad Mini","description": "Tablet","price": 1600,"thumbnail": "./tablet","code": "102","stock": 65})
      //await manager.addProduct({"title": "Iphone14","description": "Celular","price": 1050,"thumbnail": "./iphone14","code": "1014","stock": 824})
        // console.log(products)

        //  await manager.getProducts()
        // await manager.getProductById(2)
        // await manager.getProductById(8)

       //  await manager.updateProduct(2,{price:2800,stock:75 })

         // await manager.deleteProducts(4)

    } catch (error) {
        console.log("error", error.message)
    }
}

operations()