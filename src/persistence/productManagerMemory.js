export class ProductManagerMemory {
    constructor() {
        this.products = []
    }

    getProducts(){
     return   console.log(this.products)
    }
    addProduct(title, description,price,thumbnail,code,stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log("Todos los campos son obligatorios")
        }else{
            const codeExist=this.#validateCode(code)
            if (codeExist) {
                 console.log("El producto ya existe")
        }else{
        const product = {
            id:this.#createId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(product)
        console.log("Producto agregado")
    }
}
    }

    getProductById(idProduct){
        const productFound= this.#validateId(idProduct)
        if(productFound){
            console.log(productFound)
        }else{
            console.log("Producto no encontrado")
        }
    }

    updateProduct(id, product) {
         this.getProducts()
            let productIndex = this.products.findIndex(prod => prod.id == id)
            if (productIndex === -1) {
                return console.log("Product not found")
            }
            if (product.id) {
                return console.log("Cannot modify id field")
            }
            this.products[productIndex] = { ...this.products[productIndex], ...product }
            return console.log("Product updated successfully");
        
    }

    deleteProducts(id) {
         this.getProducts()
            let productIndex = this.products.findIndex(prod => prod.id == id)
            if (productIndex === -1) {
                return console.log("Product not found")
            }
            this.products.splice(productIndex, 1)
            return console.log("Product deleted successfully");
        }


    #createId(){
        let id=
        this.products.length===0
        ?1
        :this.products[this.products.length -1].id+1
        return id
    }

    #validateId(id){
        return this.products.find(product=> product.id===id)
    }

    #validateCode(code){
        return this.products.find(product=>product.code===code)
    }
}

