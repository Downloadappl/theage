// إدارة صفحة مقارنة الأعمار
document.addEventListener('DOMContentLoaded', () => {
    showComparisonForm();
});

// عرض نموذج المقارنة
function showComparisonForm() {
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <div class="card fade-in">
            <h2>مقارنة الأعمار</h2>
            <p>أدخل تاريخي ميلاد شخصين للمقارنة بين عمرهما</p>
            
            <form id="comparison-form">
                <div class="form-group">
                    <label for="person1">الشخص الأول</label>
                    <input type="date" id="person1" class="input-field" required>
                </div>
                
                <div class="form-group">
                    <label for="person2">الشخص الثاني</label>
                    <input type="date" id="person2" class="input-field" required>
                </div>
                
                <button type="submit" class="btn">قارن الأعمار</button>
            </form>
            
            <div id="comparison-result" class="hidden"></div>
        </div>
    `;
    
    document.getElementById('comparison-form').addEventListener('submit', handleComparison);
}

// معالجة مقارنة الأعمار
function handleComparison(e) {
    e.preventDefault();
    
    const person1 = document.getElementById('person1').value;
    const person2 = document.getElementById('person2').value;
    
    if (!person1 || !person2) {
        alert('يرجى إدخال تاريخي الميلاد لكل الشخصين');
        return;
    }
    
    const age1 = window.ageCalculatorApp.calculateAge(person1);
    const age2 = window.ageCalculatorApp.calculateAge(person2);
    
    showComparisonResult(age1, age2, person1, person2);
}

// عرض نتيجة المقارنة
function showComparisonResult(age1, age2, date1, date2) {
    const resultDiv = document.getElementById('comparison-result');
    const isPerson1Older = age1.totalDays > age2.totalDays;
    const differenceDays = Math.abs(age1.totalDays - age2.totalDays);
    const differenceYears = Math.floor(differenceDays / 365);
    const remainingDays = differenceDays % 365;
    
    resultDiv.innerHTML = `
        <div class="fade-in">
            <h3>نتيجة المقارنة</h3>
            
            <div class="age-comparison">
                <div class="comparison-item ${isPerson1Older ? 'older' : ''}">
                    <h4>الشخص الأول</h4>
                    <div class="age-display">
                        <div class="age-number">${age1.years}</div>
                        <div class="age-label">سنة</div>
                    </div>
                    <p>${age1.years} سنة, ${age1.months} شهر, ${age1.days} يوم</p>
                    <p>${age1.totalDays.toLocaleString()} يوم إجمالاً</p>
                </div>
                
                <div class="vs-text">VS</div>
                
                <div class="comparison-item ${!isPerson1Older ? 'older' : ''}">
                    <h4>الشخص الثاني</h4>
                    <div class="age-display">
                        <div class="age-number">${age2.years}</div>
                        <div class="age-label">سنة</div>
                    </div>
                    <p>${age2.years} سنة, ${age2.months} شهر, ${age2.days} يوم</p>
                    <p>${age2.totalDays.toLocaleString()} يوم إجمالاً</p>
                </div>
            </div>
            
            <div class="comparison-summary">
                <h4>النتيجة:</h4>
                <p>${isPerson1Older ? 'الشخص الأول' : 'الشخص الثاني'} أكبر بـ ${differenceYears} سنة و ${remainingDays} يوم</p>
            </div>
        </div>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // إضافة أنماط للعناصر الأكبر
    const style = document.createElement('style');
    style.textContent = `
        .age-comparison {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .comparison-item {
            flex: 1;
            min-width: 140px;
            text-align: center;
            padding: 15px;
            border-radius: var(--border-radius);
            background-color: var(--card-background);
            margin: 10px;
            transition: var(--transition);
        }
        
        .comparison-item.older {
            background-color: var(--primary-color);
            color: white;
            transform: scale(1.05);
        }
        
        .comparison-item.older .age-number,
        .comparison-item.older .age-label {
            color: white;
        }
        
        .vs-text {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0 15px;
        }
        
        .comparison-summary {
            text-align: center;
            margin-top: 20px;
            padding: 15px;
            background-color: var(--card-background);
            border-radius: var(--border-radius);
        }
        
        @media (max-width: 768px) {
            .age-comparison {
                flex-direction: column;
            }
            
            .vs-text {
                margin: 15px 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}
