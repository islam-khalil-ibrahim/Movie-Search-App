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
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // التحقق من وجود اسم المستخدم
    if (!userName) {
        Toast.fire({
            icon: 'error',
            title: 'يرجى إدخال اسم مستخدم صحيح.'
        });
        return;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
        Toast.fire({
            icon: 'error',
            title: 'يرجى إدخال عنوان بريد إلكتروني صحيح.'
        });
        return;
    }

    // التحقق من طول كلمة المرور
    if (!password || password.length < 6) {
        Toast.fire({
            icon: 'error',
            title: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.'
        });
        return;
    }

    // التحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {
        Toast.fire({
            icon: 'error',
            title: 'كلمتا المرور غير متطابقتين. يرجى المحاولة مرة أخرى.'
        });
        return;
    }

    // التحقق مما إذا كان البريد الإلكتروني موجودًا
    const existingUser = JSON.parse(localStorage.getItem('userData'));

    if (existingUser && existingUser.email === email) {
        Toast.fire({
            icon: 'error',
            title: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد إلكتروني آخر.'
        });
        return;
    }

    // حفظ البيانات في localStorage
    const userData = {
        userName: userName,
        email: email,
        password: password,
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    Toast.fire({
        icon: 'success',
        title: 'تم إنشاء الحساب!',
        text: 'تم إنشاء حسابك بنجاح.'
    }).then(() => {
        window.location.href = 'login.html'; // توجيه المستخدم إلى صفحة تسجيل الدخول
    });
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
