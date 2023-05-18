
let region = new Set();;
let mainData = []
let subregion = [];
let country = [];
async function getData() {
    const response = await fetch('https://restcountries.com/v3.1/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json(); //extract JSON from the http response
    console.log("myjson", data)
    data.forEach(ele => { 
        // data for region ,subregion and country;
        region.add(ele.region);
        subregion.push({ "region": ele.region, "subregion": ele.subregion?ele.subregion:'kaushal' })
        country.push({ "region": ele.region, 'subregion': ele.subregion?ele.subregion:'kaushal', "countryName": ele.name.common })

        let langauges='';
        // for (const property in ele.languages) {
        //      console.log(ele.languages[property])
        //     langauges = " | " + ele.languages[property];
        // }
        for (const key in ele.languages) {
            if (ele.languages.hasOwnProperty(key)) {
              console.log(`${key}: ${ele.languages[key]}`);

              langauges= langauges +ele.languages[key] +" |" 
            }
          }
        console.log("lagauge",langauges)
        mainData.push({ "region": ele.region, 'subregion': ele.subregion?ele.subregion:'kaushal', "countryName": ele.name.common, 'capital': ele.capital, 'polulation': ele.population, "langauge": langauges })
    });

    getAllregion(region);
    document.getElementById("sub_region").disabled = true;
    document.getElementById("country").disabled = true;
}

getData();


// get the all the region and append to select in region;
function getAllregion(data) {
    data.forEach(ele => {
        var option = document.createElement("option");
        option.text = ele;
        option.value = ele;
        var select = document.getElementById("region");
        select.appendChild(option);

    })

}


let selectedRegion;

function clickRegion(event) {
    document.getElementById("country").disabled = true;
    let value = event.target.value;
    selectedRegion = value;
    document.getElementById("sub_region").disabled = false;
    document.getElementById("sub_region").value = '';
    document.getElementById("country").value = '';
    let subregionDropDown = subregion.filter(ele => {
        return ele.region == value;
    })
    let mainDataBaseOnREgion = mainData.filter(ele => {
        return ele.region == value;
    })
    var selectobject = document.getElementById("sub_region");
    selectobject.innerHTML = ''
    subregionDropDown.forEach(ele => {
        var option = document.createElement("option");
        option.text = ele.subregion;
        option.value = ele.subregion;
        var select = document.getElementById("sub_region");
       
        select.appendChild(option);

    })
    document.querySelectorAll("#row").forEach(elem => elem.remove())
    renderDataInTheTable(mainDataBaseOnREgion)




}


let selectedSubregion;
function ClickSubRegion(event) {
    document.getElementById("country").disabled = false;
    document.getElementById("country").value = '';
    let value = event.target.value;
    selectedSubregion = value;
    let countryList = country.filter(ele =>
        ele.region == selectedRegion && ele.subregion == value
    )
    let subRegionData = mainData.filter(ele =>
        ele.region == selectedRegion && ele.subregion == value
    )
    // genrateOption(countryList,'country')
    var selectobject = document.getElementById("country");
    selectobject.innerHTML = ''
    countryList.forEach(ele => {
        var option = document.createElement("option");
        option.text = ele.countryName;
        option.value = ele.countryName;
        var select = document.getElementById("country");
        select.appendChild(option);

    })
    document.querySelectorAll("#row").forEach(elem => elem.remove())
    console.log("sunregionData", subRegionData)
    renderDataInTheTable(subRegionData)

}


let selectedCountry;

function ClickCountry(event) {
    let value = event.target.value;
    selectedCountry = value;
    console.log(selectedCountry)
    let mainDataBaseOnREgion = mainData.filter(ele => {
        return ele.region == selectedRegion && ele.subregion == selectedSubregion && ele.countryName == value;
    })
    console.log("sunregionData", mainDataBaseOnREgion)
    document.querySelectorAll("#row").forEach(elem => elem.remove())

    renderDataInTheTable(mainDataBaseOnREgion)



}


function renderDataInTheTable(data) {
    let mytable = document.getElementById("table-body");
    data.forEach(todo => {
        let newRow = document.createElement("tr");
        newRow.setAttribute("id", "row");
        Object.values(todo).forEach((value) => {
            let cell = document.createElement("td");
            cell.innerText = value;
            newRow.appendChild(cell);
        })
        setTimeout(() => {
            mytable.appendChild(newRow);
        }, 200);

    });

}

function genrateOption(data, id) {
    data.forEach(ele => {
        var option = document.createElement("option");
        option.text = ele;
        option.value = ele;
        var select = document.getElementById(id);
        select.appendChild(option);

    })
}