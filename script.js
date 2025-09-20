// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Subject Cards Click Handler
document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', function() {
        const subject = this.getAttribute('data-subject');
        // Store subject in localStorage for the detail page
        localStorage.setItem('selectedSubject', subject);
        // Navigate to subject detail page
        window.location.href = `subject-detail.html?subject=${subject}`;
    });
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.subject-card, .agenda-card, .time-slot, .chapter-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Search Functionality (for future implementation)
function searchContent(query) {
    // This will be implemented when we add search functionality
    console.log('Searching for:', query);
}

// Utility Functions
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('en-US', options);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Local Storage Utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'login.html':
            initLoginPage();
            break;
        case 'admin.html':
            initAdminPage();
            break;
        case 'subject-detail.html':
            initSubjectDetailPage();
            break;
    }
});

function initHomePage() {
    // Load dynamic content for home page
    loadScheduleFromAPI();
    loadSubjectsFromAPI();
    loadHomeworkFromAPI();
    updateScheduleHighlight();
}

function initLoginPage() {
    // Initialize login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function initAdminPage() {
    // Initialize admin panel
    checkAdminAuth();
    loadAdminData();
}

function initSubjectDetailPage() {
    // Load subject details based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    if (subject) {
        loadSubjectDetails(subject);
    }
}

// API Helper function with fallback for mixed content issues
function getApiUrl(endpoint) {
    const baseUrl = window.CONFIG ? window.CONFIG.API_BASE_URL : 'http://localhost:3000/api';
    return `${baseUrl}${endpoint}`;
}

// Enhanced fetch with fallback for mixed content
async function fetchWithFallback(endpoint, options = {}) {
    const primaryUrl = getApiUrl(endpoint);
    
    try {
        console.log('Attempting API call to:', primaryUrl);
        const response = await fetch(primaryUrl, options);
        return response;
    } catch (error) {
        console.warn('Primary API call failed:', error.message);
        
        // If we're on HTTPS and the error might be mixed content, try fallback
        if (window.location.protocol === 'https:' && window.CONFIG && window.CONFIG.FALLBACK_API_URL) {
            console.log('Trying fallback URL due to potential mixed content issue');
            showNotification('Note: Using HTTP backend may require allowing mixed content in your browser', 'info');
            
            const fallbackUrl = `${window.CONFIG.FALLBACK_API_URL}${endpoint}`;
            console.log('Fallback API call to:', fallbackUrl);
            return await fetch(fallbackUrl, options);
        }
        
        throw error;
    }
}

// Load schedule from API
async function loadScheduleFromAPI() {
    try {
        const response = await fetch(getApiUrl('/schedule'));
        const scheduleData = await response.json();
        
        const container = document.getElementById('scheduleContainer');
        if (!container) return;
        
        if (scheduleData.length === 0) {
            // Keep the empty message
            return;
        }
        
        // Clear empty message
        container.innerHTML = '';
        
        // Group schedule by day
        const daySchedule = {
            'monday': [],
            'tuesday': [],
            'wednesday': [],
            'thursday': [],
            'friday': []
        };
        
        scheduleData.forEach(item => {
            const dayKey = item.day.toLowerCase();
            if (daySchedule[dayKey]) {
                daySchedule[dayKey].push(item);
            }
        });
        
        // Create day columns
        Object.keys(daySchedule).forEach(day => {
            const dayColumn = document.createElement('div');
            dayColumn.className = 'day-column';
            
            const dayName = day.charAt(0).toUpperCase() + day.slice(1);
            dayColumn.innerHTML = `<h3>${dayName}</h3>`;
            
            daySchedule[day].forEach(item => {
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.innerHTML = `
                    <span class="subject">${item.subject}</span>
                `;
                dayColumn.appendChild(timeSlot);
            });
            
            container.appendChild(dayColumn);
        });
        
    } catch (error) {
        console.error('Error loading schedule:', error);
    }
}

