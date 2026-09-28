const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
    });
  });
});

let selectedProduct = "";
let selectedPrice = 0;
function orderProduct(name, price) {
  selectedProduct = name;
  selectedPrice = Number(price);

  document.getElementById('orderProductName').textContent = name;
  document.getElementById('orderModal').style.display = 'flex';

  updateOrderTotal();
}
document.getElementById('customerDistrict').addEventListener('change', updateOrderTotal);

document.getElementById('orderQuantity').addEventListener('input', updateOrderTotal);

function closeOrder() {
  document.getElementById('orderModal').style.display = 'none';
}
document.getElementById('year').textContent = new Date().getFullYear();
function updateOrderTotal() {
  const quantity = Number(document.getElementById('orderQuantity').value) || 1;
  const district = document.getElementById('customerDistrict').value;

  const subtotal = selectedPrice * quantity;
  const delivery = district === 'ঢাকা' ? 70 : 120;
  const total = subtotal + delivery;

  document.getElementById('orderSubtotal').textContent = `৳ ${subtotal.toLocaleString('bn-BD')}`;
  document.getElementById('deliveryCharge').textContent = `৳ ${delivery.toLocaleString('bn-BD')}`;
  document.getElementById('orderTotal').textContent = `৳ ${total.toLocaleString('bn-BD')}`;
}
