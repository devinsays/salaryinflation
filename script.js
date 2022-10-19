// Inflation numbers by month starting in 2010.
// Object keys are YYYYMM, values are inflation numbers for that month.
const inflation = {
  201001: 216.687,
  201002: 216.741,
  201003: 217.631,
  201004: 218.009,
  201005: 218.178,
  201006: 217.965,
  201007: 218.011,
  201008: 218.312,
  201009: 218.439,
  201010: 218.711,
  201011: 218.803,
  201012: 219.179,
  201101: 220.223,
  201102: 221.309,
  201103: 223.467,
  201104: 224.906,
  201105: 225.964,
  201106: 225.722,
  201107: 225.922,
  201108: 226.545,
  201109: 226.889,
  201110: 226.421,
  201111: 226.23,
  201112: 225.672,
  201201: 226.665,
  201202: 227.663,
  201203: 229.392,
  201204: 230.085,
  201205: 229.815,
  201206: 229.478,
  201207: 229.104,
  201208: 230.379,
  201209: 231.407,
  201210: 231.317,
  201211: 230.221,
  201212: 229.601,
  201301: 230.28,
  201302: 232.166,
  201303: 232.773,
  201304: 232.531,
  201305: 232.945,
  201306: 233.504,
  201307: 233.596,
  201308: 233.877,
  201309: 234.149,
  201310: 233.546,
  201311: 233.069,
  201312: 233.049,
  201401: 233.916,
  201402: 234.781,
  201403: 236.293,
  201404: 237.072,
  201405: 237.9,
  201406: 238.343,
  201407: 238.25,
  201408: 237.852,
  201409: 238.031,
  201410: 237.433,
  201411: 236.151,
  201412: 234.812,
  201501: 233.707,
  201502: 234.722,
  201503: 236.119,
  201504: 236.599,
  201505: 237.805,
  201506: 238.638,
  201507: 238.654,
  201508: 238.316,
  201509: 237.945,
  201510: 237.838,
  201511: 237.336,
  201512: 236.525,
  201601: 236.916,
  201602: 237.111,
  201603: 238.132,
  201604: 239.261,
  201605: 240.229,
  201606: 241.018,
  201607: 240.628,
  201608: 240.849,
  201609: 241.428,
  201610: 241.729,
  201611: 241.353,
  201612: 241.432,
  201701: 242.839,
  201702: 243.603,
  201703: 243.801,
  201704: 244.524,
  201705: 244.733,
  201706: 244.955,
  201707: 244.786,
  201708: 245.519,
  201709: 246.819,
  201710: 246.663,
  201711: 246.669,
  201712: 246.524,
  201801: 247.867,
  201802: 248.991,
  201803: 249.554,
  201804: 250.546,
  201805: 251.588,
  201806: 251.989,
  201807: 252.006,
  201808: 252.146,
  201809: 252.439,
  201810: 252.885,
  201811: 252.038,
  201812: 251.233,
  201901: 251.712,
  201902: 252.776,
  201903: 254.202,
  201904: 255.548,
  201905: 256.092,
  201906: 256.143,
  201907: 256.571,
  201908: 256.558,
  201909: 256.759,
  201910: 257.346,
  201911: 257.208,
  201912: 256.974,
  202001: 257.971,
  202002: 258.678,
  202003: 258.115,
  202004: 256.389,
  202005: 256.394,
  202006: 257.797,
  202007: 259.101,
  202008: 259.918,
  202009: 260.28,
  202010: 260.388,
  202011: 260.229,
  202012: 260.474,
  202101: 261.582,
  202102: 263.014,
  202103: 264.877,
  202104: 267.054,
  202105: 269.195,
  202106: 271.696,
  202107: 273.003,
  202108: 273.567,
  202109: 274.31,
  202110: 276.589,
  202111: 277.948,
  202112: 278.802,
  202201: 281.148,
  202202: 283.716,
  202203: 287.504,
  202204: 289.109,
  202205: 292.296,
  202206: 296.311,
  202207: 296.276,
  202208: 296.171,
  202209: 296.808,
};

