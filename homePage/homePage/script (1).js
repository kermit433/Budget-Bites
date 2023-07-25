
function initAutocomplete(){
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.9526, lng: -75.1652 },
    mapTypeControl: false,
    streetViewControl: false,
    zoom: 13,
    mapTypeId: "roadmap",
    styles: [{"featureType" : "poi", stylers: [{ visibility: "off"}],},{"featureType" : "transit", stylers: [{ visibility: "off"}],}]
      });

const convenienceIcon = 'Roboto-Regular.png'

    const pantryIcon = 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=P&psize=20&font=fonts/Roboto-Regular.ttf&color=ff222222&ax=44&ay=48&scale=1'

    const groceryIcon = 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=G&psize=18&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1'

  // Function to create new markers

  function createMarker(lat,lng,name,iconName){
        let themark = new google.maps.Marker({map,position:{lat: lat, lng: lng}, title:name,icon:iconName})
        if(iconName == groceryIcon){
          groceryMarkers.push(themark)}
        if (iconName == pantryIcon)                             {
          pantryMarkers.push(themark)}
        if (iconName == convenienceIcon){
          convenienceMarkers.push(themark)}
        }
      
  //Markers for the map

  let markers = []

  let convenienceMarkers = []

  let pantryMarkers = []

  let groceryMarkers = []


  createMarker(39.954868, -75.192734,"GIANT (3401 Chestnut St.)",groceryIcon)
  createMarker(39.954411, -75.203018,"ACME (4001 Walnut St.)", groceryIcon)

  createMarker(39.965070, -75.205970, "Quick Stop 2 Deli & Market (4110 Lancaster Ave.)", convenienceIcon)

  createMarker(39.949320, -75.229890, "Wharton Wesley Helping Food Pantry (5431 Catharine St.)", pantryIcon)

  createMarker(39.963970,-75.197330, "Gonzalez Grocery (621 N 38th St.)", groceryIcon)
  createMarker(39.954250, -75.176361, "Trader Joe's (2121 Market St.)", groceryIcon)
  createMarker(39.959640, -75.223830, "52nd Food Market (5138 Market St.)", convenienceIcon)

  createMarker(39.955233, -75.209131, "Superemo Food Market of Walnut (4301 Walnut St.)", groceryIcon)

  
  


  console.log(convenienceMarkers)
  
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  const dropdownBtnMap = document.getElementById("dropdownBtn");
  const dropdownBtnTest = document.getElementById("mapDropdownM");
  const anotherBtnTest = document.getElementById("navbarDrop");

  map.controls[google.maps.ControlPosition.LEFT_TOP].push(input);
map.controls[google.maps.ControlPosition.LEFT_TOP].push(dropdownBtnMap);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(dropdownBtnTest);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(anotherBtnTest);

  const groceryFilter = document.getElementById("mapDropContents1");
  groceryFilter.addEventListener("change", function(){
    if (groceryFilter.checked) 
      {groceryMarkers.forEach(groceryMark =>groceryMark.setMap(map));} 
    else
      {groceryMarkers.forEach(groceryMark => groceryMark.setMap(null));}});

  const convenienceFilter = document.getElementById("mapDropContents2");
  convenienceFilter.addEventListener("change", function(){
    if (convenienceFilter.checked) 
      {convenienceMarkers.forEach(cMark =>cMark.setMap(map));} 
    else
      {convenienceMarkers.forEach(cMark => cMark.setMap(null));}});

  const pantryFilter = document.getElementById("mapDropContents3");
  pantryFilter.addEventListener("change", function(){
    if (pantryFilter.checked) 
      {pantryMarkers.forEach(pMark =>pMark.setMap(map));} 
    else
      {pantryMarkers.forEach(pMark => pMark.setMap(null));}});

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }


    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
    // Set variables for user location mark and shadow
      const pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "FE7569",
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));

      const pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon: pinImage,
          shadow: pinShadow,
          title: place.name + " (your location)",
          position: place.geometry.location,
        },))

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

window.initAutocomplete = initAutocomplete;
