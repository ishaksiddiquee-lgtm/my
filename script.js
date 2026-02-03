// Global state management
let currentState = {
    currentPage: 'home',
    isAdmin: false,
    adminPassword: 'admin123', // Default admin password
    websiteName: 'Live Exam Portal',
    homepageImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mode: 'day', // Default mode
    student: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://via.placeholder.com/150',
        examsCount: 0,
        avgScore: 0,
        learningHours: 0
    },
    exams: [
        {
            id: 1,
            title: 'Mathematics Final Exam',
            description: 'Comprehensive mathematics examination covering algebra, geometry, and calculus.',
            duration: 120,
            category: 'math',
            password: 'math2024',
            isActive: true,
            participants: 45
        },
        {
            id: 2,
            title: 'Science Olympiad',
            description: 'Challenging science exam covering physics, chemistry, and biology concepts.',
            duration: 90,
            category: 'science',
            password: 'science2024',
            isActive: true,
            participants: 32
        },
        {
            id: 3,
            title: 'English Literature Test',
            description: 'Analysis of classic literature and comprehension questions.',
            duration: 75,
            category: 'english',
            password: 'english2024',
            isActive: false,
            participants: 28
        }
    ],
    learningContent: [
        {
            id: 1,
            title: 'Algebra Fundamentals',
            description: 'Learn the basics of algebra including equations and functions.',
            type: 'video',
            url: '#',
            category: 'math'
        },
        {
            id: 2,
            title: 'Chemistry Formulas Guide',
            description: 'Comprehensive guide to essential chemistry formulas and equations.',
            type: 'document',
            url: '#',
            category: 'science'
        },
        {
            id: 3,
            title: 'Literature Analysis Techniques',
            description: 'Master the art of literary analysis and critical thinking.',
            type: 'document',
            url: '#',
            category: 'english'
        }
    ],
    aiChatHistory: [
        {
            sender: 'bot',
            message: 'Hello! I\'m here to help with your learning. Ask me anything about your studies!',
            timestamp: new Date()
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after a delay
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('app-container').classList.remove('hidden');

        // Load saved data from localStorage
        loadSavedData();

        // Update UI with current state
        updateUI();

        // Show home page by default
        navigateTo('home');

        // Add event listeners
        setupEventListeners();

        // Initialize enhanced features
        initScrollAnimations();
        enhanceFormFeedback();
    }, 3000);
}

function loadSavedData() {
    const savedState = localStorage.getItem('examPortalState');
    if (savedState) {
        const parsed = JSON.parse(savedState);
        Object.assign(currentState, parsed);

        // Ensure mode is set properly
        if (!currentState.mode) {
            currentState.mode = 'day';
        }
    } else {
        // Set default mode if no saved data
        currentState.mode = 'day';
    }
}

function saveData() {
    localStorage.setItem('examPortalState', JSON.stringify(currentState));
}

function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            navigateTo(page);
        });
    });

    // Tab switching for admin panel
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchAdminTab(tab);
        });
    });

    // Add smooth scrolling for anchor links
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
}

function toggleMode() {
    const body = document.body;
    const modeToggle = document.querySelector('.mode-toggle');
    const icon = modeToggle.querySelector('i');

    if (currentState.mode === 'day') {
        // Switch to night mode
        currentState.mode = 'night';
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        icon.className = 'fas fa-sun';
        modeToggle.setAttribute('title', 'Switch to Day Mode');
    } else {
        // Switch to day mode
        currentState.mode = 'day';
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        icon.className = 'fas fa-moon';
        modeToggle.setAttribute('title', 'Switch to Night Mode');
    }

    saveData();
    updateModeUI();
}


function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    // Show selected page
    const pageElement = document.getElementById(`${page}-page`);
    if (pageElement) {
        pageElement.classList.add('active');
        currentState.currentPage = page;

        // Load page-specific content
        loadPageContent(page);
    }

    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
}

function loadPageContent(page) {
    switch(page) {
        case 'home':
            loadHomePage();
            break;
        case 'exams':
            loadExamsPage();
            break;
        case 'learning':
            loadLearningPage();
            break;
        case 'ai-board':
            loadAIBoardPage();
            break;
        case 'profile':
            loadProfilePage();
            break;
    }

    // Trigger animations for new content
    setTimeout(triggerAnimations, 100);
}

