import fs from "fs"

export class ProducManagerFiles {
    constructor(path) {
        this.pathFile = path
        this.products = []
    }

    fileExist() {
        return fs.existsSync(this.pathFile)
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                return console.log("All fields are required")
            }
            const codeExist = this.#validateCode(code)
            if (codeExist) {
                console.log("Product already exist")
            } else {
                const product = {
                    id: this.#createId(),
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
                this.products.push(product)
                const productsString = JSON.stringify(this.products, null, 2);
                await fs.promises.writeFile(this.path, productsString);
                console.log("Product added successfully")
            }
        } catch (error) {
            console.log("error", error.message)
        }
    }

    async getProducts() {
        try {
            if (this.fileExist()) {
                const contenidoString = await fs.promises.readFile(this.pathFile, "utf-8")
                const products = JSON.parse(contenidoString)
                return products
            } else {
                throw new Error("No se pudieron obtener los productos")
            }
        } catch (error) {
            throw error
        }
    }


    async getProductById(id) {
        try {

            const product = await this.getProducts()
            const productFound = product.find(prod => prod.id == id)

            if (productFound) {
                return productFound
            } else {
                return "Product not found"
            }
        } catch (error) {
            console.log("error", error.message)
        }
    }

    async updateProduct(id, product) {
        try {
            await this.getProducts()
            let productIndex = this.products.findIndex(prod => prod.id == id)
            if (productIndex === -1) {
                return console.log("Product not found")
            }
            if (product.id) {
                return console.log("Cannot modify id field")
            }
            this.products[productIndex] = { ...this.products[productIndex], ...product }
            const productsString = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, productsString);
            return console.log("Product updated successfully");
        } catch (error) {
            console.log("error", error.message)
        }
    }

    async deleteProducts(id) {
        try {
            await this.getProducts()
            let productIndex = this.products.findIndex(prod => prod.id == id)
            if (productIndex === -1) {
                return console.log("Product not found")
            }
            this.products.splice(productIndex, 1)
            const productsString = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, productsString);
            return console.log("Product deleted successfully");
        } catch (error) {
            console.log("error", error.message)
        }
    }
    #createId() {
        let id =
            this.products.length === 0
                ? 1
                : this.products[this.products.length - 1].id + 1
        return id
    }

    #validateCode(code) {
        return this.products.find(product => product.code === code)
    }
}

