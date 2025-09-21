// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navCenter = document.querySelector('.nav-center');

if (hamburger && navCenter) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navCenter.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navCenter.classList.remove('active');
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

// Data persistence layer
const DataStore = {
    // Cache for preventing data loss on refresh
    cache: new Map(),
    
    // Store data with automatic backup
    set(key, data) {
        this.cache.set(key, data);
        localStorage.setItem(`es1_cache_${key}`, JSON.stringify({
            data: data,
            timestamp: Date.now()
        }));
    },
    
    // Retrieve data from cache or localStorage
    get(key) {
        // First check in-memory cache
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        
        // Then check localStorage
        try {
            const stored = localStorage.getItem(`es1_cache_${key}`);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Check if data is less than 1 hour old
                if (Date.now() - parsed.timestamp < 3600000) {
                    this.cache.set(key, parsed.data);
                    return parsed.data;
                }
            }
        } catch (error) {
            console.error('Error retrieving cached data:', error);
        }
        
        return null;
    },
    
    // Clear specific cache entry
    clear(key) {
        this.cache.delete(key);
        localStorage.removeItem(`es1_cache_${key}`);
    },
    
    // Clear all cache
    clearAll() {
        this.cache.clear();
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('es1_cache_')) {
                localStorage.removeItem(key);
            }
        });
    }
};

// File upload functionality
const FileUploader = {
    selectedFiles: [],
    currentSubject: null,
    currentChapter: null,
    
    init() {
        this.setupEventListeners();
        this.loadSubjectsForUpload();
    },
    
    setupEventListeners() {
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        const subjectSelect = document.getElementById('fileUploadSubjectSelect');
        const chapterSelect = document.getElementById('fileUploadChapterSelect');
        const uploadBtn = document.getElementById('uploadBtn');
        
        if (uploadZone) {
            uploadZone.addEventListener('click', () => fileInput.click());
            uploadZone.addEventListener('dragover', this.handleDragOver.bind(this));
            uploadZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            uploadZone.addEventListener('drop', this.handleDrop.bind(this));
        }
        
        if (fileInput) {
            fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }
        
        if (subjectSelect) {
            subjectSelect.addEventListener('change', this.handleSubjectChange.bind(this));
        }
        
        if (chapterSelect) {
            chapterSelect.addEventListener('change', this.handleChapterChange.bind(this));
        }
        
        if (uploadBtn) {
            uploadBtn.addEventListener('click', this.uploadFiles.bind(this));
        }
    },
    
    handleDragOver(e) {
        e.preventDefault();
        document.getElementById('uploadZone').classList.add('dragover');
    },
    
    handleDragLeave(e) {
        e.preventDefault();
        document.getElementById('uploadZone').classList.remove('dragover');
    },
    
    handleDrop(e) {
        e.preventDefault();
        document.getElementById('uploadZone').classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        this.processFiles(files);
    },
    
    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.processFiles(files);
    },
    
    processFiles(files) {
        const userRole = localStorage.getItem('userRole');
        
        // Filter files based on user role
        if (userRole === 'teacher') {
            const originalLength = files.length;
            files = files.filter(file => file.type === 'application/pdf');
            if (files.length !== originalLength) {
                showNotification(getText('uploadTeacherRestriction'), 'error');
            }
        }
        
        this.selectedFiles = files;
        this.displaySelectedFiles();
        
        if (files.length > 0) {
            document.getElementById('uploadBtn').style.display = 'block';
        }
    },
    
    displaySelectedFiles() {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        
        this.selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${this.formatFileSize(file.size)}</div>
                </div>
                <button class="file-remove" onclick="FileUploader.removeFile(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            fileList.appendChild(fileItem);
        });
    },
    
    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.displaySelectedFiles();
        
        if (this.selectedFiles.length === 0) {
            document.getElementById('uploadBtn').style.display = 'none';
        }
    },
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    async loadSubjectsForUpload() {
        try {
            const response = await fetch(getApiUrl('/subjects'));
            const subjects = await response.json();
            
            const subjectSelect = document.getElementById('fileUploadSubjectSelect');
            if (subjectSelect) {
                subjectSelect.innerHTML = '<option value="">Select Subject</option>';
                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject._id;
                    option.textContent = subject.name;
                    subjectSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error loading subjects for upload:', error);
        }
    },
    
    async handleSubjectChange(e) {
        const subjectId = e.target.value;
        const chapterSelect = document.getElementById('fileUploadChapterSelect');
        
        if (!subjectId) {
            chapterSelect.disabled = true;
            chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
            document.getElementById('fileUploadArea').style.display = 'none';
            return;
        }
        
        try {
            const response = await fetch(getApiUrl(`/subjects/${subjectId}`));
            const subject = await response.json();
            
            chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
            subject.chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter._id;
                option.textContent = chapter.title;
                chapterSelect.appendChild(option);
            });
            
            chapterSelect.disabled = false;
            this.currentSubject = subject;
        } catch (error) {
            console.error('Error loading chapters:', error);
            showNotification('Error loading chapters', 'error');
        }
    },
    
    handleChapterChange(e) {
        const chapterId = e.target.value;
        const userRole = localStorage.getItem('userRole');
        
        if (chapterId) {
            this.currentChapter = this.currentSubject.chapters.find(ch => ch._id === chapterId);
            document.getElementById('fileUploadArea').style.display = 'block';
            
            // Show teacher restriction message if applicable
            const restriction = document.getElementById('teacherRestriction');
            if (userRole === 'teacher') {
                restriction.style.display = 'block';
                document.getElementById('fileInput').accept = '.pdf';
            } else {
                restriction.style.display = 'none';
                document.getElementById('fileInput').accept = '.jpg,.jpeg,.png,.gif,.pdf';
            }
            
            this.loadChapterFiles();
        } else {
            document.getElementById('fileUploadArea').style.display = 'none';
        }
    },
    
    async uploadFiles() {
        if (this.selectedFiles.length === 0 || !this.currentSubject || !this.currentChapter) {
            showNotification('Please select files and a chapter', 'error');
            return;
        }
        
        const formData = new FormData();
        this.selectedFiles.forEach(file => {
            formData.append('files', file);
        });
        
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(getApiUrl(`/subjects/${this.currentSubject._id}/chapters/${this.currentChapter._id}/upload`), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                showNotification(getText('msgFilesUploaded'), 'success');
                this.selectedFiles = [];
                this.displaySelectedFiles();
                document.getElementById('uploadBtn').style.display = 'none';
                this.loadChapterFiles();
                
                // Clear cache to force refresh
                DataStore.clear('subjects');
            } else {
                const error = await response.json();
                showNotification(error.message || 'Upload failed', 'error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            showNotification('Upload failed', 'error');
        }
    },
    
    async loadChapterFiles() {
        if (!this.currentSubject || !this.currentChapter) return;
        
        const display = document.getElementById('chapterFilesDisplay');
        display.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Loading files...</p>';
        
        try {
            const response = await fetch(getApiUrl(`/subjects/${this.currentSubject._id}`));
            const subject = await response.json();
            const chapter = subject.chapters.find(ch => ch._id === this.currentChapter._id);
            
            if (!chapter) {
                display.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Chapter not found.</p>';
                return;
            }
            
            const allFiles = [...(chapter.images || []), ...(chapter.pdfs || [])];
            
            if (allFiles.length === 0) {
                display.innerHTML = `<p style="text-align: center; color: #666; padding: 2rem;" data-text="chapterNoFiles">No files uploaded yet</p>`;
                return;
            }
            
            display.innerHTML = '<div class="chapter-files-grid"></div>';
            const grid = display.querySelector('.chapter-files-grid');
            
            allFiles.forEach(file => {
                const isImage = file.mimetype && file.mimetype.startsWith('image/');
                const fileCard = document.createElement('div');
                fileCard.className = `file-card ${isImage ? 'image-card' : 'pdf-card'}`;
                
                fileCard.innerHTML = `
                    <div class="file-icon">
                        <i class="fas ${isImage ? 'fa-image' : 'fa-file-pdf'}"></i>
                    </div>
                    <div class="file-name">${file.originalname}</div>
                    <div class="file-size">${this.formatFileSize(file.size)}</div>
                    <div class="file-actions">
                        <button class="file-view" onclick="FileUploader.viewFile('${this.currentSubject._id}', '${file.filename}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="file-delete" onclick="FileUploader.deleteFile('${file._id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                `;
                
                grid.appendChild(fileCard);
            });
            
        } catch (error) {
            console.error('Error loading chapter files:', error);
            display.innerHTML = '<p style="text-align: center; color: #ff0000; padding: 2rem;">Error loading files</p>';
        }
    },
    
    viewFile(subjectId, filename) {
        const fileUrl = getApiUrl(`/files/${subjectId}/${filename}`);
        window.open(fileUrl, '_blank');
    },
    
    async deleteFile(fileId) {
        if (!confirm(getText('msgDeleteConfirm') + ' file?')) return;
        
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(getApiUrl(`/subjects/${this.currentSubject._id}/chapters/${this.currentChapter._id}/files/${fileId}`), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                showNotification('File ' + getText('msgDeleted'), 'success');
                this.loadChapterFiles();
            } else {
                showNotification('Error deleting file', 'error');
            }
        } catch (error) {
            console.error('Delete error:', error);
            showNotification('Error deleting file', 'error');
        }
    }
};

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
    FileUploader.init();
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