// Load subjects from API
async function loadSubjectsFromAPI() {
    try {
        const response = await fetch(getApiUrl('/subjects'));
        const subjects = await response.json();
        
        const container = document.getElementById('subjectsContainer');
        if (!container) return;
        
        if (subjects.length === 0) {
            // Keep the empty message
            return;
        }
        
        // Clear empty message
        container.innerHTML = '';
        
        // Subject icons mapping
        const subjectIcons = {
            'mathematics': 'fa-calculator',
            'physics': 'fa-atom',
            'chemistry': 'fa-flask',
            'biology': 'fa-dna',
            'english': 'fa-book',
            'history': 'fa-landmark',
            'geography': 'fa-globe',
            'art': 'fa-palette',
            'music': 'fa-music',
            'pe': 'fa-running',
            'literature': 'fa-feather',
            'science': 'fa-microscope'
        };
        
        subjects.forEach(subject => {
            const subjectCard = document.createElement('div');
            subjectCard.className = 'subject-card';
            subjectCard.setAttribute('data-subject', subject.name.toLowerCase().replace(/\s+/g, ''));
            
            // Get appropriate icon
            const iconClass = subjectIcons[subject.name.toLowerCase()] || 'fa-book';
            
            // Calculate stats
            const totalLessons = subject.chapters.reduce((total, chapter) => total + (chapter.lessons || 0), 0);
            
            subjectCard.innerHTML = `
                <div class="card-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <h3>${subject.name}</h3>
                <p>${subject.description || 'No description available'}</p>
                <div class="card-stats">
                    <span>${subject.chapters.length} Chapters</span>
                    <span>${totalLessons} Lessons</span>
                </div>
            `;
            
            // Add click handler
            subjectCard.addEventListener('click', function() {
                const subjectName = subject.name.toLowerCase().replace(/\s+/g, '');
                localStorage.setItem('selectedSubject', subjectName);
                window.location.href = `subject-detail.html?subject=${subjectName}`;
            });
            
            container.appendChild(subjectCard);
        });
        
    } catch (error) {
        console.error('Error loading subjects:', error);
    }
}

// Load homework from API
async function loadHomeworkFromAPI() {
    try {
        const response = await fetch(getApiUrl('/homework'));
        const homework = await response.json();
        
        const container = document.getElementById('agendaContainer');
        if (!container) return;
        
        if (homework.length === 0) {
            // Keep the empty message
            return;
        }
        
        // Clear empty message
        container.innerHTML = '';
        
        // Show only upcoming homework (next 10)
        const upcomingHomework = homework.slice(0, 10);
        
        // Group homework by date
        const groupedHomework = {};
        upcomingHomework.forEach(hw => {
            const date = hw.date;
            if (!groupedHomework[date]) {
                groupedHomework[date] = [];
            }
            groupedHomework[date].push(hw);
        });

        // Create agenda cards for each date
        Object.keys(groupedHomework).forEach(date => {
            const agendaCard = document.createElement('div');
            agendaCard.className = 'agenda-card';
            
            // Extract day and month from the date string (e.g., "Monday 15/9")
            const parts = date.split(' ');
            let day = '', month = '';
            if (parts.length >= 2) {
                const dayMonth = parts[1].split('/');
                day = dayMonth[0] || '';
                month = dayMonth[1] || '';
            }
            
            // Create content for all homework on this date
            const homeworkList = groupedHomework[date].map(hw => 
                `<div style="margin-bottom: 0.5rem;">
                    <strong>${hw.subject}</strong>
                    <p style="margin: 0.2rem 0; color: #666; font-size: 0.9rem;">${hw.description}</p>
                </div>`
            ).join('');
            
            agendaCard.innerHTML = `
                <div class="agenda-date">
                    <span class="day">${day}</span>
                    <span class="month">${month}</span>
                </div>
                <div class="agenda-content">
                    <h4>Due: ${date}</h4>
                    <div>${homeworkList}</div>
                </div>
            `;
            
            container.appendChild(agendaCard);
        });
        
    } catch (error) {
        console.error('Error loading homework:', error);
    }
}

function updateScheduleHighlight() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Highlight current day in schedule
    const dayColumns = document.querySelectorAll('.day-column');
    dayColumns.forEach(column => {
        const dayName = column.querySelector('h3').textContent;
        if (dayName.toLowerCase() === currentDay.toLowerCase()) {
            column.style.border = '2px solid #000000';
            column.style.backgroundColor = '#f0f0f0';
        }
    });
}

