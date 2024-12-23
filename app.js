
document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const transactionListElement = document.getElementById('transaction-list');
    const transactionForm = document.getElementById('transaction-form');
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    function updateBalance() {
        const total = transactions.reduce((acc, transaction) => {
            return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
        balanceElement.textContent = `$${total.toFixed(2)}`;
    }
    function renderTransactions() {
        transactionListElement.innerHTML = '';
        transactions.forEach((transaction, index) => {
            const transactionElement = document.createElement('div');
            transactionElement.classList.add('flex', 'justify-between', 'p-2', 'border', transaction.type === 'income' ? 'bg-green-200' : 'bg-red-200');
            transactionElement.innerHTML = `
                <span>${transaction.description}: $${transaction.amount.toFixed(2)}</span>
                <button class="text-red-500" onclick="removeTransaction(${index})">Remove</button>
            `;
            transactionListElement.appendChild(transactionElement);
        });
    }
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;

        const transaction = { description, amount, type };
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
        updateBalance();
        transactionForm.reset();
    });
    window.removeTransaction = (index) => {
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
        updateBalance();
    };
    renderTransactions();
    updateBalance();
});