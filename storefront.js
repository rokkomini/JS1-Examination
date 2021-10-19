const productWrapper = document.getElementById("productWrapper");

const fetchUrl = "https://mock-data-api.firebaseio.com/webb21/products.json";

let productData;

fetch(fetchUrl)
  .then((resp) => resp.json())
  .then((data) => {
    productData = data;
    renderProductList(data);
  });

const filterButton = document.getElementById("filterButton");

const inputValue = document.getElementById("inputValue");

const inputError = document.getElementById("inputError");

const inputMessage = document.getElementById("inputMessage");

function filterOnRating(products, ratingValue) {
  return products.filter(function (product) {
    return product.rating >= ratingValue;
  });
}

filterButton.addEventListener("click", () => {
  const ratingValue = Number(inputValue.value);

  const ratedItems = filterOnRating(productData, ratingValue);

  productWrapper.textContent = "";

  inputMessage.innerHTML = `Showing products rated ${inputValue.value} and higher`;

  return renderProductList(ratedItems);
});

function renderProductList(products) {
  products.forEach((product) => {
    const productDiv = document.createElement("div");

    const productName = document.createElement("h4");
    productName.innerHTML = product.name;

    const productImage = document.createElement("img");
    productImage.src = product.images[0].src.small;
    productImage.alt = product.images[0].alt;
    /*productImage.addEventListener("click", function (e) {
        e.preventDefault();

        customer.addToTransactions(product.name, product.price);

        customer.calculateTotalTransactionsSum();

        renderTotalSum();

        renderShoppingCart(product.name, product.price);

        // console.log(customer.totalTransactions);
        // console.log(customer.totalTransactionsSum);
      });*/

    const productDescription = document.createElement("p");
    productDescription.innerHTML = product.description;

    const productPrice = document.createElement("p");
    productPrice.innerHTML = `Price: ${product.price} kr`;

    const productRating = document.createElement("p");
    if (product.rating === undefined) {
      productRating.innerHTML = "No rating available";
    } else {
      productRating.innerHTML = `Customer rating: ${product.rating}`;
    }

    const productStock = document.createElement("p");
    productStock.innerHTML = `Left in stock: ${product.stock}`;

    const purchaseButton = document.createElement("button");
    purchaseButton.innerText = "Buy me!";
    purchaseButton.addEventListener("click", () => {
      //e.preventDefault();

      customer.addToTransactions(product.name, product.price);

      customer.calculateTotalTransactionsSum();

      renderTotalSum();

      renderShoppingCart(product.name, product.price);
    });

    const hrDiv = document.createElement("hr");
    const productInfoDiv = document.createElement("div");

    productInfoDiv.setAttribute("id", "info-block");

    productWrapper.append(productDiv);

    productDiv.appendChild(productName);
    productDiv.appendChild(productImage);
    productDiv.appendChild(productDescription);

    productDiv.append(productInfoDiv);
    productInfoDiv.appendChild(productPrice);
    productInfoDiv.appendChild(productRating);
    productInfoDiv.appendChild(productStock);

    productDiv.appendChild(purchaseButton);
    productDiv.appendChild(hrDiv);
  });

  class Customer {
    constructor() {
      this.totalTransactions = [];
      this.totalTransactionsSum = 0;
    }

    addToTransactions(product, price) {
      this.totalTransactions.push({ product, price });
    }

    calculateTotalTransactionsSum() {
      let totalSum = 0;

      this.totalTransactions.forEach((transaction) => {
        totalSum += transaction.price;
      });

      this.totalTransactionsSum = totalSum;
    }
  }
  const customer = new Customer();

  const shoppingDiv = document.getElementById("shoppingDiv");
  const shoppingCartHeader = document.getElementById("shoppingCartHeader");
  const shoppingTotal = document.getElementById("shoppingTotal");
  const shoppingCart = document.getElementById("shoppingCart");

  function renderTotalSum() {
    shoppingCartHeader.innerHTML = "Shopping Cart";

    shoppingTotal.innerHTML = `Shopping total: ${customer.totalTransactionsSum} kr`;
    shoppingDiv.appendChild(shoppingTotal);
  }

  function renderShoppingCart(product, price) {
    const transactionText = document.createElement("li");
    transactionText.innerText = `Product: ${product} | Price: ${price} kr`;

    shoppingCart.appendChild(transactionText);
  }
}
