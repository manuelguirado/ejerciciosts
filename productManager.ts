class productManager {
    private products : { name: string, price: number, category: string }[] = [];
    constructor() {
        this.products =  [];

    }
    addProduct(name : string, price : number, category : string) {
      for ( let i = 0; i < this.products.length; i++) {
        if (this.products[i].name === name) {
          console.log("Product already exists");
          return;
        }
      }
        this.products.push({name, price, category});

    }
    removeProduct(name : String){
        for ( let i =0; i < this.products.length; i++){
            if (this.products[i].name === name){
                this.products.splice(i, 1);
                console.log("Product removed");
            }
        }
    }
    getProductsByCategory(category : string){
        for ( let i =0; i < this.products.length; i++){
            if (this.products[i].category === category){
                console.log(this.products[i]);
            }
        }

    }
    getCheapestProduct(){
        let cheapestProudct = this.products[0];
        for ( let i  = 0; i< this.products.length; i++){
            if ( this.products[i].price < cheapestProudct.price){
                cheapestProudct = this.products[i];
                console.log(cheapestProudct);
            }
        }
    }

}
let productManager1 = new productManager();
productManager1.addProduct("apple", 1, "fruit");
productManager1.addProduct("banana", 2, "fruit");
productManager1.addProduct("orange", 3, "fruit");
productManager1.addProduct("apple", 1, "fruit");
productManager1.removeProduct("banana");
productManager1.getProductsByCategory("fruit");
productManager1.getCheapestProduct();