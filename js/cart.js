
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));

      // Get existing cart from localStorage or create empty array
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if product already exists in cart
      const existingProduct = cart.find(item => item.name === name);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product exists
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} added to cart`);
    });
  });



  function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    if (!cart || cart.length === 0) {
      cartItems.innerHTML = `<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>`;
      document.getElementById('grand-total').innerText = "0.00";
      return;
    }

    let grandTotal = 0;
    cart.forEach((item, index) => {
      const total = item.price * item.quantity;
      grandTotal += total;

      cartItems.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="form-control quantity-input" style="width:80px;"></td>
          <td>$${total.toFixed(2)}</td>
          <td><button class="btn btn-remove" data-index="${index}">Remove</button></td>
        </tr>
      `;
    });

    document.getElementById('grand-total').innerText = grandTotal.toFixed(2);

    // Quantity change
    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const index = e.target.getAttribute('data-index');
        cart[index].quantity = parseInt(e.target.value);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    // Remove item
    document.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();
