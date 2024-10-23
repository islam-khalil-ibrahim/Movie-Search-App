// دالة لحفظ البيانات في localStorage
function saveToLocalStorage(userData, value) {
    localStorage.setItem(userData, JSON.stringify(value));
}

// دالة لاسترجاع البيانات من localStorage
function getFromLocalStorage(userData) {
    const data = localStorage.getItem(userData);
    return data ? JSON.parse(data) : null;
}

// دالة للتعامل مع تسجيل المستخدم
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

    // استرجاع بيانات المستخدمين من localStorage
    let usersData = getFromLocalStorage('usersData') || [];

    // التحقق مما إذا كان البريد الإلكتروني مسجلًا بالفعل
    const existingUser = usersData.find(user => user.email === email);

    if (existingUser) {
        Toast.fire({
            icon: 'error',
            title: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد إلكتروني آخر.'
        });
        return;
    }

    // إضافة بيانات المستخدم الجديد
    const newUser = {
        userName: userName,
        email: email,
        password: password,
    };

    usersData.push(newUser);
    saveToLocalStorage('usersData', usersData);

    // عرض رسالة النجاح
    Toast.fire({
        icon: 'success',
        title: 'تم إنشاء الحساب!',
        text: 'تم إنشاء حسابك بنجاح.'
    }).then(() => {
        window.location.href = 'login.html'; // توجيه المستخدم إلى صفحة تسجيل الدخول
    });
}

// دالة للتحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
