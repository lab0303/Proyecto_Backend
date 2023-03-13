const fs = require('fs');

class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
        this.id = 1;
    }
    
    addProduct =  async(item) =>{
        try{
            this.products.push({id:this.id,...item});
            this.id++;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));    
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