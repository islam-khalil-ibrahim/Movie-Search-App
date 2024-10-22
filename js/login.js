document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        Toast.fire({
            icon: "warning",
            title: "No users found. Please sign up first."
        });
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        Toast.fire({
            icon: "success",
            title: "Login successful!"
        }).then(() => {
            window.location.href = 'main.html';
        });

    } else {
        Toast.fire({
            icon: "error",
            title: "Invalid email or password."
        });
    }
});


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
