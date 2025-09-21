// Multi-language support for ES1 Class Organization
const LANGUAGES = {
    en: {
        // Navigation
        navHome: 'Home',
        navSchedule: 'Weekly Program',
        navSubjects: 'Subjects',
        navAgenda: 'Agenda',
        navAdminLogin: 'Admin Login',
        
        // Hero Section
        heroTitle: 'Welcome to ES1 Class Organization',
        heroSubtitle: 'Your complete learning management system',
        heroViewSchedule: 'View Schedule',
        heroBrowseSubjects: 'Browse Subjects',
        
        // Sections
        sectionSchedule: 'Weekly Program',
        sectionSubjects: 'Subjects',
        sectionAgenda: 'Homework Agenda',
        
        // Empty Messages
        emptySchedule: 'No schedule available yet. Admin can add classes through the admin panel.',
        emptySubjects: 'No subjects available yet. Admin can add subjects through the admin panel.',
        emptyHomework: 'No homework assignments available yet. Admin can add homework through the admin panel.',
        
        // Login Page
        loginTitle: 'Admin Login',
        loginSubtitle: 'Access the ES1 Class management system',
        loginUsername: 'Username',
        loginPassword: 'Password',
        loginButton: 'Login',
        loginBackHome: '← Back to Home',
        
        // Admin Panel
        adminTitle: 'ES1 Class - Admin Panel',
        adminWelcome: 'Welcome',
        adminLogout: 'Logout',
        adminDashboard: 'Dashboard',
        adminScheduleManagement: 'Schedule Management',
        adminSubjectsChapters: 'Subjects & Chapters',
        adminUserManagement: 'User Management',
        adminHomework: 'Homework',
        
        // Dashboard
        dashboardOverview: 'Dashboard Overview',
        dashboardUsers: 'Total Users',
        dashboardSubjects: 'Total Subjects',
        dashboardClasses: 'This Week\'s Classes',
        dashboardActivity: 'Recent Activity',
        
        // Forms
        formDay: 'Day',
        formSelectDay: 'Select Day',
        formSubject: 'Subject',
        formSubjectName: 'Subject Name',
        formDescription: 'Description',
        formChapterTitle: 'Chapter Title',
        formLessons: 'Number of Lessons',
        formDuration: 'Duration',
        formUsername: 'Username',
        formPassword: 'Password',
        formRole: 'Role',
        formSelectRole: 'Select Role',
        formPermissions: 'Permissions (for teachers)',
        formManageSchedule: 'Manage Schedule',
        formAddContent: 'Add Content',
        formManageHomework: 'Manage Homework',
        formAssignmentDescription: 'Assignment Description',
        formDueDate: 'Due Date',
        
        // Buttons
        btnAdd: 'Add',
        btnAddClass: 'Add Class',
        btnAddSubject: 'Add Subject',
        btnAddChapter: 'Add Chapter',
        btnAddUser: 'Add User',
        btnAddHomework: 'Add Homework',
        btnDelete: 'Delete',
        btnUploadFiles: 'Upload Files',
        btnViewFiles: 'View Files',
        
        // Messages
        msgLoginSuccess: 'Login successful!',
        msgInvalidCredentials: 'Invalid credentials',
        msgClassAdded: 'Class added successfully!',
        msgSubjectAdded: 'Subject added successfully!',
        msgChapterAdded: 'Chapter added successfully!',
        msgUserAdded: 'User added successfully!',
        msgHomeworkAdded: 'Homework added successfully!',
        msgFilesUploaded: 'Files uploaded successfully!',
        msgDeleteConfirm: 'Are you sure you want to delete this',
        msgDeleted: 'deleted successfully!',
        
        // File Upload
        uploadImages: 'Upload Images',
        uploadPDFs: 'Upload PDFs',
        uploadSelectFiles: 'Select files to upload',
        uploadDragDrop: 'Drag and drop files here or click to select',
        uploadMaxSize: 'Maximum file size: 10MB',
        uploadAllowedTypes: 'Allowed types: Images (JPG, PNG, GIF) and PDF files',
        uploadTeacherRestriction: 'Teachers can only upload PDF files',
        
        // Days of week
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
        
        // Roles
        roleAdmin: 'Admin',
        roleTeacher: 'Teacher',
        roleStudent: 'Student',
        
        // Footer
        footerCopyright: '© 2024 ES1 Class Organization. All rights reserved.',
        
        // Chapters
        chaptersTitle: 'Chapters',
        chapterImages: 'Images',
        chapterPDFs: 'PDF Files',
        chapterNoFiles: 'No files uploaded yet',
        chapterLessons: 'lessons',
        
        // Backup
        backupCreated: 'Backup created and sent successfully',
        backupError: 'Error creating backup'
    },
    
    fr: {
        // Navigation
        navHome: 'Accueil',
        navSchedule: 'Programme Hebdomadaire',
        navSubjects: 'Matières',
        navAgenda: 'Agenda',
        navAdminLogin: 'Connexion Admin',
        
        // Hero Section
        heroTitle: 'Bienvenue à l\'Organisation de Classe ES1',
        heroSubtitle: 'Votre système de gestion d\'apprentissage complet',
        heroViewSchedule: 'Voir l\'Horaire',
        heroBrowseSubjects: 'Parcourir les Matières',
        
        // Sections
        sectionSchedule: 'Programme Hebdomadaire',
        sectionSubjects: 'Matières',
        sectionAgenda: 'Agenda des Devoirs',
        
        // Empty Messages
        emptySchedule: 'Aucun horaire disponible pour le moment. L\'administrateur peut ajouter des cours via le panneau d\'administration.',
        emptySubjects: 'Aucune matière disponible pour le moment. L\'administrateur peut ajouter des matières via le panneau d\'administration.',
        emptyHomework: 'Aucun devoir disponible pour le moment. L\'administrateur peut ajouter des devoirs via le panneau d\'administration.',
        
        // Login Page
        loginTitle: 'Connexion Administrateur',
        loginSubtitle: 'Accéder au système de gestion de classe ES1',
        loginUsername: 'Nom d\'utilisateur',
        loginPassword: 'Mot de passe',
        loginButton: 'Se connecter',
        loginBackHome: '← Retour à l\'Accueil',
        
        // Admin Panel
        adminTitle: 'Classe ES1 - Panneau d\'Administration',
        adminWelcome: 'Bienvenue',
        adminLogout: 'Déconnexion',
        adminDashboard: 'Tableau de Bord',
        adminScheduleManagement: 'Gestion des Horaires',
        adminSubjectsChapters: 'Matières et Chapitres',
        adminUserManagement: 'Gestion des Utilisateurs',
        adminHomework: 'Devoirs',
        
        // Dashboard
        dashboardOverview: 'Aperçu du Tableau de Bord',
        dashboardUsers: 'Total des Utilisateurs',
        dashboardSubjects: 'Total des Matières',
        dashboardClasses: 'Cours de Cette Semaine',
        dashboardActivity: 'Activité Récente',
        
        // Forms
        formDay: 'Jour',
        formSelectDay: 'Sélectionner le Jour',
        formSubject: 'Matière',
        formSubjectName: 'Nom de la Matière',
        formDescription: 'Description',
        formChapterTitle: 'Titre du Chapitre',
        formLessons: 'Nombre de Leçons',
        formDuration: 'Durée',
        formUsername: 'Nom d\'utilisateur',
        formPassword: 'Mot de passe',
        formRole: 'Rôle',
        formSelectRole: 'Sélectionner le Rôle',
        formPermissions: 'Permissions (pour les enseignants)',
        formManageSchedule: 'Gérer l\'Horaire',
        formAddContent: 'Ajouter du Contenu',
        formManageHomework: 'Gérer les Devoirs',
        formAssignmentDescription: 'Description du Devoir',
        formDueDate: 'Date d\'Échéance',
        
        // Buttons
        btnAdd: 'Ajouter',
        btnAddClass: 'Ajouter un Cours',
        btnAddSubject: 'Ajouter une Matière',
        btnAddChapter: 'Ajouter un Chapitre',
        btnAddUser: 'Ajouter un Utilisateur',
        btnAddHomework: 'Ajouter un Devoir',
        btnDelete: 'Supprimer',
        btnUploadFiles: 'Télécharger des Fichiers',
        btnViewFiles: 'Voir les Fichiers',
        
        // Messages
        msgLoginSuccess: 'Connexion réussie!',
        msgInvalidCredentials: 'Identifiants invalides',
        msgClassAdded: 'Cours ajouté avec succès!',
        msgSubjectAdded: 'Matière ajoutée avec succès!',
        msgChapterAdded: 'Chapitre ajouté avec succès!',
        msgUserAdded: 'Utilisateur ajouté avec succès!',
        msgHomeworkAdded: 'Devoir ajouté avec succès!',
        msgFilesUploaded: 'Fichiers téléchargés avec succès!',
        msgDeleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce',
        msgDeleted: 'supprimé avec succès!',
        
        // File Upload
        uploadImages: 'Télécharger des Images',
        uploadPDFs: 'Télécharger des PDFs',
        uploadSelectFiles: 'Sélectionner les fichiers à télécharger',
        uploadDragDrop: 'Glisser-déposer les fichiers ici ou cliquer pour sélectionner',
        uploadMaxSize: 'Taille maximale du fichier: 10MB',
        uploadAllowedTypes: 'Types autorisés: Images (JPG, PNG, GIF) et fichiers PDF',
        uploadTeacherRestriction: 'Les enseignants ne peuvent télécharger que des fichiers PDF',
        
        // Days of week
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi',
        sunday: 'Dimanche',
        
        // Roles
        roleAdmin: 'Administrateur',
        roleTeacher: 'Enseignant',
        roleStudent: 'Étudiant',
        
        // Footer
        footerCopyright: '© 2024 Organisation de Classe ES1. Tous droits réservés.',
        
        // Chapters
        chaptersTitle: 'Chapitres',
        chapterImages: 'Images',
        chapterPDFs: 'Fichiers PDF',
        chapterNoFiles: 'Aucun fichier téléchargé pour le moment',
        chapterLessons: 'leçons',
        
        // Backup
        backupCreated: 'Sauvegarde créée et envoyée avec succès',
        backupError: 'Erreur lors de la création de la sauvegarde'
    }
};

