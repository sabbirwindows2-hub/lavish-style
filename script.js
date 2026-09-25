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

function orderProduct(name, price) {
  const message = `আসসালামু আলাইকুম, আমি "${name}" অর্ডার করতে চাই। দাম: ৳ ${price}।`;
  window.open(`https://wa.me/8801777249595?text=${encodeURIComponent(message)}`, '_blank');
}

document.getElementById('year').textContent = new Date().getFullYear();
