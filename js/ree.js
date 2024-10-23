
function saveToLocalStorage(userData, value) {
    localStorage.setItem(userData, JSON.stringify(value));
}


function getFromLocalStorage(userData) {
    const data = localStorage.getItem(userData);
    return data ? JSON.parse(data) : null;
}


function handleSubmit(event) {
    event.preventDefault(); 

    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    
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

    
    let usersData = getFromLocalStorage('usersData') || [];

    
    const existingUser = usersData.find(user => user.email === email);

    if (existingUser) {
        Toast.fire({
            icon: 'error',
            title: 'This email is already registered. Please use a different email.'
        });
        return;
    }

    
    const newUser = {
        userName: userName,
        email: email,
        password: password,
    };

    usersData.push(newUser);
    saveToLocalStorage('usersData', usersData);

   
    Toast.fire({
        icon: 'success',
        title:  'Account created!',
        text:  'Your account has been successfully created.'
    }).then(() => {
        window.location.href = 'login.html'; 
    });
}


function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