function triggerAnimations() {
    // Animate elements that come into view
    const animateElements = document.querySelectorAll('.feature-card, .exam-card, .learning-card, .stat-card');

    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'fadeIn 0.6s ease forwards';
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 10);
        }, index * 100);
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .exam-card, .learning-card, .stat-card, .message').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Add smooth scrolling enhancement
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Enhanced form validation and feedback
function enhanceFormFeedback() {
    // Add focus effects to all inputs
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

function loadHomePage() {
    document.getElementById('website-name').textContent = currentState.websiteName;
    document.getElementById('homepage-image').src = currentState.homepageImage;
}

function loadExamsPage() {
    renderExamsList();
}

function loadLearningPage() {
    renderLearningContent();
}

function loadAIBoardPage() {
    renderAIChat();
}

function loadProfilePage() {
    renderProfile();
}

function renderExamsList() {
    const container = document.getElementById('exams-list');
    container.innerHTML = '';

    currentState.exams.forEach(exam => {
        if (!exam.isActive) return; // Only show active exams

        const examCard = document.createElement('div');
        examCard.className = 'exam-card';
        examCard.onclick = () => openExamModal(exam.id);

        examCard.innerHTML = `
            <h3>${exam.title}</h3>
            <p>${exam.description}</p>
            <div class="exam-meta">
                <span><i class="fas fa-clock"></i> ${exam.duration} min</span>
                <span><i class="fas fa-users"></i> ${exam.participants} participants</span>
                <span class="category-tag">${exam.category}</span>
            </div>
        `;

        container.appendChild(examCard);
    });
}

function filterExams() {
    const searchTerm = document.getElementById('exam-search').value.toLowerCase();
    const container = document.getElementById('exams-list');
    container.innerHTML = '';

    currentState.exams.forEach(exam => {
        if (!exam.isActive) return;

        if (exam.title.toLowerCase().includes(searchTerm) ||
            exam.description.toLowerCase().includes(searchTerm)) {

            const examCard = document.createElement('div');
            examCard.className = 'exam-card';
            examCard.onclick = () => openExamModal(exam.id);

            examCard.innerHTML = `
                <h3>${exam.title}</h3>
                <p>${exam.description}</p>
                <div class="exam-meta">
                    <span><i class="fas fa-clock"></i> ${exam.duration} min</span>
                    <span><i class="fas fa-users"></i> ${exam.participants} participants</span>
                    <span class="category-tag">${exam.category}</span>
                </div>
            `;

            container.appendChild(examCard);
        }
    });
}

function openExamModal(examId) {
    const exam = currentState.exams.find(e => e.id === examId);
    if (exam) {
        document.getElementById('exam-modal').style.display = 'block';
        // Store exam ID for joining
        window.currentExamId = examId;
    }
}

function closeModal() {
    document.getElementById('exam-modal').style.display = 'none';
    document.getElementById('exam-password').value = '';
}

function joinExam() {
    const password = document.getElementById('exam-password').value;
    const exam = currentState.exams.find(e => e.id === window.currentExamId);

    if (exam && password === exam.password) {
        alert(`Successfully joined exam: ${exam.title}`);
        closeModal();

        // Simulate starting the exam
        startExam(exam);
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function startExam(exam) {
    // Simulate exam start
    alert(`Starting exam: ${exam.title}\nDuration: ${exam.duration} minutes`);

    // Update student stats
    currentState.student.examsCount += 1;
    saveData();
    renderProfile();

    // Close modal and navigate to exam page (would be implemented)
    closeModal();
}

function renderLearningContent() {
    const container = document.getElementById('featured-content');
    container.innerHTML = '';

    currentState.learningContent.forEach(content => {
        const contentCard = document.createElement('div');
        contentCard.className = 'feature-card';

        contentCard.innerHTML = `
            <i class="fas fa-${getContentIcon(content.type)}"></i>
            <h3>${content.title}</h3>
            <p>${content.description}</p>
            <button class="btn btn-primary" onclick="accessContent(${content.id})">Access Content</button>
        `;

        container.appendChild(contentCard);
    });
}

function getContentIcon(type) {
    switch(type) {
        case 'video': return 'video';
        case 'document': return 'file-pdf';
        case 'quiz': return 'question-circle';
        default: return 'book';
    }
}

function accessContent(contentId) {
    const content = currentState.learningContent.find(c => c.id === contentId);
    if (content) {
        alert(`Accessing: ${content.title}`);
        // Update learning hours
        currentState.student.learningHours += 1;
        saveData();
        renderProfile();
    }
}

function renderAIChat() {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';

    currentState.aiChatHistory.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender}-message`;

        messageDiv.innerHTML = `
            <i class="fas fa-${msg.sender === 'bot' ? 'robot' : 'user'}"></i>
            <div class="message-content">
                <strong>${msg.sender === 'bot' ? 'AI Assistant:' : 'You:'}</strong>
                <p>${msg.message}</p>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
    });

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendAIQuery() {
    const queryInput = document.getElementById('ai-query');
    const query = queryInput.value.trim();

    if (!query) return;

    // Add user message
    currentState.aiChatHistory.push({
        sender: 'user',
        message: query,
        timestamp: new Date()
    });

    // Generate AI response (simulated)
    const aiResponse = generateAIResponse(query);
    currentState.aiChatHistory.push({
        sender: 'bot',
        message: aiResponse,
        timestamp: new Date()
    });

    queryInput.value = '';
    renderAIChat();
    saveData();
}

function handleAIKeyPress(event) {
    if (event.key === 'Enter') {
        sendAIQuery();
    }
}

function generateAIResponse(query) {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
        return 'Hello! How can I help you with your studies today?';
    } else if (lowerQuery.includes('math')) {
        return 'I can help you with mathematics! What specific topic are you studying? Algebra, calculus, geometry?';
    } else if (lowerQuery.includes('science')) {
        return 'Science is fascinating! Are you studying physics, chemistry, or biology? I can explain concepts and provide examples.';
    } else if (lowerQuery.includes('english') || lowerQuery.includes('literature')) {
        return 'For English literature, I can help with analysis, themes, character studies, and writing techniques. What do you need help with?';
    } else if (lowerQuery.includes('help')) {
        return 'I\'m here to help with your learning! You can ask me about course material, study tips, or specific questions about your subjects.';
    } else if (lowerQuery.includes('exam') || lowerQuery.includes('test')) {
        return 'I can help you prepare for exams by explaining concepts and providing study tips. However, I won\'t provide direct answers during live exams for academic integrity.';
    } else {
        return 'That\'s an interesting question! I can help you understand this topic better. Could you provide more details about what you\'re studying?';
    }
}

