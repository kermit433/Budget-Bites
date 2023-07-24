let list = document.getElementById('list');
let filter = document.querySelector('.filter');
let count = document.getElementById('count');
let listProducts = [
    {
        id: 1,
        name: 'Ground Beef',
        price: 8.67,
        store: 'Acme',
        quantity: 0,
        image: 'images/one.jpg',
        nature: {
            color: ['Acme'],
            size: ['S', 'M', 'L'],
            type: 'Meat',
        }
    },
    {
        id: 2,
        name: 'Cod',
        store: 'Giant',
        price: 23.00,
        quantiy: 30,
        image: 'images/two.jpg',
        nature: {
            color: ['Giant'],
            size: ['S', 'M', 'L'],
            type: 'Fish',
        }
    },
    {
        id: 3,
        name: 'Oranges',
        price: 3.00,
        store: 'Whole Foods',
        quantiy: 30,
        image: 'images/three.jpg',
        nature: {
            color: ['Whole Foods'],
            size: ['S', 'M', 'L'],
            type: 'Produce',
        }
    },
    {
        id: 4,
        name: 'Chicken Breast',
        store: 'Trader Joes',
        price: 7.99,
        quantiy: 30,
        image: 'images/four.jpg',
        nature: {
            color: ['Trader Joes'],
            size: ['S', 'M', 'L'],
            type: 'Meat',
        }
    },
    {
        id: 5,
        name: 'Salmon',
        store: 'Taravez Grocery',
        price: 17.59,
        quantiy: 30,
        image: 'images/five.jpg',
        nature: {
            color: ['Local'],
            size: ['S', 'M', 'L'],
            type: 'Fish'
            
        }
    },
    {
        id: 6,
        name: 'Broccoli',
        price: 4.59,
        store: 'Supremo Market',
        quantiy: 30,
        image: 'images/six.jpg',
        nature: {
            color: ['Local'],
            size: ['S', 'M', 'L'],
            type: 'Produce'
        }
 
    },

];
let productFilter = listProducts;
showProduct(productFilter);
function showProduct(productFilter){
    count.innerText = productFilter.length;
    list.innerHTML = '';
    productFilter.forEach(item => {
        let newItem = document.createElement('div');
        newItem.classList.add('item');

        let newImage = new Image();
        newImage.src = item.image;
        newItem.appendChild(newImage);

        let newTitle = document.createElement('div');
        newTitle.classList.add('title');
        newTitle.innerText = item.name;
        newItem.appendChild(newTitle);

        let newStore = document.createElement('div');
        newStore.classList.add('store');
        newStore.innerText = item.store;
        newItem.appendChild(newStore);

        let newPrice = document.createElement('div');
        newPrice.classList.add('price');
        newPrice.innerText = item.price.toLocaleString() + " d";
        newItem.appendChild(newPrice);



        list.appendChild(newItem); 
    })
 
}

filter.addEventListener('submit', function(event){
    event.preventDefault();
    let valueFilter = event.target.elements;
    productFilter = listProducts.filter(item => {
        if(valueFilter.category.value != ''){
            if(item.nature.type != valueFilter.category.value){
                return false;
            }

        }
        if(valueFilter.color.value != ''){
            if(!item.nature.color.includes(valueFilter.color.value)){
                return false;
            }
        }
        if(valueFilter.name.value != ''){
            if(!item.name.includes(valueFilter.name.value)){
                return false;

            }
        }

        // if(valueFilter.minPrice.value != ''){
        //     if(item.price < valueFilter.minPrice.value){
        //         return false;
        //     }
        // }

        if(valueFilter.maxPrice.value != ''){
            if(item.price > valueFilter.maxPrice.value){
                return false;
            }
        }


        return true;
    })
    showProduct(productFilter);

})