const socket = io();

const formProducts = document.getElementById('form-products');
const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const thumbnail = document.getElementById('thumbnail');
const code = document.getElementById('code');
const stock = document.getElementById('stock');
const category = document.getElementById('category');

socket.on('products', (products) => {
  console.log(products);
  const productList = document.getElementById('products-list');
  productList.innerHTML = `
  ${products
    .map(
      (product) => `
      <div class='col-sm-6 mb-3 mb-sm-0'>
        <div class='card'>
          <img src='${product.thumbnail}' class='card-img-top' alt='${product.title}' />
          <div class='card-body'>
            <h5 class='card-title'>Title: ${product.title}</h5>
            <p class='card-text'>Description: ${product.description}</p>
          </div>
          <ul class='list-group list-group-flush'>
            <li class='list-group-item'>ID: ${product.id}</li>
            <li class='list-group-item'>Price: $ ${product.price}</li>
            <li class='list-group-item'>Code: ${product.code}</li>
            <li class='list-group-item'>Stock: ${product.stock}</li>
            <li class='list-group-item'>Category: ${product.category}</li>
          </ul>
          <div class='card-body'>
            <button type="button" class="btn btn-danger " onclick="deleteProduct(${product.id})">Eliminar</button>
          </div>
        </div>
      </div>
`
    )
    .join('')}`;
});

formProducts.addEventListener('submit', (e) => {
  e.preventDefault();
  const newProduct = {
    title: title.value,
    description: description.value,
    price: price.value,
    thumbnail: thumbnail.value,
    code: code.value,
    stock: stock.value,
    category: category.value,
  };
  socket.emit('new-product', newProduct);
});

function deleteProduct(productId) {
  socket.emit('delete-product', productId);
}
