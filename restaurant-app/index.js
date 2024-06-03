document.addEventListener('DOMContentLoaded', () => {
    loadTablesFromJSON();
    loadMenuFromJSON();
    setUpSearchFilters();
    document.getElementById('closeSessionButton').addEventListener('click', handleCloseSessionButton);
});

const tables = [];

//fetches tables data from tables.json
function loadTablesFromJSON() {
    fetch('tables.json')
        .then(response => response.json())
        .then(data => {
            
            tables.push(...data.tables);
            //console.log(data);
            displayTables(tables);
        })
        .catch(error => console.error('Error fetching the JSON:', error));
}

//fetched menu data from menu.json
function loadMenuFromJSON() {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => displayMenu(data))
        .catch(error => console.error('Error fetching the JSON:', error));
}

function displayTables(tables) {
    const tableContent = document.getElementById('tables-content');
    tableContent.innerHTML = '';
    tables.forEach(table => {
        const tableDiv = document.createElement('div');
        tableDiv.classList.add('table-card');
        tableDiv.setAttribute('ondrop', 'drop(event)');
        tableDiv.setAttribute('ondragover', 'allowDrop(event)');
        tableDiv.innerHTML = `
            <div class="card-body" id="table-card-${table.tableNumber}">
                <p style="font-weight: bold;">Table - ${table.tableNumber}</p>
                <p id="total_items_${table.tableNumber}">Total items: ${table.totalItems}</p>
                <p id="amount_${table.tableNumber}">Rs.${table.amount}</p>
            </div>
        `;
        tableContent.appendChild(tableDiv);


        tableDiv.addEventListener('click', function() {
            showTableDetails(table);
        });
    });
}

