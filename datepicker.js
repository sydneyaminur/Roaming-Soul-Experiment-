// Animated Custom Date Picker
document.addEventListener('DOMContentLoaded', function() {
    const dateInputWrapper = document.querySelector('.date-input-wrapper');
    const dateDisplay = document.getElementById('date_display');
    const datePickerDropdown = document.getElementById('date_picker_dropdown');
    const hiddenDateInput = document.getElementById('date_of_birth');
    const currentMonthYear = document.querySelector('.current-month-year');
    const daysGrid = document.querySelector('.days-grid');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    let currentDate = new Date();
    let selectedDate = null;
    let isOpen = false;
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Initialize date picker
    function initDatePicker() {
        renderCalendar();
        addEventListeners();
    }
    
    // Add event listeners
    function addEventListeners() {
        // Toggle date picker
        dateInputWrapper.addEventListener('click', toggleDatePicker);
        
        // Navigation buttons
        navButtons.forEach(button => {
            button.addEventListener('click', handleNavigation);
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!dateInputWrapper.contains(e.target) && !datePickerDropdown.contains(e.target)) {
                closeDatePicker();
            }
        });
        
        // Prevent closing when clicking inside dropdown
        datePickerDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (isOpen) {
                if (e.key === 'Escape') {
                    closeDatePicker();
                }
            }
        });
    }
    
    // Toggle date picker
    function toggleDatePicker() {
        if (isOpen) {
            closeDatePicker();
        } else {
            openDatePicker();
        }
    }
    
    // Open date picker
    function openDatePicker() {
        isOpen = true;
        dateInputWrapper.classList.add('active');
        datePickerDropdown.classList.add('active');
        renderCalendar();
        
        // Add opening animation
        setTimeout(() => {
            const dayCells = document.querySelectorAll('.day-cell');
            dayCells.forEach((cell, index) => {
                setTimeout(() => {
                    cell.style.animation = 'dayFadeIn 0.3s ease-in-out both';
                }, index * 20);
            });
        }, 100);
    }
    
    // Close date picker
    function closeDatePicker() {
        isOpen = false;
        dateInputWrapper.classList.remove('active');
        datePickerDropdown.classList.remove('active');
    }
    
    // Handle navigation
    function handleNavigation(e) {
        const action = e.target.dataset.nav;
        const button = e.target;
        
        // Add click animation
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        switch (action) {
            case 'prev-year':
                currentDate.setFullYear(currentDate.getFullYear() - 1);
                break;
            case 'prev-month':
                currentDate.setMonth(currentDate.getMonth() - 1);
                break;
            case 'next-month':
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'next-year':
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
        }
        
        renderCalendar();
    }
    
    // Render calendar
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Update header
        currentMonthYear.textContent = `${months[month]} ${year}`;
        currentMonthYear.style.animation = 'monthSlide 0.3s ease-in-out';
        
        // Clear days grid
        daysGrid.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Add previous month's trailing days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dayCell = createDayCell(day, true, year, month - 1);
            daysGrid.appendChild(dayCell);
        }
        
        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = createDayCell(day, false, year, month);
            daysGrid.appendChild(dayCell);
        }
        
        // Add next month's leading days
        const totalCells = daysGrid.children.length;
        const remainingCells = 42 - totalCells; // 6 weeks * 7 days
        for (let day = 1; day <= remainingCells; day++) {
            const dayCell = createDayCell(day, true, year, month + 1);
            daysGrid.appendChild(dayCell);
        }
    }
    
    // Create day cell
    function createDayCell(day, isOtherMonth, year, month) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        dayCell.textContent = day;
        
        const cellDate = new Date(year, month, day);
        const today = new Date();
        
        if (isOtherMonth) {
            dayCell.classList.add('other-month');
        }
        
        // Check if it's today
        if (cellDate.toDateString() === today.toDateString()) {
            dayCell.classList.add('today');
        }
        
        // Check if it's selected
        if (selectedDate && cellDate.toDateString() === selectedDate.toDateString()) {
            dayCell.classList.add('selected');
        }
        
        // Add click event
        dayCell.addEventListener('click', function() {
            selectDate(cellDate);
        });
        
        // Add hover effect with random delay
        dayCell.addEventListener('mouseenter', function() {
            if (!this.classList.contains('other-month')) {
                this.style.animationDelay = Math.random() * 0.1 + 's';
            }
        });
        
        return dayCell;
    }
    
    // Select date
    function selectDate(date) {
        selectedDate = date;
        
        // Update display
        const formattedDate = formatDate(date);
        dateDisplay.value = formattedDate;
        hiddenDateInput.value = date.toISOString().split('T')[0];
        
        // Add selection animation
        const selectedCell = document.querySelector('.day-cell.selected');
        if (selectedCell) {
            selectedCell.style.animation = 'none';
            selectedCell.offsetHeight; // Trigger reflow
            selectedCell.style.animation = 'dayFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
        
        // Close picker after selection
        setTimeout(() => {
            closeDatePicker();
        }, 300);
        
        // Re-render to update selected state
        renderCalendar();
    }
    
    // Format date for display
    function formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Initialize
    initDatePicker();
});

// Add some particle effects for the date picker
function createDatePickerParticles() {
    const datePicker = document.querySelector('.date-picker-dropdown');
    if (!datePicker) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'date-picker-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        border-radius: 15px;
        z-index: -1;
    `;
    
    datePicker.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFloatingParticle(particleContainer);
        }, i * 200);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #4a90e2, #357abd);
        border-radius: 50%;
        opacity: 0.6;
        animation: floatUp 3s infinite ease-in-out;
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(100px) scale(0);
            opacity: 0;
        }
        50% {
            opacity: 0.8;
            transform: translateY(50px) scale(1);
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particle effects when date picker opens
document.addEventListener('DOMContentLoaded', function() {
    const dateInputWrapper = document.querySelector('.date-input-wrapper');
    if (dateInputWrapper) {
        dateInputWrapper.addEventListener('click', function() {
            setTimeout(createDatePickerParticles, 200);
        });
    }
});