const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");
document.addEventListener("load",()=>{
    updateExchangeRate();
});

for(let select of dropdown){
    for(currCode in countryList) {
        let newOption= document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name=== "from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        if(select.name=== "to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === ""|| amtVal<1){
        amtVal = 1;
        amount.value = "1";
    }

    const url = `${URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText= `${amtVal}${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
};
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.q("img");
    img.src = newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});