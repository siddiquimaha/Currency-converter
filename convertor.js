
const dropdowns = document.querySelectorAll(".box-fromto select");
const btn = document.querySelector('form button');
const fromCurr = document.querySelector(".from select");
// console.log(fromCurr);
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".result p")
const historyRate = document.getElementById("history-amt");

for (code in countryList) {
    // console.log(code, countryList[code]);
}

for(let select of dropdowns){
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = 'selected';
        }else if(select.name === "to" && currCode === "PKR"){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    // console.log(element);
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
};
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".txt-amount");
    let amtVal = amount.value;
    // console.log(amtVal);
    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    };
//used API here
    let fromCurrency = fromCurr.value.toLowerCase();
    let toCurrency = toCurr.value.toLowerCase();
    let userDate = historyRate.value;
    let url;

    if(userDate){
        url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${userDate}/v1/currencies/${fromCurrency}.json`;
    }else{
        url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
    }

        let response = await fetch(url);
        let data = await response.json();
        let rate = data[fromCurrency][toCurrency]; // Correct way to access the rate
        // console.log(rate);
        let finalAmount = amtVal * rate;
        console.log(finalAmount);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
