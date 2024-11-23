document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const profileContainer = document.querySelector('.profile-container');
    const contentContainer = document.querySelector('.content-container');
    const contactForm = document.getElementById('contact-form');

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toLocaleString(),
            };

            // Store in localStorage
            let submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('formSubmissions', JSON.stringify(submissions));

            // Create CSV data
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Name,Email,Message,Timestamp\n";
            csvContent += `${formData.name},${formData.email},${formData.message},${formData.timestamp}\n`;

            // Create download link
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `contact_submission_${formData.timestamp}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message
            alert('Form submitted successfully! CSV file will be downloaded.');

            // Clear form
            contactForm.reset();

            // Log all submissions
            console.log('All submissions:', submissions);
        });
    }

    // Function to view all submissions
        window.viewSubmissions = function () {
            const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
            console.table(submissions);
            return submissions;
        };

    // Function to set the active section
    function setActiveSection(sectionId) {
        // Update navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });

        // Update sections
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        // Handle layout changes
        if (sectionId === 'home') {
            profileContainer.style.order = '2';
            contentContainer.style.order = '1';
        } else {
            profileContainer.style.order = '1';
            contentContainer.style.order = '2';
        }
    }

    // Add click handlers to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            setActiveSection(sectionId);
        });
    });

    // Handle header transparency on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        }
    });

    // Set initial state
    setActiveSection('home');
});
