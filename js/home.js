// إدارة الصفحة الرئيسية
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const userData = window.ageCalculatorApp.getUserData();
    
    if (!userData) {
        showRegistrationForm();
    } else {
        showAgeDisplay(userData);
    }
});

// عرض نموذج التسجيل
function showRegistrationForm() {
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <div class="card fade-in">
            <h2>مرحباً!</h2>
            <p>لمساعدتك في حساب عمرك، نحتاج لبعض المعلومات الأساسية</p>
            
            <form id="registration-form">
                <div class="form-group">
                    <label for="name">اسمك</label>
                    <input type="text" id="name" class="input-field" placeholder="أدخل اسمك" required>
                </div>
                
                <div class="form-group">
                    <label for="birthdate">تاريخ الميلاد</label>
                    <input type="date" id="birthdate" class="input-field" required>
                </div>
                
                <div class="form-group">
                    <label for="gender">الجنس</label>
                    <select id="gender" class="input-field" required>
                        <option value="">اختر الجنس</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                    </select>
                </div>
                
                <button type="submit" class="btn">حفظ المعلومات</button>
            </form>
        </div>
    `;
    
    document.getElementById('registration-form').addEventListener('submit', handleRegistration);
}

// معالجة تقديم نموذج التسجيل
function handleRegistration(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.getElementById('gender').value;
    
    const userData = {
        name,
        birthdate,
        gender,
        registeredAt: new Date().toISOString()
    };
    
    window.ageCalculatorApp.saveUserData(userData);
    showAgeDisplay(userData);
}

// عرض تفاصيل العمر
function showAgeDisplay(userData) {
    const age = window.ageCalculatorApp.calculateAge(userData.birthdate);
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <div class="card fade-in">
            <h2>مرحباً ${userData.name}!</h2>
            <p>عمرك الحالي هو:</p>
            
            <div class="age-display">
                <div class="age-number">${age.years}</div>
                <div class="age-label">سنة</div>
            </div>
            
            <div class="age-grid">
                <div class="age-item">
                    <div class="age-number">${age.months}</div>
                    <div class="age-label">شهر</div>
                </div>
                <div class="age-item">
                    <div class="age-number">${age.days}</div>
                    <div class="age-label">يوم</div>
                </div>
                <div class="age-item">
                    <div class="age-number">${age.totalHours.toLocaleString()}</div>
                    <div class="age-label">ساعة</div>
                </div>
                <div class="age-item">
                    <div class="age-number">${age.totalMinutes.toLocaleString()}</div>
                    <div class="age-label">دقيقة</div>
                </div>
            </div>
            
            <button class="btn btn-accent" id="update-info">تحديث المعلومات</button>
        </div>
    `;
    
    document.getElementById('update-info').addEventListener('click', showRegistrationForm);
}
