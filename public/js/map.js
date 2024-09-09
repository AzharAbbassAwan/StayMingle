
	// // TO MAKE THE MAP APPEAR YOU MUST
	// // ADD YOUR ACCESS TOKEN FROM
	// // https://account.mapbox.com
	// mapboxgl.accessToken = "pk.eyj1IoiZGVsdGEtc3RlZHVlbnQ 65325f6_:102iLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VHlwvx7rFvtSE4KLOQ";
    // const map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v9',
    //     projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    //     zoom: 1,
    //     center: [30, 15]
    // });

    // map.addControl(new mapboxgl.NavigationControl());
    // map.scrollZoom.disable();

    // map.on('style.load', () => {
    //     map.setFog({}); // Set the default atmosphere style
    // });

    // // The following values can be changed to control rotation speed:

    // // At low zooms, complete a revolution every two minutes.
    // const secondsPerRevolution = 240;
    // // Above zoom level 5, do not rotate.
    // const maxSpinZoom = 5;
    // // Rotate at intermediate speeds between zoom levels 3 and 5.
    // const slowSpinZoom = 3;

    // let userInteracting = false;
    // const spinEnabled = true;

    // function spinGlobe() {
    //     const zoom = map.getZoom();
    //     if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
    //         let distancePerSecond = 360 / secondsPerRevolution;
    //         if (zoom > slowSpinZoom) {
    //             // Slow spinning at higher zooms
    //             const zoomDif =
    //                 (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
    //             distancePerSecond *= zoomDif;
    //         }
    //         const center = map.getCenter();
    //         center.lng -= distancePerSecond;
    //         // Smoothly animate the map over one second.
    //         // When this animation is complete, it calls a 'moveend' event.
    //         map.easeTo({ center, duration: 1000, easing: (n) => n });
    //     }
    // }

    // // Pause spinning on interaction
    // map.on('mousedown', () => {
    //     userInteracting = true;
    // });
    // map.on('dragstart', () => {
    //     userInteracting = true;
    // });

    // // When animation is complete, start spinning if there is no ongoing interaction
    // map.on('moveend', () => {
    //     spinGlobe();
    // });

    // spinGlobe();
    //console.log(locationCoordinates);
    //console.log(locationName);
    var map = L.map('map').setView([ lattitude, longitude ], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([ lattitude, longitude ]).addTo(map)
        .bindPopup(`${locationName} <br> exact location will be provided after booking.`)
        .openPopup();