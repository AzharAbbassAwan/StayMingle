var map = L.map('map').setView([ lattitude, longitude ], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker([ lattitude, longitude ]).addTo(map)
    .bindPopup(`${locationName} <br> exact location will be provided <br> after booking.`)
    .openPopup();