function renderProfile() {
    document.getElementById('student-avatar').src = currentState.student.avatar;
    document.getElementById('student-name').textContent = currentState.student.name;
    document.getElementById('student-email').textContent = currentState.student.email;
    document.getElementById('exams-count').textContent = currentState.student.examsCount;
    document.getElementById('avg-score').textContent = `${currentState.student.avgScore}%`;
    document.getElementById('learning-hours').textContent = currentState.student.learningHours;

    // Render activity feed
    const activityFeed = document.getElementById('activity-feed');
    activityFeed.innerHTML = `
        <div class="activity-item">
            <strong>Learning Session</strong>
            <p>Completed 2 hours of study time</p>
            <small>${new Date().toLocaleString()}</small>
        </div>
        <div class="activity-item">
            <strong>Exam Completed</strong>
            <p>Mathematics Final Exam - 85%</p>
            <small>${new Date(Date.now() - 86400000).toLocaleString()}</small>
        </div>
        <div class="activity-item">
            <strong>Content Accessed</strong>
            <p>Watched "Algebra Fundamentals" video</p>
            <small>${new Date(Date.now() - 172800000).toLocaleString()}</small>
        </div>
    `;
}

function uploadAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentState.student.avatar = e.target.result;
            document.getElementById('student-avatar').src = e.target.result;
            saveData();
        };
        reader.readAsDataURL(file);
    }
}

function showAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'block';
}

function closeAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'none';
    document.getElementById('admin-password').value = '';
}

