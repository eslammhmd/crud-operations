


// ----------------------------------------declare variables------------------------------

let nameP = document.getElementById('name');
let category = document.getElementById('category');
let price = document.getElementById('price');
let count = document.getElementById('count');
let btnUpdate = document.getElementById('update');
// let finUpD =document.getElementById('finUpD');
let addProduct = document.getElementById('addProduct');
let delAll = document.getElementById('delAll')


let dataProductArray;
let mood = 'create';
// vvv
let temp;

// add pros in array to local storage
localStorage.Product != null ? dataProductArray = JSON.parse(localStorage.Product) : dataProductArray = [];






// ---------------------------------create product-------------------------------

function createProduct() {
    let table = '';
    for (let i = 0; i < dataProductArray.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProductArray[i].category}</td>
        <td>${dataProductArray[i].nameP}</td>
        <td>${dataProductArray[i].price}</td>
        <td>${dataProductArray[i].count}</td>
        <td>
            <button id="update" onclick ="updateProduct(${i})" class="btn btn-primary"><img src="imgs/update.png" alt=""></button>
            <button class="btn btn-danger mt-sm-1" onclick="delProduct(${i})"><img src="imgs/del.png" alt=""></button>
        </td>
        </tr>
        
        `
    }


    document.getElementById('tbody').innerHTML = table;




    if (dataProductArray.length > 0) {
        delAll.classList.add('active')
        document.getElementById('numOfprod').innerHTML = dataProductArray.length

    } else {
        delAll.classList.remove('active')
        document.getElementById('numOfprod').innerHTML = 0;

    }
}







// ----------------------------update items-----------------------------------

function updateProduct(i) {
    // finUpD.classList.add('active');
    nameP.value = dataProductArray[i].nameP
    category.value = dataProductArray[i].category
    count.style.display = 'none';
    price.value = dataProductArray[i].price
    addProduct.innerHTML = `<i class='bx bx-recycle option'></i>`
    mood = 'update'
    temp =i;
    scroll({
        top:0,
        behavior :'smooth'
    })

}






// --------------------------------saving data in local storage----------------------------------



// ----------------------------------clear inputs by alert-------------------------


// ----------------------------clear inputs--------------------------------------


function reset() {
    nameP.value = "";
    category.value = "";
    count.value = "";
    price.value = "";
    nameP.focus()
}
// ----------------------------------function that create product---------------------




addProduct.onclick = () => {
    let product = {
        nameP: nameP.value,
        category: category.value,
        count: count.value,
        price: price.value
    }


    if(nameP.value !='' && category.value !='' && price.value !=''){
        
    if (mood == 'create') {
        // --------------create product == number of count--------------------
        if (product.count > 1) {
            for (let i = 0; i < product.count; i++) {
                dataProductArray.push(product);
            }
        } else {
            dataProductArray.push(product);
        }
    }else{
        dataProductArray[temp] = product;
        mood = 'create';
        addProduct.innerHTML = `<i class='bx bxs-book-add option'></i>`
        count.style.display = 'block';

    }
    }else{
        alert('You must enter all details')
    }
    // save in local storage
    localStorage.setItem('Product', JSON.stringify(dataProductArray));
    reset();
    createProduct();
}



// -----------------------------delete one product----------------------

function delProduct(i) {
    dataProductArray.splice(i, 1);
    localStorage.Product = JSON.stringify(dataProductArray)
    createProduct();
}




// ---------------------------------delete all---------------------------------

function delAllProduct() {
    let conf =confirm("Do you really want to clear all data ?");
    if(conf){
        localStorage.clear()
        dataProductArray.splice(0)
        createProduct()
    }
}

// -------------------------------update items-----------------------------


// ----------------------------put values in rows--------------------------------------




// // ------------------------import data table-----------------------------------
$(document).ready(function () {
    createProduct()
    $('#example').DataTable();
});










