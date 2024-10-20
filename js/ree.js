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
    event.preventDefault();

    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!userName) {
        Toast.fire({
            icon: 'error',
            title: 'Please enter a valid user name.'
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

    // Save data to localStorage
    const userData = {
        userName: userName,
        email: email,
        password: password,
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    Toast.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Your account has been created successfully.'
    }).then(() => {
        window.location.href = 'login.html';
    });
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

