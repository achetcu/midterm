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
    $("#left").html(`&dollar; ${weeklyBudget - totalSpent} remaining`);
};

$("#budget").on("click", budgetLeft);

function amountListed() {
    const amount = parseFloat(document.querySelector('#amount').value);
    totalSpent += amount;
    $("#spent").html(`&dollar; ${totalSpent} spent`);
    updateAmount();
};
$("#sumbit").on("click", amountListed)

function updateAmount() {
    $("#left").html(`&dollar; ${weeklyBudget - totalSpent} remaining`);
    zeroBalance();
};

function show_selected() {
    const amount = parseFloat(document.querySelector('#amount').value);
    const selector = document.getElementById('category');
    const value = selector[selector.selectedIndex].value;

    $("#transactionHistory").append(`<li>${value}: &dollar;${amount}</li>`);
};
$("#sumbit").on("click", show_selected)

function transactionUpdate() {
    const amount = parseFloat(document.querySelector('#amount').value);
    const selector = document.getElementById('category');
    const value = selector[selector.selectedIndex].value;
    if (value === 'Entertainment') {
        entertainment += amount
        $("#entertainmentTotal").html(`Entertainment: &dollar;${entertainment}`);
    };
    if (value === 'Food') {
        food += amount
        $("#foodTotal").html(`Food: &dollar;${food}`);
    };
    if (value === 'Clothing') {
        clothing += amount
        $("#clothingTotal").html(`Clothing: &dollar;${clothing}`);
    };
    if (value === 'Bills') {
        bills += amount
        $("#billsTotal").html(`Bills: &dollar;${bills}`);
    };
    drawBasic();
};
$("#sumbit").on("click", transactionUpdate)


function zeroBalance() {
    let zero = weeklyBudget - totalSpent
    if (zero < 0) {
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