// Elements
const wageField = document.getElementById("wage");
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const calculateButton = document.getElementById("calculate");
const resultSection = document.getElementById("result-section");

// Set defaults based on query strings
document.addEventListener("DOMContentLoaded", function () {
  const queryParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(queryParams.entries());

  if (params.wage) {
    wageField.value = params.wage;
  }

  if (params.month) {
    monthSelect.value = params.month;
  }

  if (params.year) {
    yearSelect.value = params.year;
  }

  // Show the calculations automatically if a wage is set.
  if (params.wage) {
    calculate();
  }
});

// Make sure a future date cannot be selected.
const mostRecentDataKey = Object.keys(inflation).sort().reverse()[0];
const mostRecentDataYear = mostRecentDataKey.slice(0, 4);
const mostRecentDataMonth = mostRecentDataKey.slice(4, 6);
yearSelect.addEventListener("change", (e) => {
  if (mostRecentDataYear === e.target.value) {
    for (let option of monthSelect) {
      if (option.value > mostRecentDataMonth) {
        option.disabled = true;
      }
    }
    if (monthSelect.value > mostRecentDataMonth) {
      monthSelect.value = "01";
    }
  } else {
    for (let option of monthSelect) {
      option.disabled = false;
    }
  }
});

calculateButton.onclick = (e) => {
  if (wageField.value === "" || wageField.value === "0") {
    alert("Please enter a wage amount to calculate.");
    return;
  }

  // Remove query string params so previous values do not show for new calculation.
  const uri = window.location.toString();
  if (uri.indexOf("?") > 0) {
    const clean_uri = uri.substring(0, uri.indexOf("?"));
    window.history.pushState({}, document.title, clean_uri);
  }

  calculate();
};

function calculate() {
  // Fields
  let wage = wageField.value;
  let month = monthSelect.value;
  let year = yearSelect.value;

  // Link
  let link = `https://salaryinflation.com?wage=${wage}&year=${year}&month=${month}`;

  // Safari allows commas in numeric fields but Chrome does not.
  wage = wage.replace(/,/g, "");
  wage = (wage * 1).toFixed(2);

  // Object key to compare against.
  let inflationKey = parseInt(`${year}${month}`);

  // Calculate inflation rate.
  let totalInflation = getInflationPercent(inflationKey);

  let result = parseFloat((wage * (1 + totalInflation / 100)).toFixed(2), 10);
  let difference = parseFloat((result - wage).toFixed(2), 10);
  wage = parseFloat(wage, 10).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  // Comma format the result
  result = result.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  difference = difference.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  // Output values
  let resultPercent = parseFloat(totalInflation.toFixed(2));
  let output = `
    <div id="result-box">
        <p>To keep up with inflation you would need a raise of <mark>$${difference}</mark> (${resultPercent}%).</p>
        <p>Your new wage should be at least:
            <span class="result-wrap">$${result}</span>
        </p>
    </div>
    <p>A wage of <mark>$${result}</mark> in today's dollars (${mostRecentDataMonth}/${mostRecentDataYear}) is the same as <mark>$${wage}</mark> in ${month}/${year} in terms of purchasing power.</p>
    <p>Share this result:</p>
    <input id="link" value="${link}"><button id="copy-link">Copy</button>
    `;
  resultSection.innerHTML = output;
  resultSection.style.display = "block";

  document.getElementById("copy-link").onclick = (e) => {
    e.preventDefault();
    const linkText = document.getElementById("link");
    linkText.select();
    document.execCommand("copy");
    e.target.innerHTML = "Copied!";
  };
}

function getInflationPercent(inflationKey) {
  const base = inflation[inflationKey];
  const current = Object.values(inflation).sort().reverse()[0];

  // Calculate percentage change.
  const change = ((current - base) / base) * 100;
  return change;
}