function loginAdmin() {
    const password = document.getElementById('admin-password').value;
    if (password === currentState.adminPassword) {
        currentState.isAdmin = true;
        closeAdminLogin();
        showAdminPanel();
        loadAdminPanelData();
    } else {
        alert('Incorrect admin password. Please try again.');
    }
}

function showAdminPanel() {
    // Check if admin panel already exists, if not create it
    let adminPanel = document.getElementById('admin-panel');
    if (!adminPanel) {
        createAdminPanel();
        adminPanel = document.getElementById('admin-panel');
    }

    // Show the admin panel
    adminPanel.classList.add('open');
}

function hideAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.classList.remove('open');
    }
}

function createAdminPanel() {
    // Create admin panel dynamically
    const adminPanel = document.createElement('div');
    adminPanel.id = 'admin-panel';
    adminPanel.className = 'admin-panel';
    adminPanel.innerHTML = `
        <div class="admin-header">
            <h2>Admin Control Panel</h2>
            <button class="close-admin" onclick="hideAdminPanel()">&times;</button>
        </div>

        <div class="admin-tabs">
            <button class="tab-btn active" data-tab="general">General</button>
            <button class="tab-btn" data-tab="exams">Exams</button>
            <button class="tab-btn" data-tab="content">Content</button>
            <button class="tab-btn" data-tab="live">Live</button>
        </div>

        <div class="admin-content">
            <div id="general-tab" class="tab-content active">
                <div class="admin-section">
                    <h3>Website Settings</h3>
                    <div class="form-group">
                        <label>Website Name:</label>
                        <input type="text" id="website-name-input" value="${currentState.websiteName}">
                        <button onclick="updateWebsiteName()">Update Name</button>
                    </div>
                    <div class="form-group">
                        <label>Homepage Image URL:</label>
                        <input type="text" id="homepage-image-input" placeholder="Enter image URL">
                        <button onclick="updateHomepageImage()">Update Image</button>
                    </div>
                    <div class="form-group">
                        <label>Change Admin Password:</label>
                        <input type="password" id="new-admin-password" placeholder="New password">
                        <button onclick="changeAdminPassword()">Update Password</button>
                    </div>
                </div>
            </div>

            <div id="exams-tab" class="tab-content">
                <div class="admin-section">
                    <h3>Create New Exam</h3>
                    <div class="form-group">
                        <input type="text" id="exam-title" placeholder="Exam Title">
                        <input type="text" id="exam-description" placeholder="Exam Description">
                        <input type="number" id="exam-duration" placeholder="Duration (minutes)">
                        <input type="password" id="exam-password" placeholder="Exam Password">
                        <select id="exam-category">
                            <option value="">Select Category</option>
                            <option value="math">Mathematics</option>
                            <option value="science">Science</option>
                            <option value="english">English</option>
                            <option value="history">History</option>
                        </select>
                        <button onclick="createExam()">Create Exam</button>
                    </div>
                </div>

                <div class="admin-section">
                    <h3>Manage Existing Exams</h3>
                    <div id="existing-exams" class="exams-list">
                        <!-- Existing exams will be listed here -->
                    </div>
                </div>
            </div>

            <div id="content-tab" class="tab-content">
                <div class="admin-section">
                    <h3>Add Learning Content</h3>
                    <div class="form-group">
                        <input type="text" id="content-title" placeholder="Content Title">
                        <textarea id="content-description" placeholder="Content Description"></textarea>
                        <input type="text" id="content-url" placeholder="Content URL">
                        <select id="content-type">
                            <option value="video">Video</option>
                            <option value="document">Document</option>
                            <option value="quiz">Quiz</option>
                        </select>
                        <button onclick="addLearningContent()">Add Content</button>
                    </div>
                </div>

                <div class="admin-section">
                    <h3>Manage Student Images</h3>
                    <div class="form-group">
                        <input type="text" id="student-image-url" placeholder="Student Image URL">
                        <button onclick="updateStudentImages()">Update Student Images</button>
                    </div>
                </div>
            </div>

            <div id="live-tab" class="tab-content">
                <div class="admin-section">
                    <h3>Live Session Controls</h3>
                    <div class="form-group">
                        <label>Start Live Exam Session</label>
                        <select id="live-exam-select">
                            <option value="">Select Exam</option>
                        </select>
                        <button onclick="startLiveSession()">Start Live Session</button>
                    </div>

                    <div class="form-group">
                        <label>Live Session Status</label>
                        <div id="live-status">No active session</div>
                    </div>

                    <div class="form-group">
                        <label>Participants</label>
                        <div id="participants-list">No participants</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(adminPanel);

    // Add the CSS for admin panel if not already present
    addAdminPanelStyles();

    // Load initial data
    loadAdminPanelData();
}

function addAdminPanelStyles() {
    // Check if admin panel styles are already added
    if (document.getElementById('admin-panel-styles')) return;

    const adminStyles = document.createElement('style');
    adminStyles.id = 'admin-panel-styles';
    adminStyles.textContent = `
        .admin-panel {
            position: fixed;
            top: 0;
            right: -400px;
            width: 400px;
            height: 100vh;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            z-index: 1001;
            transition: right 0.3s ease;
            padding: 2rem;
            overflow-y: auto;
            color: white;
        }

        .admin-panel.open {
            right: 0;
        }
    `;
    document.head.appendChild(adminStyles);
}

function switchAdminTab(tab) {
    // Check if admin panel exists and is open
    const adminPanel = document.getElementById('admin-panel');
    if (!adminPanel || !adminPanel.classList.contains('open')) return;

    // Remove active class from all tabs and content
    adminPanel.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    adminPanel.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to selected tab and content
    adminPanel.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    adminPanel.querySelector(`#${tab}-tab`).classList.add('active');
}

