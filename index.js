var map;


// ### Get User's Coordinates ###
async function getUserCoords() {
  pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  return (userCoords = [pos.coords.latitude, pos.coords.longitude]);
}

// ### Initialize Map and Create Marker for User's Location ###
async function setMap() {
  await getUserCoords();
  map = L.map("map").setView([userCoords[0], userCoords[1]], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);
  var marker = L.marker([userCoords[0], userCoords[1]]).addTo(map);
  marker.addTo(map).bindPopup("<p1><b>You are here</b></p1>").openPopup();
}

// ### Retrieve Local Businesses From User Selection and Mark the Map###
async function getBusinessInfo() {
  let businesses = [];

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3nGpFK5DFHVgJ141Lb+ZP7MmZ+b9euSOANXYDxbvLlKw=",
    },
  };

  response = fetch(
    `https://api.foursquare.com/v3/places/search?query=${
      businessType.value
    }&ll=${userCoords[0].toFixed(2)}%2C${userCoords[1].toFixed(2)}&limit=5`,
    options
  )
    .then((response) => response.json())
    .then((response) =>
      response.results.forEach((element) => {
        businesses.push(element);
      })
    )
    .catch((err) => console.error(err));

  await response;
  businesses.forEach((element) => {
    marker = L.marker([element.geocodes.main.latitude,element.geocodes.main.longitude]).addTo(map);
    marker.addTo(map).bindPopup(`<p1><b>${element.name}</b></p1>`).openPopup();
  });
}