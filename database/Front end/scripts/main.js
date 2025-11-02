// ===== Login / Signup =====
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');

if(showSignup){
    showSignup.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });
}

if(signupForm){
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        users.push({name, email, password});
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign Up Successful! Please login.');
        signupForm.reset();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
}

if(loginForm){
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = users.find(u => u.email === email && u.password === password);
        if(user){
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid login');
        }
    });
}

// ===== Dashboard =====
const welcomeMsg = document.getElementById('welcomeMsg');
if(welcomeMsg){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
        welcomeMsg.innerText = `Welcome, ${currentUser.name}!`;
    }
}

const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
    });
}

// ===== Book Appointment =====
const bookForm = document.getElementById('bookForm');
if(bookForm){
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const facility = document.getElementById('facility').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        appointments.push({facility, date, time, status: 'Booked'});
        localStorage.setItem('appointments', JSON.stringify(appointments));
        document.getElementById('bookMsg').innerText = 'Appointment booked successfully!';
        bookForm.reset();
    });
}

// ===== View Appointments =====
const appointmentsTable = document.getElementById('appointmentsTable');
if(appointmentsTable){
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const tbody = appointmentsTable.querySelector('tbody');
    appointments.forEach(a => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${a.facility}</td><td>${a.date}</td><td>${a.time}</td><td>${a.status}</td>`;
        tbody.appendChild(row);
    });
}
