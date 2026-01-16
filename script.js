const PRODUCTS_URL = 'products.json';

let products = [];
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

const productsEl = document.getElementById('products');
const cartCountEl = document.getElementById('cartCount');
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); updateCartUI(); }

function updateCartUI(){
  const totalCount = cart.reduce((s,i)=>s + i.qty, 0);
  cartCountEl.textContent = totalCount;
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    const product = products.find(p=>p.id === item.id);
    if(!product) return;
    const row = document.createElement('div'); row.className = 'cart-item';
    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="meta">
        <div class="name">${product.name}</div>
        <div class="muted">$${product.price.toFixed(2)} × ${item.qty}</div>
      </div>
      <div class="qty-controls">
        <button data-id="${item.id}" class="add">+</button>
        <button data-id="${item.id}" class="remove">-</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
    total += product.price * item.qty;
  });
  cartTotalEl.textContent = total.toFixed(2);

  cartItemsEl.querySelectorAll('.add').forEach(btn=>btn.onclick = e=>{
    const id = e.target.dataset.id; changeQty(id, 1);
  });
  cartItemsEl.querySelectorAll('.remove').forEach(btn=>btn.onclick = e=>{
    const id = e.target.dataset.id; changeQty(id, -1);
  });
}

function changeQty(id, delta){
  const idx = cart.findIndex(c=>c.id === id);
  if(idx === -1 && delta>0) cart.push({id, qty:1});
  else {
    cart[idx].qty += delta;
    if(cart[idx].qty <= 0) cart.splice(idx,1);
  }
  saveCart();
}

function addToCart(id){
  const idx = cart.findIndex(c=>c.id === id);
  if(idx === -1) cart.push({id, qty:1});
  else cart[idx].qty++;
  saveCart();
}

function renderProducts(){
  productsEl.innerHTML = '';
  products.forEach(p=>{
    const el = document.createElement('div'); el.className = 'card';
    el.innerHTML = `
      <div class="card-inner">
        <div class="card-figure">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="card-desc">${p.description}</div>
          <div class="card-row">
            <div class="price">$${p.price.toFixed(2)}</div>
            <button class="primary" data-id="${p.id}">Add</button>
          </div>
        </div>
      </div>
    `;
    productsEl.appendChild(el);
  });
  productsEl.querySelectorAll('button.primary').forEach(btn=>{
    btn.onclick = e => addToCart(e.target.dataset.id);
  });
}

async function load(){
  try {
    const res = await fetch(PRODUCTS_URL);
    products = await res.json();
  } catch (err) {
    console.error('Failed loading products.json', err);
    products = [];
  }
  renderProducts();
  updateCartUI();
}

cartButton.onclick = ()=>cartModal.classList.remove('hidden');
closeCart.onclick = ()=>cartModal.classList.add('hidden');
checkoutBtn.onclick = ()=> {
  // Placeholder: replace with Stripe / PayPal in a later step.
  if(cart.length === 0){
    alert('Your cart is empty.');
    return;
  }
  alert('Checkout placeholder — implement Stripe Checkout or a backend to handle orders.');
};

load();
window.addEventListener('storage', ()=>{ cart = JSON.parse(localStorage.getItem('cart')||'[]'); updateCartUI(); });