function loadAdminPanelData() {
    // Load general settings
    const nameInput = document.getElementById('website-name-input');
    if (nameInput) nameInput.value = currentState.websiteName;

    const imageInput = document.getElementById('homepage-image-input');
    if (imageInput) imageInput.value = currentState.homepageImage;

    // Load existing exams
    renderExistingExams();

    // Load live exam options
    loadLiveExamOptions();

    // Load content management
    loadContentManagement();
}

function loadLiveExamOptions() {
    const examSelect = document.getElementById('live-exam-select');
    if (!examSelect) return;

    examSelect.innerHTML = '<option value="">Select Exam</option>';

    currentState.exams.forEach(exam => {
        if (exam.isActive) {
            const option = document.createElement('option');
            option.value = exam.id;
            option.textContent = exam.title;
            examSelect.appendChild(option);
        }
    });
}

function loadContentManagement() {
    // Update content management UI if needed
    const studentImageUrlInput = document.getElementById('student-image-url');
    if (studentImageUrlInput) {
        studentImageUrlInput.placeholder = 'Enter new student image URL';
    }
}

function updateWebsiteName() {
    const newName = document.getElementById('website-name-input').value;
    if (newName.trim()) {
        currentState.websiteName = newName;
        document.getElementById('website-name').textContent = newName;
        saveData();
        showToast('Website name updated successfully!', 'success');
    }
}

function updateHomepageImage() {
    const newImageUrl = document.getElementById('homepage-image-input').value;
    if (newImageUrl.trim()) {
        currentState.homepageImage = newImageUrl;
        document.getElementById('homepage-image').src = newImageUrl;
        saveData();
        showToast('Homepage image updated successfully!', 'success');
    }
}

function updateStudentImages() {
    const newImageUrl = document.getElementById('student-image-url').value;
    if (newImageUrl.trim()) {
        // Update default student avatar
        currentState.student.avatar = newImageUrl;

        // Update current student profile if on profile page
        if (currentState.currentPage === 'profile') {
            renderProfile();
        }

        saveData();
        showToast('Student images updated successfully!', 'success');
    }
}

function startLiveSession() {
    const examId = document.getElementById('live-exam-select').value;
    if (!examId) {
        showToast('Please select an exam to start a live session', 'error');
        return;
    }

    const exam = currentState.exams.find(e => e.id == examId);
    if (exam) {
        // Update live session status
        const statusDiv = document.getElementById('live-status');
        if (statusDiv) {
            statusDiv.textContent = `Live session started for: ${exam.title}`;
            statusDiv.style.color = '#4CAF50';
        }

        showToast(`Live session started for ${exam.title}`, 'success');

        // In a real implementation, this would broadcast to connected students
        // For now, we'll just simulate
        updateParticipantsList(exam);
    }
}