// Enhanced fetch with better error handling and mixed content support
async function fetchWithFallback(endpoint, options = {}) {
    const primaryUrl = getApiUrl(endpoint);
    
    try {
        console.log('🔗 API Call:', primaryUrl);
        const response = await fetch(primaryUrl, options);
        console.log('✅ Response:', response.status, response.statusText);
        return response;
    } catch (error) {
        console.error('❌ API Error:', error.message);
        
        // Show user-friendly error message for mixed content
        if (error.message.includes('Mixed Content') || 
            (window.location.protocol === 'https:' && primaryUrl.startsWith('http:'))) {
            showMixedContentWarning();
        }
        
        throw error;
    }
}

// Show mixed content warning with instructions
function showMixedContentWarning() {
    const warning = document.createElement('div');
    warning.id = 'mixed-content-warning';
    warning.innerHTML = `
        <div style="
            position: fixed; top: 0; left: 0; right: 0; 
            background: #ff6b6b; color: white; padding: 15px; 
            text-align: center; z-index: 10000; font-size: 14px;
        ">
            <strong>🔒 Mixed Content Blocked</strong><br>
            Your browser is blocking HTTP requests from this HTTPS site.<br>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: rgba(255,255,255,0.2); border: 1px solid white; 
                color: white; padding: 5px 10px; margin: 5px; border-radius: 3px; cursor: pointer;
            ">Dismiss</button>
            <small>Click the shield icon in your address bar to allow mixed content</small>
        </div>
    `;
    
    // Remove existing warning
    const existing = document.getElementById('mixed-content-warning');
    if (existing) existing.remove();
    
    document.body.appendChild(warning);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        const warningEl = document.getElementById('mixed-content-warning');
        if (warningEl) warningEl.remove();
    }, 10000);
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
        // Check cache first
        let subjects = DataStore.get('subjects');
        
        if (!subjects) {
            const response = await fetch(getApiUrl('/subjects'));
            subjects = await response.json();
            DataStore.set('subjects', subjects);
        }
        
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
