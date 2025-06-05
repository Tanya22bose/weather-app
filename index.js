async function fetchData(target) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${target}&aqi=no`;
    const response = await fetch(url); //fetch returns a promise
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { localtime, country },
    } = await response.json();

    //get dom nodes
    const temp = document.querySelector(".temp");
    const location = document.querySelector(".location");
    const timeDate = document.querySelector(".time-date");
    const weatherIcon = document.querySelector(".condition-img");
    const conditionTag = document.querySelector(".condition");
    const event = new Date(localtime);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    //update the dom nodes
    temp.innerHTML = temp_c + "°C";
    location.innerHTML = country;
    timeDate.innerHTML = event.toLocaleDateString(undefined, options);
    weatherIcon.src = icon;
    conditionTag.innerHTML = text;
  } catch (err) {
    console.log(err);
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const target = document.querySelector(".search-input");
  fetchData(target.value);
});
