// تطبيق إدارة الثيم والتنقل
class AgeCalculatorApp {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.loadTheme();
        this.setupNavigation();
        this.setupThemeToggle();
    }

    // تحميل وإعداد الثيم
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        
        this.currentTheme = savedTheme || systemTheme;
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    // تبديل الثيم
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    // إعداد زر تبديل الثيم
    setupThemeToggle() {
        const themeToggleBtn = document.createElement('button');
        themeToggleBtn.className = 'theme-toggle';
        themeToggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
        `;
        
        themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(themeToggleBtn);
    }

    // إعداد التنقل بين الصفحات
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // حساب العمر من تاريخ الميلاد
    calculateAge(birthDate) {
        const now = new Date();
        const birth = new Date(birthDate);
        
        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();
        
        if (days < 0) {
            months--;
            // الحصول على عدد الأيام في الشهر السابق
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // حساب الوقت الإجمالي بالملي ثانية
        const diffMs = now - birth;
        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
        const totalMinutes = Math.floor(diffMs / (1000 * 60));
        const totalSeconds = Math.floor(diffMs / 1000);
        
        return {
            years,
            months,
            days,
            totalDays,
            totalHours,
            totalMinutes,
            totalSeconds
        };
    }

    // تنسيق التاريخ للعرض
    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('ar-AR', options);
    }

    // الحصول على بيانات المستخدم من localStorage
    getUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    // حفظ بيانات المستخدم في localStorage
    saveUserData(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.ageCalculatorApp = new AgeCalculatorApp();
});
