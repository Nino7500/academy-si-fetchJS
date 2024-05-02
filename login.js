document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

   
    sha256(password)
        .then(passwordHash => {
            
            fetch('http://localhost:8080/api/utenti/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                console.log("Login successful");
                console.log("Token:", data.token);
            })
            .catch(error => {
                if (error.message === 'Network response was not ok') {
                    window.location.href = 'registrazione.html';
                } else {
                    console.error("Login failed:", error.message);
                }
            });
        })
        .catch(error => {
            console.error("Error hashing password:", error.message);
        });
});


function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    return crypto.subtle.digest("SHA-256", msgBuffer)
        .then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
            return hashHex;
        });
}