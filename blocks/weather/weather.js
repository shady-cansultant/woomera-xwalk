export default async function decorate(block) {
  const key = 'e357ff7eee8241a792f235240241108';
  const city = block.children[0].children[0].children[0].textContent;
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // eslint-disable-next-line
      // console.log(data);
      block.innerHTML = `
      <div class="weather-inner">
        <div>
          <div>${city}, ${data.location.country}</div>
          <b class="weather-temp">${data.current.temp_c} °C</b>
          <div>${data.current.condition.text}</div>
        </div>
        <img class="weather-img" src="${data.current.condition.icon}" alt="${data.current.condition.text} icon"/>
      </div>
      `;
    })
    .catch(() => {
      block.innerHTML = `
        <i>Error</i>
      `;
    });
}
