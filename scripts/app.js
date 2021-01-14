const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time =  document.querySelector('img.time');
const icon =   document.querySelector('.icon img');

//we gonna make func to get the update city data and show it on UI
//output all data on DOM
const updateUI = (data) => {
 
  //destructuring data we could do this 
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  //destructure properties from an objects

  const{ cityDets, weather} = data;

  //update details template
  details.innerHTML = `
   <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
  `
//updatingg the night/day & icon images
const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc);

//----we are going to use Ternarry operation instad
/// the srtucture is like this const result = condition? "value 1" : "value 2";

// let timeSrc = null;
// if(weather.IsDayTime){
//   timeSrc = 'img/day.svg';
//   } else{
//     timeSrc = 'img/night.svg';
//   }

let timeSrc = weather.IsDayTime ? 'img/day.svg':'img/night.svg' ;

  time.setAttribute('src', timeSrc);

  //we added bootstarp to not show hard coded html by addin a class of d-none on line 21
  //so we can first chek it and then showing the data to user
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none')
  };

};

const updateCity = async (city) =>{
  //console.log(city);
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

   return {
     //when the value and property are same we can delete one of them the name is object shorthand notation
  //   cityDets: cityDets,weather: weather
  cityDets, weather};

};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value 
    const city  = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))
    //set local storage
    localStorage.setItem('city', city)
});

if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
  .then(data => updateUI(data))
  .catch(err => console.log(err));
}