function displayMenu(menu) {
    const menuContent = document.getElementById('menu-content');
    menuContent.innerHTML = '';
    menu.forEach(dish => {
        const dishDiv = document.createElement('div');
        dishDiv.classList.add('menu-card');
        dishDiv.setAttribute('draggable', 'true');
        dishDiv.setAttribute('ondragstart', `drag(event, ${JSON.stringify(dish)})`);
        dishDiv.innerHTML = `
            <div class="card-body">
                <p style="font-weight: bold;">${dish.dishName}</p>
                <p>${dish.courseType}</p>
                <p>Rs.${dish.price}</p>
            </div>  
        `;
        menuContent.appendChild(dishDiv);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event, dish) {
    event.dataTransfer.setData('text/plain', JSON.stringify(dish));
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const dish = JSON.parse(data);
    const tableNumber = event.currentTarget.querySelector('.card-body').id.split('-').pop();
    addDishToTable(parseInt(tableNumber), dish);
}

function addDishToTable(tableNumber, dish) {
    const table = tables.find(t => t.tableNumber === tableNumber);
    //console.log(table.orderDetails);
    if (table) {
        const existingOrder = table.orderDetails.find(order => order.dishName === dish.dishName);
        if (existingOrder) {
            existingOrder.servings += 1;
        } else {
            dish.servings = 1;
            table.orderDetails.push(dish);
        }
        table.totalItems += 1;
        table.amount += dish.price;
        updateTableDisplay(table);
    }
}

function updateTableDisplay(table) {
    document.getElementById(`total_items_${table.tableNumber}`).textContent = `Total items: ${table.totalItems}`;
    document.getElementById(`amount_${table.tableNumber}`).textContent = `Rs.${table.amount}`;
}

function showTableDetails(table) {
    const modal = document.getElementById('orderModal');
    const modalTitle = document.getElementById('modalTitle');
    const orderDetails = document.getElementById('orderDetails').getElementsByTagName('tbody')[0];
    const totalAmount = document.getElementById('totalAmount');

    // Remove active class from all table cards
    const tableCards = document.querySelectorAll('.table-card');
    tableCards.forEach(card => card.classList.remove('active-table'));

    // Add active class to the table card corresponding to the opened modal
    const activeTableCard = document.getElementById(`table-card-${table.tableNumber}`);
    activeTableCard.classList.add('active-table');

    modalTitle.textContent = `Table - ${table.tableNumber} | Order Details`;
    orderDetails.innerHTML = '';

    table.orderDetails.forEach((order, index) => {
        const row = orderDetails.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = order.dishName;
        row.insertCell(2).textContent = `Rs.${order.price}`;

        const servingsCell = row.insertCell(3);
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.classList.add('serving-control');
        minusButton.classList.add('minus-button');
        minusButton.addEventListener('click', () => updateServings(table.tableNumber, order.dishName, -1));
        
        const servingsText = document.createElement('span');
        servingsText.textContent = order.servings;
        servingsText.classList.add('servings-text');

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.classList.add('serving-control');
        plusButton.classList.add('plus-button');
        plusButton.addEventListener('click', () => updateServings(table.tableNumber, order.dishName, 1));

        servingsCell.appendChild(minusButton);
        servingsCell.appendChild(servingsText);
        servingsCell.appendChild(plusButton);

        const actionsCell = row.insertCell(4);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-order');
        removeButton.addEventListener('click', () => removeOrder(table.tableNumber, order.dishName));
        actionsCell.appendChild(removeButton);
    });
     totalAmount.textContent = `Total: Rs.${table.amount}`;
    modal.style.display = 'block';
}


function updateServings(tableNumber, dishName, change) {
    const table = tables.find(t => t.tableNumber === tableNumber);
    if (table) {
        const order = table.orderDetails.find(order => order.dishName === dishName);
        if (order) {
            const newServings = order.servings + change;
            if (newServings > 0) {
                table.totalItems += change;
                table.amount += change * order.price;
                order.servings = newServings;
                updateTableDisplay(table);
                showTableDetails(table);
            } else if (newServings === 0) {
                removeOrder(tableNumber, dishName);
            }
        }
    }
}

function closeModal(event) {
    event.preventDefault();
    document.getElementById('orderModal').style.display = 'none';

    // Remove active class from the corresponding table card
    const activeTableCard = document.querySelector('.active-table');
    if (activeTableCard) {
        activeTableCard.classList.remove('active-table');
    }
}


function handleCloseSessionButton() {
    const modalTitle = document.getElementById('modalTitle');
    const tableNumber = modalTitle.textContent.match(/Table - (\d+)/)[1];
    const table = tables.find(t => t.tableNumber == tableNumber);
    if (table) {
        closeSession(table);
    }
}

function closeSession(table) {
    alert(`Total Bill: Rs.${table.amount}`);
    table.totalItems = 0;
    table.amount = 0;
    table.orderDetails = [];
    updateTableDisplay(table);
    closeModal();
}

function removeOrder(tableNumber, dishName) {
    const table = tables.find(t => t.tableNumber === tableNumber);
    
    if (table) {
        const orderIndex = table.orderDetails.findIndex(order => order.dishName === dishName);
        if (orderIndex > -1) {
            const order = table.orderDetails[orderIndex];
            table.totalItems -= order.servings;
            table.amount -= order.price * order.servings;
            table.orderDetails.splice(orderIndex, 1);
            updateTableDisplay(table);
            showTableDetails(table);
        }
    }
}


function setUpSearchFilters() {
    const searchTable = document.getElementById('search-table');
    const searchMenu = document.getElementById('search-menu');

    searchTable.addEventListener('input', function() {
        const query = searchTable.value.toLowerCase();
        const filteredTables = tables.filter(table => `Table - ${table.tableNumber}`.toLowerCase().includes(query));
        displayTables(filteredTables);
    });

    searchMenu.addEventListener('input', function() {
        fetch('menu.json')
            .then(response => response.json())
            .then(data => {
                const query = searchMenu.value.toLowerCase();
                const filteredMenu = data.filter(dish => dish.dishName.toLowerCase().includes(query) || dish.courseType.toLowerCase().includes(query));
                displayMenu(filteredMenu);
            })
            .catch(error => console.error('Error fetching the JSON:', error));
    });
}