function updateParticipantsList(exam) {
    const participantsDiv = document.getElementById('participants-list');
    if (participantsDiv) {
        participantsDiv.innerHTML = `
            <div>Active Participants: ${exam.participants}</div>
            <div>Last Activity: Just now</div>
        `;
    }
}

function renderExistingExams() {
    const container = document.getElementById('existing-exams');
    if (!container) return;

    container.innerHTML = '';

    currentState.exams.forEach(exam => {
        const examItem = document.createElement('div');
        examItem.className = 'exam-item';

        examItem.innerHTML = `
            <div>
                <strong>${exam.title}</strong>
                <p>${exam.description}</p>
                <small>Duration: ${exam.duration}min | Participants: ${exam.participants}</small>
            </div>
            <div class="exam-actions">
                <button class="action-btn" onclick="toggleExamStatus(${exam.id})">
                    ${exam.isActive ? 'Disable' : 'Enable'}
                </button>
                <button class="action-btn" onclick="editExam(${exam.id})">Edit</button>
                <button class="action-btn" onclick="deleteExam(${exam.id})">Delete</button>
            </div>
        `;

        container.appendChild(examItem);
    });
}

function toggleExamStatus(examId) {
    const exam = currentState.exams.find(e => e.id === examId);
    if (exam) {
        exam.isActive = !exam.isActive;
        saveData();
        renderExistingExams();
    }
}

function editExam(examId) {
    const exam = currentState.exams.find(e => e.id === examId);
    if (exam) {
        // Fill form with exam data for editing
        document.getElementById('exam-title').value = exam.title;
        document.getElementById('exam-description').value = exam.description;
        document.getElementById('exam-duration').value = exam.duration;
        document.getElementById('exam-password').value = exam.password;
        document.getElementById('exam-category').value = exam.category;

        // Change button to update mode
        const createBtn = document.querySelector('#exams-tab .form-group button');
        createBtn.textContent = 'Update Exam';
        createBtn.onclick = () => updateExam(examId);
    }
}

function updateExam(examId) {
    const exam = currentState.exams.find(e => e.id === examId);
    if (exam) {
        exam.title = document.getElementById('exam-title').value;
        exam.description = document.getElementById('exam-description').value;
        exam.duration = parseInt(document.getElementById('exam-duration').value);
        exam.password = document.getElementById('exam-password').value;
        exam.category = document.getElementById('exam-category').value;

        saveData();
        renderExistingExams();

        // Reset form
        resetExamForm();
    }
}

function deleteExam(examId) {
    if (confirm('Are you sure you want to delete this exam?')) {
        currentState.exams = currentState.exams.filter(e => e.id !== examId);
        saveData();
        renderExistingExams();
    }
}

function createExam() {
    const title = document.getElementById('exam-title').value;
    const description = document.getElementById('exam-description').value;
    const duration = parseInt(document.getElementById('exam-duration').value);
    const password = document.getElementById('exam-password').value;
    const category = document.getElementById('exam-category').value;

    if (!title || !description || !duration || !password || !category) {
        alert('Please fill in all fields');
        return;
    }

    const newExam = {
        id: Date.now(), // Unique ID
        title,
        description,
        duration,
        category,
        password,
        isActive: true,
        participants: 0
    };

    currentState.exams.push(newExam);
    saveData();
    renderExistingExams();
    resetExamForm();

    // Refresh exams list if on exams page
    if (currentState.currentPage === 'exams') {
        renderExamsList();
    }

    alert('Exam created successfully!');
}

function resetExamForm() {
    document.getElementById('exam-title').value = '';
    document.getElementById('exam-description').value = '';
    document.getElementById('exam-duration').value = '';
    document.getElementById('exam-password').value = '';
    document.getElementById('exam-category').value = '';

    // Reset button to create mode
    const createBtn = document.querySelector('#exams-tab .form-group button');
    createBtn.textContent = 'Create Exam';
    createBtn.onclick = createExam;
}