// Language management functions
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

function getCurrentLanguage() {
    return currentLanguage;
}

function setLanguage(lang) {
    if (LANGUAGES[lang]) {
        currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        updatePageLanguage();
        return true;
    }
    return false;
}

function getText(key) {
    return LANGUAGES[currentLanguage]?.[key] || LANGUAGES.en[key] || key;
}

function updatePageLanguage() {
    // Update elements with data-text attributes
    document.querySelectorAll('[data-text]').forEach(element => {
        const key = element.getAttribute('data-text');
        element.textContent = getText(key);
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        element.placeholder = getText(key);
    });
    
    // Update titles
    document.querySelectorAll('[data-title]').forEach(element => {
        const key = element.getAttribute('data-title');
        element.title = getText(key);
    });
    
    // Update language toggle button
    const langToggle = document.getElementById('currentLang');
    if (langToggle) {
        langToggle.textContent = currentLanguage.toUpperCase();
    }
    
    // Trigger custom event for pages that need special handling
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLanguage } }));
}

function toggleLanguage() {
    const newLang = currentLanguage === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    updatePageLanguage();
    
    // Add language toggle functionality
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LANGUAGES, getCurrentLanguage, setLanguage, getText, updatePageLanguage, toggleLanguage };
} else {
    window.LANGUAGES = LANGUAGES;
    window.getCurrentLanguage = getCurrentLanguage;
    window.setLanguage = setLanguage;
    window.getText = getText;
    window.updatePageLanguage = updatePageLanguage;
    window.toggleLanguage = toggleLanguage;
}
