document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // استرجاع جميع المستخدمين المخزنين
    const storedUsers = JSON.parse(localStorage.getItem("usersData"));

    if (!storedUsers || storedUsers.length === 0) {
        Toast.fire({
            icon: "warning",
            title: "No users found. Please sign up first"
        });
        return;
    }

    const foundUser = storedUsers.find(user => user.email === email && user.password === password);

    if (foundUser) {
        Toast.fire({
            icon: "success",
            title: "Login successful!"
        }).then(() => {
            window.location.href = 'main.html'; 
        });
    } else {
        Toast.fire({
            icon: "error",
            title: "Invalid email or password"
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
