var container = document.getElementById('container')
var bookArray = []
var cart = []
var total = 0

document.addEventListener("DOMContentLoaded", async() => {
    console.log("fine caricamento pagina")
})

window.onload = () => {
    fetchBooks()
  }

function fetchBooks() {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => { 
            return response.json()
        })
        .then(data => {
            data.forEach((element,index) => {
                bookArray.push(element)
                
                let book = document.createElement('div')
                book.setAttribute("data-asin",index)
                book.innerHTML = element.title + " - " + element.price + "€"

                container.appendChild(book)

                let cartButton = document.createElement('input')
                cartButton.setAttribute("type","button")
                cartButton.setAttribute("class", "cartButton")
                cartButton.value = "Aggiungi al carrello"

                book.appendChild(cartButton)
            });

            console.log("fine caricamento prodotti")

            /*
            var cartButtons = document.querySelectorAll('.cartButton');


            cartButtons.forEach(element => {
                element.onclick = function() {
                    const productElement = this.parentElement;
                    productElement.setAttribute("class","selected")
                    
                    let index = productElement.getAttribute("data-asin")

                    cart.push(bookArray[index])                    
                }
            })
            */

            assignCartButtonEvents()

        })

}


function assignCartButtonEvents() {
    var cartButtons = document.querySelectorAll('.cartButton');
    
    cartButtons.forEach(element => {
        element.onclick = function() {
            const productElement = this.parentElement;
            productElement.setAttribute("class", "selected");
            
            let index = productElement.getAttribute("data-asin");

            cart.push(bookArray[index]);   
            console.log("Aggiunto al carrello:", bookArray[index]);
        };
    });
}


var cartDiv = document.getElementById("cart")

function viewCart() {
    cartDiv.innerHTML = "<div id='cart'><input type='button' value='vedicarrello' onclick='viewCart()'></div>"
    total = null

    cart.forEach((element,index) => {
        let div = document.createElement('div')
        div.innerHTML = element.title
        div.setAttribute("data-asin",index)

        total += element.price

        let removeButton = document.createElement('input')
        removeButton.setAttribute("type","button")
        removeButton.setAttribute("class", "removeButton")
        removeButton.value = "Rimuovi dal carrello"

        div.appendChild(removeButton)

        cartDiv.appendChild(div)
    })

    var removeButtons = document.querySelectorAll('.removeButton');

    removeButtons.forEach((element,index) => {
        element.onclick = function() {
            const productElement = this.parentElement;
            let index = productElement.getAttribute("data-asin")

            cart.splice(index, 1);

            productElement.parentElement.removeChild(productElement);
            
        }
    })

    let divCount = document.createElement('div')
    divCount.innerHTML = "Numero articoli: " + (cart.length)
    cartDiv.appendChild(divCount)
    
    let deleteButton = document.createElement('input')
    deleteButton.setAttribute("type","button")
    deleteButton.setAttribute("class", "removeButton")
    deleteButton.value = "Svuota carrello"
    cartDiv.appendChild(deleteButton)

    deleteButton.onclick = function() {
        console.log("devo svuotare")
        cart = []
        cartDiv.innerHTML = "<div id='cart'><input type='button' value='vedicarrello' onclick='viewCart()'></div>"
    }

    let divTotal = document.createElement('div')
    divTotal.innerHTML = "Totale carrello: " + total
    cartDiv.appendChild(divTotal)

}




function filterFunction() {

    let searchValue = document.getElementById('searchBar').value.toUpperCase()

    if (searchValue.length >= 3) {
        container.innerHTML = ""
        
        bookArray.filter((element,index) => {
            let titleUpperCase = element.title.toUpperCase()

            if (titleUpperCase.includes(searchValue)) {

                let book = document.createElement('div')
                book.setAttribute("data-asin",index)
                book.innerHTML = element.title + " - " + element.price + "€"

                container.appendChild(book)

                let cartButton = document.createElement('input')
                cartButton.setAttribute("type","button")
                cartButton.setAttribute("class", "cartButton")
                cartButton.value = "Aggiungi al carrello"

                book.appendChild(cartButton)
            }


        })
    }
}