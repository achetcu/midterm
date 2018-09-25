let weeklyBudget = 0;
let totalSpent = 0;
let entertainment = 0;
let food = 0;
let clothing = 0;
let bills = 0;



function weeklyTotal() {
    const inputTotal = parseFloat(prompt("Whats the weekly budget?", "250"));
    weeklyBudget += inputTotal;
};

$("#budget").one("click", weeklyTotal);

function budgetLeft() {
    let remaining = weeklyBudget - totalSpent;
    let newRemaining = remaining.toFixed(2);
    $("#left").html(`&dollar; ${newRemaining} remaining`);
};

$("#budget").on("click", budgetLeft);

function amountListed() {
    const amount = parseFloat(document.querySelector('#amount').value);
    const total = totalSpent += amount;
    const newtotalSpent = total.toFixed(2);
    $("#spent").html(`&dollar; ${newtotalSpent} spent`);
    updateAmount();
};
$("#sumbit").on("click", amountListed)

function updateAmount() {
    let remaining = weeklyBudget - totalSpent
    let newRemaining = remaining.toFixed(2);
    $("#left").html(`&dollar; ${newRemaining} remaining`);
    zeroBalance();
};

function show_selected() {
    const amount = parseFloat(document.querySelector('#amount').value);
    const newamount = amount.toFixed(2)
    const selector = document.getElementById('category');
    const value = selector[selector.selectedIndex].value;

    $("#transactionHistory").append(`<li>${value}: &dollar;${newamount}</li>`);
};
$("#sumbit").on("click", show_selected)

function transactionUpdate() {
    const amount = parseFloat(document.querySelector('#amount').value);;
    const selector = document.getElementById('category');
    const value = selector[selector.selectedIndex].value;
    if (value === 'Entertainment') {
       let enterTotal =  entertainment += amount;
       let newenterTotal = enterTotal.toFixed(2);
        $("#entertainmentTotal").html(`Entertainment: &dollar;${newenterTotal}`);
    };
    if (value === 'Food') {
        let foodTotal = food += amount;
        let newfoodTotal = foodTotal.toFixed(2);
        $("#foodTotal").html(`Food: &dollar;${newfoodTotal}`);
    };
    if (value === 'Clothing') {
       let clothingTotal = clothing += amount;
       let newclothingTotal = clothingTotal.toFixed(2);
        $("#clothingTotal").html(`Clothing: &dollar;${newclothingTotal}`);
    };
    if (value === 'Bills') {
        let billsTotal = bills += amount;
        let newbillsTotal = billsTotal.toFixed(2);
        $("#billsTotal").html(`Bills: &dollar;${newbillsTotal}`);
    };
    drawBasic();
};
$("#sumbit").on("click", transactionUpdate)


function zeroBalance() {
    let zero = weeklyBudget - totalSpent
    if (zero <= 0) {
        alert("You used all of the weekly budget. No more spending!")
    };
};

function downTransaction() {

    const transHistory = $("#transactionHistory");
    transHistory.toggle();
    $("#arrow").toggleClass('rotate')


};

$(".transactions").on("click", downTransaction);

function downTotals() {

    const totalsHistory = $("#transactionTotal");
    totalsHistory.toggle();
    $("#arrow2").toggleClass('rotate')


};

$(".categoryTotal").on("click", downTotals);

google.charts.load('current', {
    packages: ['corechart', 'bar']
});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

    var data = google.visualization.arrayToDataTable([
        ['Expense', 'Amount', ],
        ['Entertainment', entertainment],
        ['Food', food],
        ['Clothing', clothing],
        ['Bills', bills],

    ]);
    var options = {
        title: 'Weekly Expense',
        chartArea: {
            width: '50%'
        },
        hAxis: {
            title: 'Amount Spent',
            minValue: 0
        },
        vAxis: {
            title: 'Expense'
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}