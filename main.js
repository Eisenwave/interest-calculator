const I_START_CAPITAL = document.getElementById("start-capital");
const I_SAVING_RATE = document.getElementById("saving-rate");
const I_INTEREST = document.getElementById("annual-interest");
const I_DURATION = document.getElementById("duration");

const O_SUM = document.getElementById("output-sum");
const O_PAYMENTS = document.getElementById("output-payments");
const O_INTEREST = document.getElementById("output-interest");
const O_ROI = document.getElementById("output-roi");

const IMG_FLAG_DE = "img/flag_de.svg";
const IMG_FLAG_EN = "img/flag_uk.svg";

const LANG_DE = {
    title: "Zinsrechner",
    start_capital: "Anfangskapital",
    saving_rate: "Monatliche Sparrate",
    annual_interest: "Jährlicher Zinssatz [%]",
    duration: "Spardauer [Jahre]",
    sum: "Endkapital",
    payments: "Einzahlungen",
    interest: "Zins",
    roi: "Rendite"
};

const LANG_EN = {
    title: "Interest Calculator",
    start_capital: "Initial Capital",
    saving_rate: "Monthly Saving Rate",
    annual_interest: "Annual Interest [%]",
    duration: "Saving Duration [years]",
    sum: "Sum",
    payments: "Total Payments",
    interest: "Interest",
    roi: "Yield"
};

function stringify(number) {
    return Number(number).toLocaleString();
}

function yearlyToMonthlyInterest(yearly) {
    let yearlyFactor = 1 + yearly / 100;
    return 100 * (Math.pow(yearlyFactor, 1.0/12) - 1);
}

function calc() {
    let capital = +I_START_CAPITAL.value;
    let savingRate = +I_SAVING_RATE.value;
    let interest = +I_INTEREST.value;
    let duration = +I_DURATION.value;

    let monthlyInterestFactor = 1 + yearlyToMonthlyInterest(interest) / 100;

    let sum = capital;
    for (let i = 0; i < duration * 12; ++i) {
        sum += savingRate;
        sum *= monthlyInterestFactor;
    }

    let savings = (savingRate * duration * 12);
    let interestSum = sum - savings - capital;
    let roi = (sum === 0 ? 0 : sum / (capital + savings) - 1) * 100;

    O_SUM.innerText = stringify(Math.round(sum));
    O_PAYMENTS.innerText = stringify(savings);
    O_INTEREST.innerText = stringify(Math.round(interestSum));
    O_ROI.innerText = stringify(roi) + "%";
}

function toggleLanguage(element) {
    if (element.lang === "en") {
        element.lang = "de";
        element.src = IMG_FLAG_DE;
        applyLanguage(LANG_DE);
    }
    else {
        element.lang = "en";
        element.src = IMG_FLAG_EN;
        applyLanguage(LANG_EN);
    }
}

function applyLanguage(language) {
    for (let element of document.getElementsByTagName("*")) {
        let key = element.id;
        if (!key.startsWith("text-")) {
            continue;
        }
        key = key.slice(5).replace('-', '_');
        element.innerText = language[key];
    }
}

toggleLanguage(document.getElementById("checkbox-lang"));
calc()
