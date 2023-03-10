window.onload = function () {
    init();
};

let globalGBP;
let globalLastUpdate;
function init() {
    getGBPpriceWithRetry();
    document.getElementById("GBPinput").setAttribute('value', 0.00);
    document.getElementById("PLNinput").setAttribute('value', 0.00);
    showTodaysPrice();
}

/**
 * Compute amount of PLN and show it in PLN input label
 */
async function showPLN() {
    const inputNumber = document.getElementById("GBPinput").value;
    var pln_from_gbp = inputNumber * globalGBP;
    var rounded = pln_from_gbp.toFixed(2);
    document.getElementById("PLNinput").value = rounded;
}

/**
 * Compute amount of GBP and show it in GBP input label
 */
async function showGBP() {
    const inputNumber = document.getElementById("PLNinput").value;
    var gbp_from_pln = inputNumber / globalGBP;
    var rounded = gbp_from_pln.toFixed(2);
    document.getElementById("GBPinput").value = rounded;
}

/**
 * Show today's GBP price in header
 */
async function showTodaysPrice() {
    var element = document.getElementById("header_price");
    await getGBPpriceWithRetry();
    const gbp_price = globalGBP;
    if (gbp_price === null) { // problem with API occured
        element.innerHTML = `Problem with API no data.`;
    }
    else {
    const gbp_price_rounded = gbp_price.toFixed(2);
    element.innerHTML = `Last update (${globalLastUpdate}) GBP price: ${gbp_price_rounded} PLN`;
    }
}
/**
 * Funtion try to fetch data from NBP API <retryCount> number of times, if it does not work globalGBP value is
 * being set for null and problem with API is announced in showTodaysPrice function.
 */
async function getGBPpriceWithRetry(retryCount = 3) {
  try {
    const response = await axios.get('https://api.nbp.pl/api/exchangerates/rates/a/gbp/');
    globalGBP = response.data.rates[0].mid; // price of GBP
    globalLastUpdate = response.data.rates[0].effectiveDate; // last price update date
  } catch (error) {
    console.error(error);
    if (retryCount > 0) {
      console.log(`Retrying... (${retryCount} attempts left)`);
      return await getGBPpriceWithRetry(retryCount - 1);
    } else {
      console.log('Maximum retry attempts reached, returning default value...');
      globalGBP = null;
      globalLastUpdate = null;
    }
  }
}

// Sending request at start, every 2 hours and every day at 12:20
setInterval(getGBPpriceWithRetry, 7200000); // send every 2 hours

// send everyday at 12.20 pm
setInterval(() => {
    const now = new Date();
    const desiredTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 20, 0, 0);
    let timeTill1220 = desiredTime.getTime() - now.getTime();
    if (timeTill1220 < 0) // if its after 12.20 add one day
    {
        desiredTime.setDate(desiredTime.getDate() + 1);
        timeTill1220 = desiredTime.getTime() - now.getTime();
    }
    setTimeout(() => {
        getGBPpriceWithRetry(); // function to call after timeTill1220 [ms]
    }, timeTill1220); // time left to call getGBPprice
}, 86400000); // call it interval every 24 hours