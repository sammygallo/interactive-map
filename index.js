/* GOALS
### Obtain the user's current location.

### Map the location on a Leaflet map.

### Allow the user to select a business type from a list and map the five nearest locations on the map using the Foursquare API.
        Add a simple select interface for the user with the following values: coffee, restaurant, hotel, and market. Next, create a space where you will place your map
*/

/*
What events will your application need?
What APIs will you need and in what order?
How will you obtain the user's location?
How will you add the user's location to the map?
How will you get the selected location from the user?
How will you add that information to the map?
*/


async function getCoords() {
    pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    return [pos.coords.latitude, pos.coords.longitude]
}
