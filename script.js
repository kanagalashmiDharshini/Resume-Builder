// Email Validation
function validateEmail() {
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please provide a valid email address.');
        return false;
    }
    return true;
}

// Initialize Phone Input with Country Code
function initializePhoneInput() {
    const phoneInput = document.querySelector(".phone-input");
    window.intlTelInput(phoneInput, {
        initialCountry: "auto",
        geoIpLookup: function (success, failure) {
            fetch("https://ipinfo.io?token=your_token_here")
                .then(response => response.json())
                .then(data => success(data.country))
                .catch(() => success("us"));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
}

// Toggle User Type (Fresher/Experienced)
function toggleUserFields() {
    const userType = document.getElementById('userType').value;
    document.getElementById('fresherFields').style.display = userType === 'fresher' ? 'block' : 'none';
    document.getElementById('experiencedFields').style.display = userType === 'experienced' ? 'block' : 'none';
}

// Generate Resume Content
function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;
    const userType = document.getElementById('userType').value;
    const template = document.getElementById('template').value;

    let details = `<h2>${name}</h2><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Summary:</strong> ${summary}</p>`;

    if (userType === 'fresher') {
        const cgpa = document.getElementById('cgpa').value;
        const projects = document.getElementById('projects').value;
        details += `<p><strong>CGPA:</strong> ${cgpa}</p><p><strong>Projects/Internships:</strong> ${projects}</p>`;
    } else {
        const company = document.getElementById('company').value;
        const years = document.getElementById('years').value;
        const expProjects = document.getElementById('expProjects').value;
        details += `<p><strong>Company:</strong> ${company}</p><p><strong>Years of Experience:</strong> ${years}</p><p><strong>Projects:</strong> ${expProjects}</p>`;
    }

    document.getElementById('resume-preview').innerHTML = details;
}

// Download Resume as PDF with Template
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const resumeContent = document.getElementById('resume-preview').innerHTML;

    doc.setFontSize(12);
    doc.fromHTML(resumeContent, 15, 15);
    doc.save('resume.pdf');
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    initializePhoneInput();
    toggleUserFields();
});
