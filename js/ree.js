// Toast initialization
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload

    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validate inputs
    if (!userName) {
        Toast.fire({
            icon: 'error',
            title: 'Please enter a valid username.'
        });
        return;
    }

    if (!validateEmail(email)) {
        Toast.fire({
            icon: 'error',
            title: 'Please enter a valid email address.'
        });
        return;
    }

    if (!password || password.length < 6) {
        Toast.fire({
            icon: 'error',
            title: 'Password must be at least 6 characters long.'
        });
        return;
    }

    if (password !== confirmPassword) {
        Toast.fire({
            icon: 'error',
            title: 'Passwords do not match. Please try again.'
        });
        return;
    }

    // Retrieve existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('userData')) || [];

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        Toast.fire({
            icon: 'error',
            title: 'This email is already registered. Please use a different email.'
        });
        return;
    }

    // Create a new user object
    const userData = {
        userName: userName,
        email: email,
        password: password,
    };

    users.push(userData); // Add the new user to the array
    localStorage.setItem('userData', JSON.stringify(users)); // Store the updated array in localStorage

    Toast.fire({
        icon: 'success',
        title: 'Account created!',
        text: 'Your account has been created successfully.'
    }).then(() => {
        window.location.href = '../page/login.html'; // Redirect to login page
    });
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}