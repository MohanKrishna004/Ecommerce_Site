window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const title = document.getElementById('category-title');
  const productList = document.getElementById('product-list');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');

  if (category) {
    title.textContent = `Showing: ${category}`;
    showProducts(category);
  }

  priceRange.oninput = () => {
    priceValue.textContent = priceRange.value;
    showProducts(category, parseInt(priceRange.value));
  };

  function showProducts(category, maxPrice = 5000) {
    productList.innerHTML = '';
    const filtered = products.filter(p => p.category === category && p.price <= maxPrice);
    if (filtered.length === 0) {
      productList.innerHTML = `<p>No products found.</p>`;
      return;
    }
    filtered.forEach(p => {
      const card = `
  <div class="product-card">
    <img src="${p.image}" alt="${p.name}" />
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="addToCart(${p.id})">Add to Cart</button>
  </div>
`;
  
      productList.innerHTML += card;
    });
  }

  window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`\${product.name} added to cart`);
  }
};
