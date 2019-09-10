window.addEventListener('load', () => {
  //set all selectors and empty variables
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperatureDescription');
  let temperatureDegree = document.querySelector('.degrees');
  let locationTimezone = document.querySelector('.locationTimezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  //only run if the location is allowed
  if(navigator.geolocation){
    //gets latitude and longitude for accurate stats
    navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //uses proxy to allow use of the api
      const proxy = `https://cors-anywhere.herokuapp.com/`;
      //the site in which the weather info is recieved and adding in the latitude and longitude for location
      const api = `${proxy}https://api.darksky.net/forecast/b160ae5fe4240542689e8716d6fbbe1c/${lat},${long}`

      fetch(api)
        //waits for everything to load from api
        .then(response =>{
          //turns all data into json format
          return response.json();
        })
        .then(data =>{
          console.log(data);
          //pulls out the temperature and weather summary
          const {temperature, summary, icon} = data.currently;

          //sets the properties in the html document
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //Celcius temperature and calculation
          let celcius = (temperature - 32) * (5/9);

          //run the setIcons function to matching icon
          setIcons(icon, document.querySelector('.icon'));

          //toggle Celcius/Fahrenheit
          temperatureSection.addEventListener('click', ()=>{
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celcius);
            }else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            };
          });
        })
    });
  }else {
    alert('Location not Available');
  }

  //changes Icons to match current weather
  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    //replaces the "-" with an "_" and Capitalizes to make readable by the Skycons File
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    //replaces the Icon
    return skycons.set(iconID, Skycons[currentIcon]);
  };
});
