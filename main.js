document.addEventListener('DOMContentLoaded', function() {
    const selectedArtworkIds = [20684, 656, 28560, 129884, 137125, 225699];

    const gallery = document.getElementById('gallery');
    const linksContainer = document.getElementById('painting-links');
    selectedArtworkIds.forEach(id => {
        fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
            .then(response => response.json())
            .then(data => {
                const artwork = data.data;
                const imagePath = `images/${artwork.id}.jpg`;

                const artworkElement = document.createElement('div');
                artworkElement.classList.add('artwork');

                artworkElement.innerHTML = `
                    <img src="${imagePath}" alt="${artwork.title}" onclick="showPopup(${artwork.id})">
                    <p>${artwork.title}</p>
                    <div class="artwork-popup" id="popup-${artwork.id}">
                        <span class="close-popup" onclick="closePopup(${artwork.id})">&times;</span>
                        <img src="${imagePath}" alt="${artwork.title}">
                        <h2>${artwork.title}</h2>
                        <p>${artwork.artist_display}</p>
                        <p>${artwork.date_display}</p>
                        <p class="description">${artwork.description}</p>
                    </div>
                `;

                gallery.appendChild(artworkElement);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});

function showPopup(id) {
    const popup = document.getElementById(`popup-${id}`);
    if (popup) {
        popup.style.display = 'block';
    }
}

function closePopup(id) {
    const popup = document.getElementById(`popup-${id}`);
    if (popup) {
        popup.style.display = 'none';
    }
}