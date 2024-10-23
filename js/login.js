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

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("userData"));

    // Check if users is an array and not null
    if (!Array.isArray(users)) {
        console.error("Users data is not an array:", users); // Log the retrieved value
        Toast.fire({
            icon: "warning",
            title: "No users found. Please sign up first."
        });
        return;
    }

    // Find the user based on email and password
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
        Toast.fire({
            icon: "success",
            title: "Login successful!"
        }).then(() => {
            window.location.href = 'main.html'; // Redirect to main page
        });
    } else {
        Toast.fire({
            icon: "error",
            title: "Invalid email or password."
        });
    }
});