let carts=document.querySelectorAll('.add-cart');
let products=[
  {
     name:"Hanna Herrera Hoodie",
     tag:"Front_Hoodie",
     price:40.00,
     inCart:0
  },
  {
     name:"Hanna Herrera Shirt",
     tag:"Front",
     price:35.00,
     inCart:0
  },
  {
     name:"Hanna Herrera Hoodie1",
     tag:"Back_Hoodie",
     price:55.00,
     inCart:0
  },
  {
     name:"Hanna Herrera Shirt1",
     tag:"Front",
     price:330.55,
     inCart:0
  },
  {
     name:"Hanna Herrera Hoodie2",
     tag:"Front_Hoodie",
     price:50.00,
     inCart:0
  },
  {
     name:"Hanna Herrera Hoodie3",
     tag:"Back_Hoodie",
     price:50.55,
     inCart:0
  }
];
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',() => {
      cartNumbers(products[i]);
      totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
  let productNumbers=localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.cart span').textContent=productNumbers;
  }
}
function cartNumbers(product){
  let productNumbers=localStorage.getItem('cartNumbers');

  productNumbers=parseInt(productNumbers);
  
  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers + 1);
    document.querySelector('.cart span').textContent=productNumbers + 1;
  }
  else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent=1;
  }
  setItems(product);
}
function setItems(product) {
  let cartItems=localStorage.getItem('productsInCart');
  cartItems=JSON.parse(cartItems);
 
  if(cartItems!=null){

    if(cartItems[product.tag]==undefined){
      cartItems={
        ...cartItems,
        [product.tag]:product
      }
    }
    cartItems[product.tag].inCart += 1;
  }
  else{
        product.inCart =1;
        cartItems={
        [product.tag]:product
        }
      }

  localStorage.setItem("productsInCart",JSON.stringify(cartItems));  // body...
}
function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');

    console.log("my cartCost is",cartCost);
    console.log(typeof cartCost);

    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+product.price);
    }
    else{
      localStorage.setItem("totalCost",product.price);
    }
}
function displayCart(){
  let cartItems=localStorage.getItem("productsInCart");
  cartItems=JSON.parse(cartItems);
  let productContainer=document.querySelector(".products");
  let cartCost=localStorage.getItem('totalCost');

  console.log(cartItems);
  if(cartItems && productContainer){
      productContainer.innerHTML='';
      Object.values(cartItems).map(item=>{
        productContainer.innerHTML +=`
          <div class="product">
            <i class="fas fa-times-circle closing"></i>
            <img src="img/Hanna/${item.tag}.jpg">
            <span>${item.name}</span>
          </div>
          <div class="price">$${item.price}</div>
          <div class="quantity">
            <i class="fas fa-arrow-circle-left arrow"></i>
            <span>${item.inCart}</span>
            <i class="fas fa-arrow-circle-right arrow"></i>
          </div>
          <div class="total">
              $${item.inCart*item.price}
          </div>
        `;
      });
      productContainer.innerHTML+=`
        <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">Basket Total </h4>
          <h4 class="basketTotal">$${cartCost} <i class="fas fa-shopping-basket"></i></h4>
        </div>
      `;
  }
}

onLoadCartNumbers();
displayCart();
/*--------------------------------------------------- quantity-------------------------------------*/
