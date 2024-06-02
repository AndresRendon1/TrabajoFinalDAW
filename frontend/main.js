document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
        alert('Registration successful');
    } else {
        alert('Registration failed');
    }
});

document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login successful');
        window.location.href = 'reservations.html';
    } else {
        alert('Login failed');
    }
});

document.getElementById('reservation-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const carId = document.getElementById('car-id').value;
    const extras = document.getElementById('extras').value;
    const token = localStorage.getItem('token');
    const response = await fetch('/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ car_id: carId, extras }),
    });
    if (response.ok) {
        alert('Reservation created');
        loadReservations();
    } else {
        alert('Reservation creation failed');
    }
});

async function loadReservations() {
    const token = localStorage.getItem('token');
    const response = await fetch('/reservations', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const reservations = await response.json();
    const reservationsList = document.getElementById('reservations-list');
    reservationsList.innerHTML = '';
    reservations.forEach(reservation => {
        const li = document.createElement('li');
        li.textContent = `Reservation ID: ${reservation.id}, Car ID: ${reservation.car_id}, Extras: ${reservation.extras}`;
        reservationsList.appendChild(li);
    });
}

if (document.getElementById('reservations-list')) {
    loadReservations();
}
