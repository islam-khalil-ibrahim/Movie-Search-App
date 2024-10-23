
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
            title: 'يرجى إدخال اسم مستخدم صحيح.'
        });
        return;
    }

   
    if (!validateEmail(email)) {
        Toast.fire({
            icon: 'error',
            title: 'يرجى إدخال عنوان بريد إلكتروني صحيح.'
        });
        return;
    }

    
    if (!password || password.length < 6) {
        Toast.fire({
            icon: 'error',
            title: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.'
        });
        return;
    }

    if (password !== confirmPassword) {
        Toast.fire({
            icon: 'error',
            title: 'كلمتا المرور غير متطابقتين. يرجى المحاولة مرة أخرى.'
        });
        return;
    }

    
    let usersData = getFromLocalStorage('usersData') || [];

    
    const existingUser = usersData.find(user => user.email === email);

    if (existingUser) {
        Toast.fire({
            icon: 'error',
            title: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد إلكتروني آخر.'
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
        title: 'تم إنشاء الحساب!',
        text: 'تم إنشاء حسابك بنجاح.'
    }).then(() => {
        window.location.href = 'login.html'; 
    });
}


function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
