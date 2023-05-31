function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex >= 0) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`Товар "${name}" добавлен в корзину!`);

    updateCartCount();

    let cartTableBody = document.getElementById('cart-table-body');
    if (cartTableBody !== null) {
        let itemRow = cartTableBody.insertRow();
        let nameCell = itemRow.insertCell();
        let priceCell = itemRow.insertCell();
        let quantityCell = itemRow.insertCell();
        nameCell.textContent = name;
        priceCell.textContent = price;
        quantityCell.textContent = 1;
    } else {
        console.error('Элемент с идентификатором "cart-table-body" не найден на странице');
    }
}

function showInfo(name) {
    alert(`Подробная информация о товаре "${name}"`);
}

function addComment(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let comment = document.getElementById('comment').value;

    let commentList = document.getElementById('comment-list');
    let newComment = document.createElement('li');
    newComment.innerHTML = `<strong>${name}:</strong> ${comment}`;
    commentList.appendChild(newComment);

    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    let cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = totalCount;
    cartCountElement.classList.add('highlight');
    setTimeout(() => cartCountElement.classList.remove('highlight'), 300);
}

updateCartCount();