const form = document.querySelector('#form');
let formInput = document.querySelector('#form-input');
const groceryList = document.querySelector('#grocery-list');
const listHead = document.querySelector('#list-head');
const alertDiv = document.querySelector('#alert');

//functions for UI
function storeToUI(formValue) {
    const row = document.createElement('li');
    row.className = 'list-group-item d-flex justify-content-between' ;
    row.innerHTML = `<p class="item m-0">${formValue}</p>
                    <div class="icons">
                        <i class="fas fa-edit mr-3"></i>
                        <i class="fas fa-trash-alt text-danger"></i>
                    </div>` ;
    groceryList.appendChild(row) ;
    checkListHead();
}

function delFromUI(el){
    el.remove();
    checkListHead();
}

function checkListHead(){
    if(groceryList.childElementCount > 1){
        listHead.style.display = 'block';
    } else{
        listHead.style.display = 'none';

    }
}

//functions for LocalStorage
function getStorage(){
    let formValues = [] ;
    if(localStorage.getItem('formValues') === null){
        return formValues ;
    } else {
        return JSON.parse(localStorage.getItem('formValues'));
    }

}

function storeToLocalStorage(formvalue){
    const formValues = getStorage();
    formValues.push(formvalue);
    localStorage.setItem('formValues', JSON.stringify(formValues));
}

function delFromLocalStorage(el){
    const formValues = getStorage();
    formValues.forEach((formValue,index) => {
        if(formValue === el){
            formValues.splice(index,1);
        }
    });
    localStorage.setItem('formValues', JSON.stringify(formValues));
}





//Event listener

document.addEventListener('DOMContentLoaded', () =>{
    const formValues = getStorage() ;
    formValues.forEach(formValue => {
        storeToUI(formValue) ;
        del();
    });
});


form.addEventListener('submit',(e) => {
    e.preventDefault();
    let formValue = formInput.value ;
    if(formValue === ''){
    const row = document.createElement('div');
    row.className = 'alert alert-warning alert-dismissible fade show';
    row.innerHTML = `<strong> Enter the Item</strong>
                    <button type = 'button' class = 'close' data-dismiss = 'alert'>
                        <span aria-hidden = 'true'>&times;</span>
                    </button>`
    alertDiv.appendChild(row);
    }else{
        storeToUI(formValue);
        storeToLocalStorage(formValue);
        del();
        formInput.value = '';
    }
});
function del(){
    const listItems = document.querySelectorAll('.list-group-item');
    listItems.forEach((listItem) => {
        listItem.addEventListener('click',triggerDeleteAndEdit);
    });
}
    

    function triggerDeleteAndEdit(e){
        if(e.target.classList.contains('fa-trash-alt')){
            delFromUI(e.target.parentElement.parentElement);
            delFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);
        }
        if(e.target.classList.contains('fa-edit')){
            formInput.value = e.target.parentElement.previousElementSibling.textContent ;
            delFromUI(e.target.parentElement.parentElement);
            delFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);

        }
    }

    