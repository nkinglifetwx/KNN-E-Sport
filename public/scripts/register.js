document.addEventListener('click', (event) => {
    if (event.target.id == 'register-button') {
        event.preventDefault();
        const pseudo = document.getElementById('pseudo').value;
        const password = document.getElementById('password').value;

        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username: pseudo, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = './index.html';
            } else {
                errors = data.errors;
                document.getElementById('pseudo-error').textContent = ``;
                document.getElementById('password-error').textContent = ``;
                errors.forEach(error => {
                    if (error.field == 'username' ||error.error_code == 'username_taken') {
                        document.getElementById('pseudo-error').style.display = 'block';
                        document.getElementById('pseudo-error').textContent += `${error.message}\n`;
                    }
                    else if (error.field == 'password') {
                        document.getElementById('password-error').style.display = 'block';
                        document.getElementById('password-error').textContent += `${error.message}\n`;
                    }
                });
            }
        })
        .catch(error => {
            console.error('Une erreur est survenue lors de l\'inscription :', error);
        });
    }
})