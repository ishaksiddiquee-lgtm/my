# Live Exam Portal - Enhanced Edition

A comprehensive online examination platform with modern UI, advanced animations, day/night modes, and full functionality for both students and administrators.

## 🌟 Enhanced Features

### 🎨 Visual Enhancements
- **Modern UI with Advanced Animations**: Beautiful, animated interface with smooth transitions and hover effects
- **Day/Night Mode Toggle**: Fully functional theme switching with keyboard shortcut (Ctrl+M)
- **Night Sky Background**: Animated starry background in night mode with twinkling stars
- **Glass Morphism Effects**: Modern frosted glass UI elements
- **Smooth Page Transitions**: Seamless navigation between sections

### 📱 User Experience
- **Responsive Design**: Works perfectly on mobile and desktop devices
- **No Page Reloads**: Single-page application experience during exams
- **Real-time Updates**: Live session support with smooth animations
- **Enhanced Accessibility**: Keyboard navigation and focus management
- **Loading States**: Visual feedback for all user interactions

### 👤 User Roles
- **Student**: Take exams, access learning materials, manage profile
- **Admin**: Full control over the platform and content

### 🔧 Admin System
- Secure admin login with password protection
- Ability to change admin password anytime
- Full control over website content and features
- Create, edit, and delete exams
- Set exam passwords and enable/disable exams
- Change website name and content
- Add/remove buttons and navigation
- Create new folders and sections
- Update learning content
- Manage AI board settings
- Upload and change images

### 📚 Exam System
- Live exam sessions with timer
- Password-protected exams
- Automatic submission when time ends
- Real-time exam participation
- Exam statistics and analytics
- Enhanced question navigation

### 📖 Learning Section
- Comprehensive learning materials
- Video tutorials and study documents
- Practice tests and quizzes
- Progress tracking
- Interactive content

### 🤖 AI Board
- Intelligent learning assistant
- Study guidance and question answering
- Separate from exam assistance for integrity
- Enhanced chat interface

### 👤 Student Profile
- Personal profile management
- Profile picture uploads
- Exam history and statistics
- Learning progress tracking

### 💡 Additional Features
- **Toast Notifications**: Visual feedback for user actions
- **Keyboard Shortcuts**: Ctrl+M for mode toggle, Ctrl+, for admin panel
- **Smooth Scrolling**: Animated scroll behavior
- **Intersection Observer**: Scroll-triggered animations
- **Enhanced Forms**: Better validation and feedback
- **Performance Optimized**: Efficient animations and rendering

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations, transitions, and responsive design
- **JavaScript ES6+**: Client-side functionality and state management
- **Local Storage**: Data persistence without backend
- **Express.js**: Lightweight server for development
- **Font Awesome**: Iconography
- **Google Fonts**: Typography
- **Intersection Observer API**: Scroll animations
- **CSS Variables**: Theme management

## File Structure

```
live-exam-portal/
├── index.html          # Main application page with all sections
├── exam.html           # Dedicated exam-taking interface
├── styles.css          # Complete styling with animations and themes
├── script.js           # Main application logic with enhanced features
├── server.js           # Express.js server for development
├── package.json        # Project configuration and dependencies
├── README.md           # Complete documentation
└── (all in one folder)
```

## Installation & Setup

### Quick Start (Recommended)
1. Navigate to the project folder:
   ```cmd
   cd "C:\Users\pc\Desktop\New folder (2)\live-exam-portal"
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Start the server:
   ```cmd
   npm start
   ```

4. Visit `http://localhost:3000` in your browser

### Alternative Method (Direct Browser)
1. Open `index.html` directly in any modern web browser
2. The application will work without a server (with limited features)

## Default Credentials

- **Admin Password**: `admin123` (can be changed in admin panel)

## Keyboard Shortcuts

- **Ctrl + M**: Toggle between day and night mode
- **Ctrl + ,**: Open admin panel (when logged in as admin)
- **Arrow Keys**: Navigate questions in exam mode
- **Ctrl + Enter**: Submit exam early

## Usage

### For Students
1. Navigate to the homepage
2. Browse available exams
3. Enter exam password to join
4. Complete the exam with automatic timer
5. Access learning materials and AI assistance
6. Manage your profile
7. Toggle between day and night modes using the sun/moon button

### For Administrators
1. Click the lock icon in the header
2. Enter admin password
3. Access the admin control panel
4. Manage exams, content, and settings
5. Customize the platform as needed
6. Switch themes using Ctrl+M

## Customization

### Changing Website Name
- Use the admin panel under "General" tab
- Or modify in `script.js` in the `currentState` object

### Updating Images
- Homepage images can be changed via admin panel
- Profile images can be uploaded by students
- All images are stored in browser's local storage

### Adding Exams
- Use the admin panel "Exams" tab
- Fill in exam details including title, description, duration, and password

### Theme Customization
- Day mode: Purple/blue gradient theme
- Night mode: Dark blue gradient with starry background
- Themes are automatically saved in local storage

## Security Features

- Password-protected admin access
- Exam passwords for secure entry
- Local storage encryption
- Session management
- Time-based exam controls

## Browser Compatibility

- Chrome (latest versions)
- Firefox (latest versions)
- Safari (latest versions)
- Edge (latest versions)

## Performance Features

- Optimized animations with CSS hardware acceleration
- Efficient DOM manipulation
- Local data storage
- Lazy loading where appropriate
- Responsive design with flexible grids
- Smooth scrolling and transitions

## Development Scripts

- `npm start`: Start the development server
- `npm run dev`: Start with auto-reload (requires nodemon)
- `npm install`: Install all dependencies

## License

This project is created for educational and demonstration purposes. Feel free to use and modify for your own projects.

---

**Note**: This is a frontend-focused implementation with local storage. In a production environment, you would need to connect this to a backend server for persistent data storage and user authentication. The enhanced version includes advanced animations, theme switching, and improved user experience features.