function openTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');


    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabName)) {
            btn.classList.add('active');
        }
    });
}
// EMI calculator
function calculateEMI() {
    const principal = parseFloat(document.getElementById('emi-principal').value);
    const rate = parseFloat(document.getElementById('emi-rate').value);
    const time = parseFloat(document.getElementById('emi-time').value);

    const result = document.getElementById('emi-result');

    //  pricipal ,rate, time amount is not correct ->>show error
    if (!principal || !rate || !time) {
        // result.style.display = "block";
        // result.innerHTML = `alert('Please Fill all the details')`;
        alert('Please Fill all the details');
        return;
    }
    // convert yearly intrest to monthly
    const r = rate / 12 / 100;

    // convert years to months
    const t = time * 12;

    // EMI formula
    const emi =
        (principal * r * Math.pow(1 + r, t)) /
        (Math.pow(1 + r, t) - 1);


    const totalPayment = emi * t;
    const interest = totalPayment - principal;

    result.style.display = "block";

    result.innerHTML = `
    <p><strong> Monthly EMI:</strong>₹${emi.toFixed(2)}</p>
    <p><strong> Total Interest:</strong>₹${interest.toFixed(2)}</p>
    <p><strong> Total Payment:</strong>₹${totalPayment.toFixed(2)}</p>
    `;
}

// grocery
function calculateGrocery() {
    const budget = parseFloat(document.getElementById("grocery-budget").value);
    const items = document.getElementById("grocery-items").value
        .split(',').map(Number);

    const total = items.reduce((a, b) => a + b, 0);
    const remaining = budget - total;

    const result = document.getElementById("grocery-result");
    result.style.display = "block";

    result.innerHTML = `
    <p>Total Expense: ₹${total} </p>
    <p>Remaining budget:  ₹${remaining}</p> 
    <p style="color: ${remaining >= 0 ? "green" : "red"}">
    ${remaining >= 0 ? "Within Budget" : "Over Budget"}
    </p>
    `;
}

// Electricity 
function calculateElectricity() {
    const units = parseFloat(document.getElementById("elec-units").value);
    let bill = units * 7;

    const result = document.getElementById("elec-result");
    result.style.display = "block";
    result.innerHTML = `<p>Estimated Bill: ₹${bill}</p>`;
}
// Data Usage
function calculateData() {
    const total = parseFloat(document.getElementById('data-total').value);
    const used = parseFloat(document.getElementById('data-used').value);
    const days = parseFloat(document.getElementById('data-days').value);

    const remaining = total - used;
    const daily = remaining / days;

    const result = document.getElementById("data-result");
    result.style.display = 'block';

    result.innerHTML = `
    <p> Remaining Data:  ${remaining.toFixed(2)} GB</p>
    <p> Safe Daily Usage:  ${daily.toFixed(2)} GB/day</p>
    `;
}
// TAX 
function calculateTax() {
    const amount = parseFloat(document.getElementById('tax-amount').value);
    const rate = parseFloat(document.getElementById('tax-rate').value);

    const tax = amount * rate / 100;
    const total = amount + tax;

    const result = document.getElementById("tax-result");
    result.style.display = "block";

    result.innerHTML = `
    <p>Original Amount: ₹${amount}</p>
    <p>Tax Amount:  ₹${tax}</p>
    <p>Total Amount:  ₹${total}</p>
    `;
}

// AI CHAT BOT
const API_KEY = "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";

async function sendAIQuery() {
    const input = document.getElementById("ai-input")
    const chatBox = document.getElementById("chat-box")

    const query = input.value.trim().toLowerCase();
    if (!query) return;

    let reply = "";

    chatBox.innerHTML += `<div class="chat-message user">${query}</div>`;
    input.value = "";

    // ----1 ----EMI detection 
    if (query.includes("emi")) {
        const numbers = query.match(/\d+/g);
        if (numbers && numbers.length >= 3) {

            const p = parseFloat(numbers[0]);
            const rate = parseFloat(numbers[1]) / 12 / 100;
            const time = parseFloat(numbers[2]) * 12;

            const emi = (p * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
            reply = `Monthly EMI is ₹${emi.toFixed(2)}`;
        }
        else {
            reply = "Please give me loan, intrest and years. Example: EMI for 50000 at 9 % for 5 years";
        }
    }
    // ----2----electricity detection

    else if (query.includes("electricity") || query.includes("units")) {
        
        const match = query.match(/\d+/);
        
        let units = 0;
        if (match) units = parseFloat(match[0]);
        
        
        const bill = units * 7
        reply = `Estimated electricity bill is ₹${bill}`;
    }

    //----3---- tax detection
    else if (query.includes("tax")) {
        const numbers = query.match(/\d+/g);

        if (numbers && numbers.length >= 2) {
            const amount = parseFloat(numbers[0]);
            const rate = parseFloat(numbers[1]);

            const tax = amount * rate / 100;
            const total = amount + tax;
            reply = `Tax = ₹${tax} | Total amount = ₹${total}`;
        }
    }

    ///----4---- grocery detection
    else if (query.includes("grocery")) {
        reply = "Use the grocery tab to calculate your total expense and budget.";
    }

    // ---5----fall back Simple AI
    else {
        reply = "Use the grocery tab to calculate your total expense and budget.";
    }

    chatBox.innerHTML += `<div class="chat-message bot">${reply}</div>`;

    chatBox.scrollTop = chatBox.scrollHeight;
}