function addLearningContent() {
    const title = document.getElementById('content-title').value;
    const description = document.getElementById('content-description').value;
    const url = document.getElementById('content-url').value;
    const type = document.getElementById('content-type').value;

    if (!title || !description || !url || !type) {
        alert('Please fill in all fields');
        return;
    }

    const newContent = {
        id: Date.now(),
        title,
        description,
        url,
        type,
        category: 'general' // Could be dynamic based on selection
    };

    currentState.learningContent.push(newContent);
    saveData();

    // Clear form
    document.getElementById('content-title').value = '';
    document.getElementById('content-description').value = '';
    document.getElementById('content-url').value = '';

    alert('Learning content added successfully!');

    // Refresh learning page if currently viewing
    if (currentState.currentPage === 'learning') {
        renderLearningContent();
    }
}

function changeAdminPassword() {
    const newPassword = document.getElementById('new-admin-password').value;
    if (newPassword.length >= 6) {
        currentState.adminPassword = newPassword;
        saveData();
        alert('Admin password updated successfully!');
        document.getElementById('new-admin-password').value = '';
    } else {
        alert('Password must be at least 6 characters long');
    }
}

function updateUI() {
    // Update website name
    document.getElementById('website-name').textContent = currentState.websiteName;

    // Update homepage image
    document.getElementById('homepage-image').src = currentState.homepageImage;

    // Initialize mode
    updateModeUI();
}

function updateModeUI() {
    const body = document.body;
    const modeToggle = document.querySelector('.mode-toggle');
    const icon = modeToggle.querySelector('i');

    if (currentState.mode === 'night') {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        icon.className = 'fas fa-sun';
        modeToggle.setAttribute('title', 'Switch to Day Mode');
    } else {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        icon.className = 'fas fa-moon';
        modeToggle.setAttribute('title', 'Switch to Night Mode');
    }
}

// Export functions that need to be accessible globally
window.navigateTo = navigateTo;
window.showAdminLogin = showAdminLogin;
window.closeAdminLogin = closeAdminLogin;
window.loginAdmin = loginAdmin;
window.showAdminPanel = showAdminPanel;
window.hideAdminPanel = hideAdminPanel;
window.switchAdminTab = switchAdminTab;
window.createExam = createExam;
window.addLearningContent = addLearningContent;
window.changeAdminPassword = changeAdminPassword;
window.joinExam = joinExam;
window.closeModal = closeModal;
window.uploadAvatar = uploadAvatar;
window.sendAIQuery = sendAIQuery;
window.handleAIKeyPress = handleAIKeyPress;
window.accessContent = accessContent;
window.toggleExamStatus = toggleExamStatus;
window.editExam = editExam;
window.deleteExam = deleteExam;
window.filterExams = filterExams;
window.openExamModal = openExamModal;
window.toggleMode = toggleMode;

// Additional utility functions
function showToast(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        background: ${
            type === 'success' ? 'linear-gradient(45deg, #4CAF50, #45a049)' :
            type === 'error' ? 'linear-gradient(45deg, #f44336, #da190b)' :
            'linear-gradient(45deg, #2196F3, #1976D2)'
        };
    `;

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function showNotification(title, message, type = 'info') {
    // Enhanced notification system
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-header">
            <h4>${title}</h4>
            <button class="close-notification">&times;</button>
        </div>
        <p>${message}</p>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 350px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 15px;
        color: white;
        z-index: 10000;
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Add close functionality
    notification.querySelector('.close-notification').onclick = () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    };

    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Add CSS for toasts and notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .toast {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .notification {
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    }

    .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .close-notification {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-notification:hover {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
    }
`;
document.head.appendChild(style);

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // Ctrl + M to toggle mode
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        toggleMode();
    }

    // Ctrl + , to open admin panel (if admin)
    if (e.ctrlKey && e.key === ',') {
        e.preventDefault();
        if (currentState.isAdmin) {
            showAdminPanel();
        } else {
            showAdminLogin();
        }
    }
});

// Add loading states for better UX
function showLoading(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    element.disabled = true;
    element.dataset.originalContent = originalContent;
}

function hideLoading(element) {
    element.innerHTML = element.dataset.originalContent || element.innerHTML.replace('<i class="fas fa-spinner fa-spin"></i> Loading...', '');
    element.disabled = false;
}

console.log('Live Exam Portal with enhanced features initialized successfully!');

console.log('Live Exam Portal initialized successfully!');