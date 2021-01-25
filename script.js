const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const amount = document.getElementById('amount');


// const dumyTransaction = [
//       {  id : 1, text : 'Cash', amount : 300 },
//       {  id : 2, text : 'Flower', amount : -20 },
//       {  id : 3, text : 'Book', amount : -10 },
//       {  id : 4, text : 'Camera', amount : 150 }
    
// ];
const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));

let transactions  = localStorage.getItem('transactions') !== null ?
localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("Please add a text and amount");
    }
    else {
        const transaction = {
            id : generateID(),
            text : text.value,
            amount : +amount.value
        };
        // console.log(transaction);
        transactions.push(transaction);
        addTransactionDOM(transaction);

        updateValues();
        updateLocalStorage();

        text.value ='';
        amount.value ='';
    }
} 
// Generate random ID
function generateID(){
    return Math.floor(Math.random() * 100000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ?'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}
        </span> <button class = "delete-btn" onClick ="removeTransaction(${transaction.id})">x</button>`;
        
        list.appendChild(item);
}

// Updates the Balance, Income and Expense
function updateValues() {
    //! Balance
    const amounts = transactions.map(transaction => transaction.amount);
    // console.log(amounts);
    const total  = amounts.reduce((acc, item) => (acc += item), 0)
    .toFixed(2); 
    // console.log(total);

    //! Income
    const income = amounts.filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    // console.log(income);

    //! Expense
    const expense  = (
        amounts.filter(item => item < 0) 
        .reduce((acc, item) =>(acc += item), 0) * -1).toFixed(2);
    // console.log(expense);

    balance.innerHTML = `$${total}`;
    money_plus.innerHTML = `$${income}`;
    money_minus.innerHTML = `$${expense}`;
}
// Remove Transactio by ID 
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id
        !== id);
        updateLocalStorage();
        init();
}

// Update local storge transaction
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);