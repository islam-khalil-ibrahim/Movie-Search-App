const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  document.getElementById("userName").textContent = loggedInUser.userName;
  document.getElementById("userEmail").textContent = loggedInUser.email;
  document.getElementById("userPassword").textContent = loggedInUser.password;
} else {
  console.log("No logged in user found.");
}
