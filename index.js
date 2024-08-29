document.addEventListener('DOMContentLoaded', function() {
    const notes = document.querySelectorAll('input[type="text"]');
    const dates = document.querySelectorAll('input[type="date"]');
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const imgContainers = document.querySelectorAll('.img-container');

    // Cargar notas guardadas al inicio
    notes.forEach(note => {
        const key = note.getAttribute('data-key');
        const savedNote = localStorage.getItem(key);
        if (savedNote) {
            note.value = savedNote;
        }

        note.addEventListener('input', function() {
            localStorage.setItem(key, note.value);
        });
    });

    // Cargar fechas guardadas al inicio
    dates.forEach(date => {
        const key = date.getAttribute('data-key');
        const savedDate = localStorage.getItem(key);
        if (savedDate) {
            date.value = savedDate;
        }

        date.addEventListener('input', function() {
            localStorage.setItem(key, date.value);
        });
    });

    // Cargar imágenes guardadas al inicio
    imgContainers.forEach(container => {
        const key = container.getAttribute('data-key');
        const savedImage = localStorage.getItem(key);
        if (savedImage) {
            container.innerHTML = <img src="${savedImage}" alt="Boucher del Mes" />;
        }
    });

    // Guardar imágenes seleccionadas
    fileInputs.forEach(input => {
        input.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const container = input.closest('tr').querySelector('.img-container');
            const key = container.getAttribute('data-key');

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgSrc = e.target.result;
                    container.innerHTML = <img src="${imgSrc}" alt="Boucher del Mes" />;
                    localStorage.setItem(key, imgSrc);
                };
                reader.readAsDataURL(file);
            }
        });
    });
});