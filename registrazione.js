async function registraUtente(event) {
    try {
        event.preventDefault(); 
        
        const form = event.target;
        const formData = new FormData(form);

        const response = await fetch('http://localhost:8080/api/utenti/registrazione', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (response.ok) {
            alert("Registrazione avvenuta con successo!");
        } else {
            const errorMessage = await response.text();
            throw new Error(`Registrazione fallita: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        alert("Si è verificato un errore durante la registrazione. Si prega di riprovare.");
    }
}

const registrazioneForm = document.getElementById('registrazioneForm');
registrazioneForm.addEventListener('submit', registraUtente);