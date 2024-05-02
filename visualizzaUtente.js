document.addEventListener("DOMContentLoaded", function() {
    const listaUtentiBody = document.getElementById("listaUtentiBody");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector("form[role='search'] button");

    // Funzione per caricare la lista degli utenti
    async function loadUtenti() {
        try {
            const response = await fetch('http://localhost:8080/api/utenti/listautenti');
            
            if (!response.ok) { 
                throw new Error(`HTTP error! status: ${response.status}`); 
            } 
            
            const utenti = await response.json(); 
            
            // Pulisce la tabella prima di aggiungere i nuovi dati
            listaUtentiBody.innerHTML = '';

            // Aggiunge i dati degli utenti alla tabella
            utenti.forEach(utente => {
                const row = listaUtentiBody.insertRow();
                row.innerHTML = `
                    <td>${utente.email}</td>
                    <td>${utente.nome}</td>
                    <td>${utente.cognome}</td>
                    <td>${utente.ruolo}</td>
                    <td>
                        <button data-action="aggiorna" class="btn btn-warning">Aggiorna</button>
                        <button data-action="elimina" data-email="${utente.email}" class="btn btn-danger">Elimina</button>
                    </td>
                `;
            });
        } catch (error) { 
            console.error('Errore durante il caricamento della lista degli utenti:', error); 
            alert("Si è verificato un errore durante il caricamento della lista degli utenti. Si prega di riprovare."); // Messaggio di errore
        } 
    }

    // Funzione per gestire la ricerca degli utenti
    async function searchUtenti() {
        const searchValue = searchInput.value.trim();

        if (searchValue !== '') {
            try {
                const response = await fetch(`http://localhost:8080/api/utenti/visualizzautente?email=${encodeURIComponent(searchValue)}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const utente = await response.json();
                // Pulisce la tabella prima di aggiungere i nuovi dati
                listaUtentiBody.innerHTML = '';

                // Aggiunge i dati dell'utente trovato alla tabella
                const row = listaUtentiBody.insertRow();
                row.innerHTML = `
                    <td>${utente.email}</td>
                    <td>${utente.nome}</td>
                    <td>${utente.cognome}</td>
                    <td>${utente.ruolo}</td>
                    <td>
                        <button data-action="aggiorna" class="btn btn-warning">Aggiorna</button>
                        <button data-action="elimina" data-email="${utente.email}" class="btn btn-danger">Elimina</button>
                    </td>
                `;
            } catch (error) {
                console.error('Errore durante la ricerca dell\'utente:', error);
                alert("Si è verificato un errore durante la ricerca dell'utente. Riprovare.");
            }
        } else {
            alert("Inserisci un'email per la ricerca.");
        }
    }

    // Carica la lista degli utenti al caricamento della pagina
    loadUtenti();

    // Gestione dell'evento di clic del pulsante di ricerca
    searchButton.addEventListener("click", searchUtenti);
});