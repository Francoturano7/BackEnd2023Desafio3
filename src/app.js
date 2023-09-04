import express from "express";
import { ProducManagerFiles } from "./persistence/productManagerFiles.js";

const managerProductService=new ProducManagerFiles("./src/persistence/files/products.json")
console.log(managerProductService)

const port=8080

const app=express()

app.listen(port,()=>console.log(`Server running on port ${port}`))

app.get("/products", async(req,res)=>{
    try {
        const limit= parseInt (req.query.limit)
        const products= await managerProductService.getProducts()
        if(limit){
            const productsLimit=products.slice(0,limit)
            res.send(productsLimit)
        }else{
            res.send(products)
        }
        
    } catch (error) {
        res.send(error.menssage)
    }
})

app.get("/products/:pid",async(req,res)=>{
    try {
        const id=parseInt(req.params.pid)
        const product = await managerProductService.getProductById(id)
        res.send(product)
    } catch (error) {
        
    }
})