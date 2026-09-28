/* =====================================================
   LAVISH STYLE
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ===================================================
     MOBILE MENU
  =================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
      });

    });
  }


  /* ===================================================
     COLLECTION FILTER
  =================================================== */

  const filterButtons = document.querySelectorAll(".filter");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const selectedFilter = button.getAttribute("data-filter");

      productCards.forEach(function (card) {

        const category = card.getAttribute("data-category");

        if (
          selectedFilter === "all" ||
          category === selectedFilter
        ) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }

      });

    });

  });


  /* ===================================================
     ORDER VARIABLES
  =================================================== */

  let selectedProduct = "";
  let selectedPrice = 0;


  /* ===================================================
     ORDER ELEMENTS
  =================================================== */

  const orderModal = document.getElementById("orderModal");
  const orderForm = document.getElementById("orderForm");

  const orderProductName =
    document.getElementById("orderProductName");

  const customerName =
    document.getElementById("customerName");

  const customerPhone =
    document.getElementById("customerPhone");

  const district =
    document.getElementById("district");

  const customerAddress =
    document.getElementById("customerAddress");

  const quantityInput =
    document.getElementById("quantity");

  const qtyMinus =
    document.getElementById("qtyMinus");

  const qtyPlus =
    document.getElementById("qtyPlus");

  const subtotalElement =
    document.getElementById("subtotal");

  const deliveryElement =
    document.getElementById("deliveryCharge");

  const totalElement =
    document.getElementById("totalPrice");


  /* ===================================================
     OPEN ORDER MODAL
  =================================================== */

  window.orderProduct = function (productName, price) {

    selectedProduct = productName;
    selectedPrice = Number(price);

    if (orderProductName) {
      orderProductName.textContent = selectedProduct;
    }

    if (orderForm) {
      orderForm.reset();
    }

    if (quantityInput) {
      quantityInput.value = 1;
    }

    updateOrderTotal();

    if (orderModal) {

      orderModal.classList.add("show");
      orderModal.setAttribute("aria-hidden", "false");

      document.body.classList.add("modal-open");

      setTimeout(function () {

        if (customerName) {
          customerName.focus();
        }

      }, 100);

    }

  };


  /* ===================================================
     CLOSE ORDER MODAL
  =================================================== */

  window.closeOrder = function () {

    if (orderModal) {

      orderModal.classList.remove("show");

      orderModal.setAttribute("aria-hidden", "true");

      document.body.classList.remove("modal-open");

    }

  };


  /* ===================================================
     DELIVERY + TOTAL CALCULATION
  =================================================== */

  function updateOrderTotal() {

    const quantity =
      Number(quantityInput ? quantityInput.value : 1) || 1;

    const subtotal =
      selectedPrice * quantity;

    let delivery = 0;

    /*
      ঢাকা = ৳70
      অন্যান্য জেলা = ৳120
      জেলা নির্বাচন না করলে = ৳0
    */

    if (district && district.value === "ঢাকা") {

      delivery = 70;

    } else if (district && district.value !== "") {

      delivery = 120;

    }

    const total =
      subtotal + delivery;


    if (subtotalElement) {
      subtotalElement.textContent =
        "৳ " + subtotal.toLocaleString("bn-BD");
    }

    if (deliveryElement) {
      deliveryElement.textContent =
        "৳ " + delivery.toLocaleString("bn-BD");
    }

    if (totalElement) {
      totalElement.textContent =
        "৳ " + total.toLocaleString("bn-BD");
    }

  }


  /* ===================================================
     DISTRICT CHANGE
  =================================================== */

  if (district) {

    district.addEventListener("change", function () {
      updateOrderTotal();
    });

  }


  /* ===================================================
     QUANTITY PLUS
  =================================================== */

  if (qtyPlus) {

    qtyPlus.addEventListener("click", function () {

      let quantity =
        Number(quantityInput.value) || 1;

      if (quantity < 20) {
        quantity++;
      }

      quantityInput.value = quantity;

      updateOrderTotal();

    });

  }


  /* ===================================================
     QUANTITY MINUS
  =================================================== */

  if (qtyMinus) {

    qtyMinus.addEventListener("click", function () {

      let quantity =
        Number(quantityInput.value) || 1;

      if (quantity > 1) {
        quantity--;
      }

      quantityInput.value = quantity;

      updateOrderTotal();

    });

  }


  /* ===================================================
     PHONE NUMBER VALIDATION
  =================================================== */

  if (customerPhone) {

    customerPhone.addEventListener("input", function () {

      this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 11);

    });

  }


  /* ===================================================
     ORDER FORM SUBMIT
  =================================================== */

  if (orderForm) {

    orderForm.addEventListener("submit", function (event) {

      event.preventDefault();


      /* -----------------------------------------------
         GET CUSTOMER INFORMATION
      ------------------------------------------------ */

      const name =
        customerName.value.trim();

      const phone =
        customerPhone.value.trim();

      const selectedDistrict =
        district.value;

      const address =
        customerAddress.value.trim();

      const quantity =
        Number(quantityInput.value) || 1;


      /* -----------------------------------------------
         BASIC VALIDATION
      ------------------------------------------------ */

      if (!name) {

        alert("অনুগ্রহ করে আপনার নাম লিখুন।");

        customerName.focus();

        return;
      }


      if (!/^01\d{9}$/.test(phone)) {

        alert(
          "সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।\nউদাহরণ: 017XXXXXXXX"
        );

        customerPhone.focus();

        return;
      }


      if (!selectedDistrict) {

        alert("অনুগ্রহ করে আপনার জেলা নির্বাচন করুন।");

        district.focus();

        return;
      }


      if (!address) {

        alert("অনুগ্রহ করে আপনার সম্পূর্ণ ঠিকানা লিখুন।");

        customerAddress.focus();

        return;
      }


      /* -----------------------------------------------
         CALCULATE PRICE
      ------------------------------------------------ */

      const subtotal =
        selectedPrice * quantity;

      let delivery = 0;

      if (selectedDistrict === "ঢাকা") {

        delivery = 70;

      } else {

        delivery = 120;

      }

      const total =
        subtotal + delivery;


      /* -----------------------------------------------
         WHATSAPP MESSAGE
      ------------------------------------------------ */

      const whatsappNumber =
        "8801777249595";


      const message =
`🌸 *LAVISH STYLE - NEW ORDER* 🌸

🛍️ *পণ্যের তথ্য*
━━━━━━━━━━━━━━━━
পণ্য: ${selectedProduct}
পরিমাণ: ${quantity}

💰 *মূল্যের তথ্য*
━━━━━━━━━━━━━━━━
পণ্যের মূল্য: ৳${subtotal}
ডেলিভারি চার্জ: ৳${delivery}
সর্বমোট: ৳${total}

👤 *কাস্টমারের তথ্য*
━━━━━━━━━━━━━━━━
নাম: ${name}
মোবাইল: ${phone}
জেলা: ${selectedDistrict}
ঠিকানা: ${address}

💵 পেমেন্ট: Cash on Delivery

ধন্যবাদ Lavish Style থেকে অর্ডার করার জন্য। ❤️`;


      /* -----------------------------------------------
         CREATE WHATSAPP URL
      ------------------------------------------------ */

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


      /* -----------------------------------------------
         OPEN WHATSAPP
      ------------------------------------------------ */

      window.open(
        whatsappURL,
        "_blank"
      );


      /* -----------------------------------------------
         CLOSE MODAL
      ------------------------------------------------ */

      setTimeout(function () {

        closeOrder();

      }, 300);

    });

  }


  /* ===================================================
     ESC KEY - CLOSE MODAL
  =================================================== */

  document.addEventListener("keydown", function (event) {

    if (
      event.key === "Escape" &&
      orderModal &&
      orderModal.classList.contains("show")
    ) {

      closeOrder();

    }

  });


  /* ===================================================
     CURRENT YEAR
  =================================================== */

  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* ===================================================
     INITIAL TOTAL
  =================================================== */

  updateOrderTotal();

});
