```javascript
// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}


// ===============================
// PRODUCT FILTER
// ===============================

document.querySelectorAll('.filter').forEach(button => {

  button.addEventListener('click', () => {

    document.querySelectorAll('.filter').forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    const filter = button.dataset.filter;

    document.querySelectorAll('.product-card').forEach(card => {

      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }

    });

  });

});


// ===============================
// ORDER VARIABLES
// ===============================

let selectedProduct = '';
let selectedPrice = 0;


// ===============================
// OPEN ORDER MODAL
// ===============================

function orderProduct(name, price) {

  selectedProduct = name;
  selectedPrice = Number(price);

  const productName =
    document.getElementById('orderProductName');

  const modal =
    document.getElementById('orderModal');

  const form =
    document.getElementById('orderForm');

  const quantity =
    document.getElementById('orderQuantity');

  if (productName) {
    productName.textContent = name;
  }

  if (form) {
    form.reset();
  }

  if (quantity) {
    quantity.value = 1;
  }

  if (modal) {
    modal.style.display = 'flex';
  }

  updateOrderTotal();
}


// ===============================
// CLOSE ORDER MODAL
// ===============================

function closeOrder() {

  const modal =
    document.getElementById('orderModal');

  if (modal) {
    modal.style.display = 'none';
  }

}


// ===============================
// DELIVERY CHARGE
// ===============================

const districtSelect =
  document.getElementById('customerDistrict');

const quantityInput =
  document.getElementById('orderQuantity');

if (districtSelect) {
  districtSelect.addEventListener(
    'change',
    updateOrderTotal
  );
}

if (quantityInput) {
  quantityInput.addEventListener(
    'input',
    updateOrderTotal
  );
}


// ===============================
// UPDATE ORDER TOTAL
// ===============================

function updateOrderTotal() {

  const quantity =
    Number(
      document.getElementById('orderQuantity')?.value
    ) || 1;

  const district =
    document.getElementById('customerDistrict')?.value || '';

  const subtotal =
    selectedPrice * quantity;

  // ঢাকা = 70 টাকা
  // অন্যান্য জেলা = 120 টাকা

  const delivery =
    district === 'ঢাকা' ? 70 : 120;

  const total =
    subtotal + delivery;


  const subtotalElement =
    document.getElementById('orderSubtotal');

  const deliveryElement =
    document.getElementById('deliveryCharge');

  const totalElement =
    document.getElementById('orderTotal');


  if (subtotalElement) {
    subtotalElement.textContent =
      `৳ ${subtotal.toLocaleString('bn-BD')}`;
  }

  if (deliveryElement) {
    deliveryElement.textContent =
      `৳ ${delivery.toLocaleString('bn-BD')}`;
  }

  if (totalElement) {
    totalElement.textContent =
      `৳ ${total.toLocaleString('bn-BD')}`;
  }

}


// ===============================
// ORDER CONFIRM
// ===============================

const orderForm =
  document.getElementById('orderForm');

if (orderForm) {

  orderForm.addEventListener(
    'submit',
    function(event) {

      event.preventDefault();


      // Customer Information

      const name =
        document.getElementById('customerName')
        .value
        .trim();

      const phone =
        document.getElementById('customerPhone')
        .value
        .trim();

      const district =
        document.getElementById('customerDistrict')
        .value;

      const address =
        document.getElementById('customerAddress')
        .value
        .trim();

      const quantity =
        Number(
          document.getElementById('orderQuantity')
          .value
        ) || 1;


      // Price Calculation

      const subtotal =
        selectedPrice * quantity;

      const delivery =
        district === 'ঢাকা' ? 70 : 120;

      const total =
        subtotal + delivery;


      // ===============================
      // WHATSAPP MESSAGE
      // ===============================

      const message =
`🛍️ Lavish Style - নতুন অর্ডার

━━━━━━━━━━━━━━━━━━
📦 অর্ডারের তথ্য
━━━━━━━━━━━━━━━━━━

পণ্য: ${selectedProduct}
পরিমাণ: ${quantity}

পণ্যের মূল্য: ৳ ${subtotal.toLocaleString('bn-BD')}
ডেলিভারি চার্জ: ৳ ${delivery.toLocaleString('bn-BD')}

💰 মোট: ৳ ${total.toLocaleString('bn-BD')}

━━━━━━━━━━━━━━━━━━
👤 কাস্টমারের তথ্য
━━━━━━━━━━━━━━━━━━

নাম: ${name}
মোবাইল: ${phone}
জেলা: ${district}
সম্পূর্ণ ঠিকানা: ${address}

💵 পেমেন্ট: Cash on Delivery

━━━━━━━━━━━━━━━━━━
Lavish Style
Premium Boutique Saree
━━━━━━━━━━━━━━━━━━`;


      // ===============================
      // YOUR WHATSAPP NUMBER
      // ===============================

      const whatsappNumber =
        '8801777249595';


      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


      // Open WhatsApp

      window.open(
        whatsappURL,
        '_blank'
      );


      // Close modal

      closeOrder();

    }
  );

}


// ===============================
// CURRENT YEAR
// ===============================

const yearElement =
  document.getElementById('year');

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


// ===============================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ===============================

const orderModal =
  document.getElementById('orderModal');

if (orderModal) {

  orderModal.addEventListener(
    'click',
    function(event) {

      if (event.target === orderModal) {
        closeOrder();
      }

    }
  );

}
```
