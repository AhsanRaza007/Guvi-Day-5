//Solving problems using array functions on rest countries data.
let request = new XMLHttpRequest();

request.open('GET', 'https://restcountries.eu/rest/v2/all', true);

request.send();
let data = [];
request.onload = function(){
    data = JSON.parse(this.response);
    console.log("Asian coutries ", getAsianCountries());
    console.log("Countries with Population less than 2 Lacs", getCountriesWithPopulationLessThan2Lacs());
    console.log("Country Name, capital, flag", printDetails());
    console.log("Total Population of all coutries", totalPopulation());
    console.log("Total Asian Population", totalAsianPopulation());
    console.log("Countries with USD as Currency", getCountriesWithCurrencyUSD());
};


//Get all the countries from Asia continent using Filter function
function getAsianCountries(){
    return data.filter((country)=>{
        return country.region === 'Asia';
    });
}



//Get all the countries with population of less than 2 lacs using Filter function
function getCountriesWithPopulationLessThan2Lacs(){
    return data.filter((country)=>{
        return country.population < 200000;
    });
}

//Print the following details name, capital, flag using forEach function
function printDetails(){
    let details = []
    data.forEach((country)=>{
        let detail = {};
        detail.name = country.name;
        detail.capital = country.capital;
        detail.flag = country.flag;
        details.push(detail)
    })
    return details;
}

//Print the total population of countries using reduce function
function totalPopulation(){
    return data.reduce((acc, country)=>{
        return acc + country.population;
    }, 0)
}
//Print the total population of countries in Asia continent using reduce and filter function
function totalAsianPopulation(){
    let asianCountries = getAsianCountries();
    return asianCountries.reduce((acc, country)=>{
        return acc + country.population;
    }, 0)
}

//Print the country which use US Dollars as currency. 
function getCountriesWithCurrencyUSD(){
    return data.filter((country)=>{
        return country.currencies.filter((currency)=>{
            return currency.code === 'USD';
        }).length >= 1;
    })
}

request.onerror = function(){
    alert('Network Error');
}