async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    console.log('Attempting login for user:', username);
    
    try {
        // Enhanced API call with fallback for mixed content issues
        const response = await fetchWithFallback('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        console.log('Login response status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userRole', data.role);
            localStorage.setItem('username', data.username);
            
            showNotification('Login successful!', 'success');
            
            // Redirect based on role
            setTimeout(() => {
                if (data.role === 'admin' || data.role === 'teacher') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);
        } else {
            const errorData = await response.json().catch(() => ({ message: 'Invalid credentials' }));
            console.error('Login failed:', errorData);
            showNotification(errorData.message || 'Invalid credentials', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        
        // Provide more specific error messages
        if (error.message.includes('Mixed Content') || error.message.includes('blocked')) {
            showNotification('Connection blocked by browser security. Please enable mixed content or use HTTPS backend.', 'error');
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
            showNotification('Cannot connect to server. Please check if the backend is running.', 'error');
        } else {
            showNotification('Login failed. Please try again.', 'error');
        }
    }
}

function checkAdminAuth() {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');
    
    if (!token || role !== 'admin') {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function loadAdminData() {
    // Load admin dashboard data
    console.log('Loading admin data...');
}

function loadSubjectDetails(subject) {
    // This would typically fetch from a database
    const subjectData = getSubjectData(subject);
    if (subjectData) {
        displaySubjectDetails(subjectData);
    }
}

function getSubjectData(subject) {
    // Mock data - in a real application, this would come from a database
    const subjects = {
        mathematics: {
            name: 'Mathematics',
            description: 'Complete mathematics curriculum covering algebra, geometry, calculus and more',
            chapters: [
                {
                    id: 1,
                    title: 'Basic Algebra',
                    description: 'Introduction to algebraic expressions and equations',
                    lessons: 8,
                    duration: '2 weeks'
                },
                {
                    id: 2,
                    title: 'Linear Equations',
                    description: 'Solving linear equations and systems',
                    lessons: 6,
                    duration: '1.5 weeks'
                },
                {
                    id: 3,
                    title: 'Quadratic Equations',
                    description: 'Working with quadratic functions and equations',
                    lessons: 10,
                    duration: '2.5 weeks'
                },
                {
                    id: 4,
                    title: 'Geometry Basics',
                    description: 'Points, lines, angles, and basic shapes',
                    lessons: 12,
                    duration: '3 weeks'
                },
                {
                    id: 5,
                    title: 'Trigonometry',
                    description: 'Sine, cosine, tangent and their applications',
                    lessons: 15,
                    duration: '3.5 weeks'
                }
            ]
        },
        physics: {
            name: 'Physics',
            description: 'Comprehensive physics course covering mechanics, thermodynamics, and optics',
            chapters: [
                {
                    id: 1,
                    title: 'Mechanics',
                    description: 'Motion, forces, and energy',
                    lessons: 12,
                    duration: '3 weeks'
                },
                {
                    id: 2,
                    title: 'Thermodynamics',
                    description: 'Heat, temperature, and energy transfer',
                    lessons: 8,
                    duration: '2 weeks'
                },
                {
                    id: 3,
                    title: 'Waves and Sound',
                    description: 'Wave properties and sound phenomena',
                    lessons: 10,
                    duration: '2.5 weeks'
                },
                {
                    id: 4,
                    title: 'Optics',
                    description: 'Light, reflection, refraction, and lenses',
                    lessons: 8,
                    duration: '2 weeks'
                }
            ]
        }
        // Add more subjects as needed
    };
    
    return subjects[subject] || null;
}

function displaySubjectDetails(subjectData) {
    // Update page title and header
    document.title = `${subjectData.name} - ES1 Class`;
    
    const header = document.querySelector('.subject-header h1');
    if (header) {
        header.textContent = subjectData.name;
    }
    
    const description = document.querySelector('.subject-header p');
    if (description) {
        description.textContent = subjectData.description;
    }
    
    // Display chapters
    const chaptersGrid = document.querySelector('.chapters-grid');
    if (chaptersGrid && subjectData.chapters) {
        chaptersGrid.innerHTML = '';
        
        subjectData.chapters.forEach(chapter => {
            const chapterCard = createChapterCard(chapter);
            chaptersGrid.appendChild(chapterCard);
        });
    }
}

function createChapterCard(chapter) {
    const card = document.createElement('div');
    card.className = 'chapter-card';
    card.setAttribute('data-chapter-id', chapter.id);
    
    card.innerHTML = `
        <h3>${chapter.title}</h3>
        <p>${chapter.description}</p>
        <div class="chapter-stats">
            <span>${chapter.lessons} lessons</span>
            <span>${chapter.duration}</span>
        </div>
    `;
    
    card.addEventListener('click', () => {
        // Navigate to chapter detail page
        const subject = new URLSearchParams(window.location.search).get('subject');
        window.location.href = `chapter-detail.html?subject=${subject}&chapter=${chapter.id}`;
    });
    
    return card;
}
