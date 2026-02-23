fetch('/api/user')
.then(res => res.json())
.then(data => {
    if (data.success) {
        document.getElementById("welcome").innerText =
            "Welcome, " + data.user.name + " 🎉";

        document.getElementById("role").innerText =
            "Role: " + data.user.role.toUpperCase();
    } else {
        window.location.href = "login.html";
    }
});
