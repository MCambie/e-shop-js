document.addEventListener('DOMContentLoaded', function(){
    let request = new XMLHttpRequest();
    let requestURL = 'http://127.0.0.1/eshop/api.php';
    
    
    let row   = document.querySelector('#items');
    
    request.addEventListener('readystatechange', function(event){
        if (event.currentTarget.readyState == 4 && event.currentTarget.status == 200) {
            
            // la letiable prend les info sur l'API --------------------------------
            
            let shopDatabaseJSON = JSON.parse(event.currentTarget.responseText);
            
            // Boucle for à travers les différents de la section (20 x) --------------------------
            
            for (let i = 0; i < shopDatabaseJSON.result.length; i++ ) {
                
                // récupération des différentes données à implanter ----------------------
                
                let shopDatabaseTitle      = shopDatabaseJSON.result[i].name;
                let shopDatabaseOverview   = shopDatabaseJSON.result[i].description;
                let shopDatabasePrice     = shopDatabaseJSON.result[i].price;
                let shopDatabaseCategory    = shopDatabaseJSON.result[i].category;
                let idPanier    = shopDatabaseJSON.result[i].id;
                
                // création des éléments pour l'html. Ils sont placés dans la boucle pour se multiplier 20x -------------------------------------------
                
                
                
                let col              = document.createElement('div');
                col.className='col-lg-4 col-md-6 mb-4';
                
                let item              = document.createElement('div');
                item.className='card h-100 shop-item';
                
                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                
                let name        = document.createElement('h2');
                name.className='card-title';
                
                let nameLink = document.createElement('a');
                nameLink.className='item-title'
                nameLink.setAttribute('href', '#');
                
                let category            = document.createElement('h5');
                category.className='card-subtitle mb-2 text-muted';
                
                let description               = document.createElement('p');
                description.className='card-text';
                
                let footer = document.createElement('div');
                footer.className='card-footer text-center';
                
                let button = document.createElement('button');
                button.setAttribute('data-id', idPanier)
                button.setAttribute('data-price', shopDatabasePrice)
                button.setAttribute('data-name', shopDatabaseTitle)
                button.className = 'btn btn-primary card-link shop-item-btn';
                
                let price  = document.createElement('small');
                price.className='text-muted card-link';
                
                
                
                // implantation des différents éléments créés (pour le moment "flottés") dans l'html. De nouveau dans la boucle 20x.-----------------------------
                
                
                col.appendChild(item);
                
                cardBody.appendChild(name);
                
                nameLink.textContent = shopDatabaseTitle;    
                name.appendChild(nameLink)
                
                category.textContent = shopDatabaseCategory;
                cardBody.appendChild(category);
                
                
                description.textContent = shopDatabaseOverview;
                cardBody.appendChild(description);
                
                item.appendChild(cardBody);
                
                price.textContent = 'Price : ' + shopDatabasePrice;
                footer.appendChild(price);
                
                button.textContent = 'Add to cart';
                footer.appendChild(button);
                
                item.appendChild(footer);
                
                row.appendChild(col);
                
                
            }
            
            
            // Fonctionnalités du Cart
            
            
            
            let removeCartItemButtons = document.querySelectorAll('.btn-danger');
            for (let i = 0; i < removeCartItemButtons.length; i++){
                let button = removeCartItemButtons[i]
                button.addEventListener('click', removeCartItem);
            };
            
            let quantityInputs = document.querySelectorAll('.cart-quantity-input');
            for (let i = 0; i < quantityInputs.length; i++){
                let input = quantityInputs[i];
                input.addEventListener('change', quantityChanged);
            };
            
            let addToCartButtons = document.querySelectorAll('.shop-item-btn');
            for (let i = 0; i < addToCartButtons.length; i++){
                let cartButton = addToCartButtons[i];
                cartButton.addEventListener('click', addToCartClicked);
                
            };
            
            function removeCartItem(event){
                let buttonClicked = event.target
                let quantity = buttonClicked.previousElementSibling.value;
                console.log(quantity);
                
                // Si la quantité est égale à 1 on remove l'item entier, sinon on enlève 1 à la quantité
                if (quantity == 1) {
                    buttonClicked.parentElement.parentElement.remove()
                updateCartTotal()
                } else {
                    buttonClicked.previousElementSibling.value = quantity-1;
                    updateCartTotal();
                }
                
            }
            
            function quantityChanged(event){
                let input = event.target;
                if(isNaN(input.value) || input.value <= 0){
                    input.value = 1
                }
                updateCartTotal();
            }
            
            
            
            function addToCartClicked(event){
                let cartButton = event.target;
                let shopItem = cartButton.parentElement.parentElement;
                let title = shopItem.querySelector('.item-title').innerText;
                let priceElement = shopItem.querySelector('.card-link').innerText;
                let price = parseFloat(priceElement.replace('Price : ', ''));
                addItemToCart(title, price);
                updateCartTotal();
                
            };
            
            function addItemToCart(title, price, idPanier)
            {
                let cartRow = document.createElement('div');
                cartRow.className = 'cart-row';
                let cartItems = document.querySelector('.cart-items');
                let cartItemNames = cartItems.querySelectorAll('.cart-item-title');
                for(let i = 0; i < cartItemNames.length; i++){
                    if(cartItemNames[i].innerText == title){
                        return
                    }
                }
                let cartRowContent = `
                        <div class="cart-item cart-column">
                            <span class="cart-item-title">${title}</span>
                        </div>
                            <span class="cart-price cart-column">$${price}</span>
                        <div class="cart-quantity cart-column">
                            <input class="cart-quantity-input" type="number" value="1">
                            <button class="btn btn-danger"  type="button">REMOVE</button>
                        </div>`; 
                cartRow.innerHTML = cartRowContent;
                console.log(cartRow);
                cartItems.appendChild(cartRow);
                cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
                cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
            };  

            function updateCartTotal(){
                let cartItemContainer = document.querySelector('.cart-items');
                let cartRows = cartItemContainer.querySelectorAll('.cart-row');
                let total = 0;
                for (let i = 0; i < cartRows.length; i++){
                    let cartRow = cartRows[i];
                    let priceElement = cartRow.querySelector('.cart-price');
                    let quantityElement = cartRow.querySelector('.cart-quantity-input');
                    let quantity = quantityElement.value;
                    let price = parseFloat(priceElement.innerText.replace('$', ''));
                    
                    total = total + (price * quantity);
                };
                
                // limiter le total a deux décimales car il ajoute des 9 random a cause de la multiplication de décimale
                total = Math.round(total*100)/100;
                
                document.querySelector('.cart-total-price').innerText = '$'+total;
            }
        }
    })
    request.open('GET', requestURL, true);
    request.send();
    
    
    
});