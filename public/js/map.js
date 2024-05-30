
	mapboxgl.accessToken =mapToken;
   
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:"mapbox://styles/mapbox/satellite-streets-v12",
        center: detail.geometry.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    const marker1 = new mapboxgl.Marker({color:"red"})
        .setLngLat(detail.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset:25}).setHTML(
            `<h4>${detail.location}</h4><p>Exact location will be provided after booking</p>`
        ))
        .addTo(map);

