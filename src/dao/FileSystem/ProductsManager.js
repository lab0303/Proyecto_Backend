const fs = require('fs');



class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
        this.datosPro = 'src/data/products.json';
    }
    
    addProduct =  async(item) =>{
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const productsArray = JSON.parse(data);
            let id = productsArray.length>0 ? productsArray[productsArray.length-1].id+1 : 1
            const newProduct = { id, ...item };
            productsArray.push(newProduct);  
            this.products= [...productsArray];
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
        }catch(err){
            console.log(err);
        }
        }

    addProductCarrito =  async(cid,pid) =>{
        const data = await fs.promises.readFile(this.datosPro, 'utf-8');
        const products = JSON.parse(data);
        const product = products.find(p=>p.id===pid)
        const data1 = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(data1);
        const cart = carts.find(p=>p.id===cid)
        const index = cart.productsCart.findIndex((element) =>{
            return pid === element.id;
        })
        try{
            if(!product){
                console.error(`el producto ${pid} no existe`)
                return
              }
              if(!cart){
                console.error(`el carrito ${cid} no existe`)
                return
              }
              if(index !== -1){
                cart.productsCart[index].quantity++
              }else{
                cart.productsCart.push({
                  id: pid,
                  quantity: 1
                })
              }
              await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        }catch(err){
             console.log(err);
        }
        }
    
    getProduct = async() =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const response = JSON.parse(data);
            return response;
            
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const response = JSON.parse(data);
            const result = response.filter((element) =>{
                return id === element.id;
            }
            )
            if(result.length !== 0){
                return result;
            }else{
                return 'No se encontro el producto';
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }
    
    updateProduct = async (id, obj) =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const response = JSON.parse(data);
            const index = response.findIndex((element) =>{
                return id === element.id;
            })
            this.products[index] = {...this.products[index], ...obj}
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t')); 
        } catch (error) {
            console.log(error);
            
        }
    }

    deleteProduct = async (id) =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const response = JSON.parse(data);
            const result = response.filter((element) =>{
                return id !== element.id;
            }
            )
            this.products = [...result];
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t')); 
        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports = ProductManager;