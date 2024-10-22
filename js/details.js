const API_KEY = "5670268c";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`);
        const data = await response.json();

        if (data.Response === "True") {
            const detailsContainer = document.getElementById('detailsContainer');
            detailsContainer.innerHTML = `
                <h2>${data.Title}</h2>
                <img src="${data.Poster}" alt="${data.Title}">
                <p><strong>السنة:</strong> ${data.Year}</p>
                <p><strong>المخرج:</strong> ${data.Director}</p>
                <p><strong>الملخص:</strong> ${data.Plot}</p>
                <button onclick="window.history.back()">عودة</button>
            `;
        } else {
            const detailsContainer = document.getElementById('detailsContainer');
            detailsContainer.innerHTML = `
                <h2>لم يتم العثور على تفاصيل الفيلم</h2>
                <button onclick="window.history.back()">عودة</button>
            `;
        }
    } catch (error) {
        console.error('حدث خطأ:', error);
        const detailsContainer = document.getElementById('detailsContainer');
        detailsContainer.innerHTML = `
            <h2>حدث خطأ أثناء تحميل تفاصيل الفيلم</h2>
            <button onclick="window.history.back()">عودة</button>
        `;
    }
});
