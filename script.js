// Inflation numbers by month starting in 2010.
// Object keys are YYYYMM, values are inflation numbers for that month.
const inflation = {
    201001 : 0.3,
    201002 : 0.0,
    201003 : 0.4,
    201004 : 0.2,
    201005 : 0.1,
    201006 : -0.1,
    201007 : 0.0,
    201008 : 0.1,
    201009 : 0.1,
    201010 : 0.1,
    201011 : 0.0,
    201012 : 0.2,
    201101 : 0.5,
    201102 : 0.5,
    201103 : 1.0,
    201104 : 0.6,
    201105 : 0.5,
    201106 : -0.1,
    201107 : 0.1,
    201108 : 0.3,
    201109 : 0.2,
    201110 : -0.2,
    201111 : -0.1,
    201112 : -0.2,
    201201 : 0.4,
    201202 : 0.4,
    201203 : 0.8,
    201204 : 0.3,
    201205 : -0.1,
    201206 : -0.1,
    201207 : -0.2,
    201208 : 0.6,
    201209 : 0.4,
    201210 : 0.0,
    201211 : -0.5,
    201212 : -0.3,
    201301 : 0.3,
    201302 : 0.8,
    201303 : 0.3,
    201304 : -0.1,
    201305 : 0.2,
    201306 : 0.2,
    201307 : 0.0,
    201308 : 0.1,
    201309 : 0.1,
    201310 : -0.3,
    201311 : -0.2,
    201312 : 0.0,
    201401 : 0.4,
    201402 : 0.4,
    201403 : 0.6,
    201404 : 0.3,
    201405 : 0.3,
    201406 : 0.2,
    201407 : 0.0,
    201408 : -0.2,
    201409 : 0.1,
    201410 : -0.3,
    201411 : -0.5,
    201412 : -0.6,
    201501 : -0.5,
    201502 : 0.4,
    201503 : 0.6,
    201504 : 0.2,
    201505 : 0.5,
    201506 : 0.4,
    201507 : 0.0,
    201508 : -0.1,
    201509 : -0.2,
    201510 : 0.0,
    201511 : -0.2,
    201512 : -0.3,
    201601 : 0.2,
    201602 : 0.1,
    201603 : 0.4,
    201604 : 0.5,
    201605 : 0.4,
    201606 : 0.3,
    201607 : -0.2,
    201608 : 0.1,
    201609 : 0.2,
    201610 : 0.1,
    201611 : -0.2,
    201612 : 0.0,
    201701 : 0.6,
    201702 : 0.3,
    201703 : 0.1,
    201704 : 0.3,
    201705 : 0.1,
    201706 : 0.1,
    201707 : -0.1,
    201708 : 0.3,
    201709 : 0.5,
    201710 : -0.1,
    201711 : 0.0,
    201712 : -0.1,
    201801 : 0.5,
    201802 : 0.5,
    201803 : 0.2,
    201804 : 0.4,
    201805 : 0.4,
    201806 : 0.2,
    201807 : 0.0,
    201808 : 0.1,
    201809 : 0.1,
    201810 : 0.2,
    201811 : -0.3,
    201812 : -0.3,
    201901 : 0.2,
    201902 : 0.4,
    201903 : 0.6,
    201904 : 0.5,
    201905 : 0.2,
    201906 : 0.0,
    201907 : 0.2,
    201908 : 0.0,
    201909 : 0.1,
    201910 : 0.2,
    201911 : -0.1,
    201912 : -0.1,
    202001 : 0.4,
    202002 : 0.3,
    202003 : -0.2,
    202004 : -0.7,
    202005 : 0.0,
    202006 : 0.5,
    202007 : 0.5,
    202008 : 0.3,
    202009 : 0.1,
    202010 : 0.0,
    202011 : -0.1,
    202012 : 0.1,
    202101 : 0.4,
    202102 : 0.5,
    202103 : 0.7,
    202104 : 0.8,
    202105 : 0.8,
    202106 : 0.9,
    202107 : 0.5,
    202108 : 0.2,
    202109 : 0.3,
    202110 : 0.8,
    202111 : 0.5,
}

// Elements
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
const calculateButton = document.getElementById('calculate');
const resultWage = document.getElementById('result-wage');
const resultSection = document.getElementById('result-section');
const resultAdjustment = document.getElementById('result-adjustment');
const resultPercent = document.getElementById('result-percent');
const resultText = document.getElementById('result-text');

// Make sure a future date cannot be selected.
const mostRecentDataKey = Object.keys(inflation).sort().reverse()[0];
const mostRecentDataYear = mostRecentDataKey.slice(0, 4);
const mostRecentDataMonth = mostRecentDataKey.slice(4, 6);
yearSelect.addEventListener('change', (e) => {
    if (mostRecentDataYear === e.target.value) {
        for (let option of monthSelect) {
            if (option.value > mostRecentDataMonth) {
                option.disabled = true;
            }
        }
        if (monthSelect.value > mostRecentDataMonth) {
            monthSelect.value = '01';
        }
    } else {
        for (let option of monthSelect) {
            option.disabled = false;
        }
    }
});

calculateButton.onclick = (e) => {
    // Fields
    let wage = document.getElementById('wage').value;
    let month = monthSelect.value;
    let year = yearSelect.value;

    // Safari allows commas in numeric fields but Chrome does not.
    wage = wage.replace(/,/g, '');
    wage = (wage * 1).toFixed(2);

    // Object key to compare against
    let inflationKey = parseInt(`${year}${month}`);

    totalInflation = Object.keys(inflation).reduce(function (previous, key) {
        if (key >= inflationKey) {
            return previous + inflation[key];
        }
        return previous;
    }, 0);

    let result = parseFloat((wage * (1 + (totalInflation/100))).toFixed(2),10);
    let difference = parseFloat((result - wage).toFixed(2),10);
    wage = parseFloat(wage,10).toLocaleString("en-US");

    if ( result > 999 ) {
        // Comma format the result
        result = result.toLocaleString("en-US");
        difference = difference.toLocaleString("en-US");
    }

    // Output values
    resultWage.innerText = result;
    resultAdjustment.innerText = difference;
    resultPercent.innerText = totalInflation;
    let output = `A wage of <mark>$${result}</mark> in today's dollars (${mostRecentDataMonth}/${mostRecentDataYear}) is the same as <mark>$${wage}</mark> in ${month}/${year} in terms of purchasing power.`;
    resultText.innerHTML = output;
    resultSection.style.display = 'block';
}


