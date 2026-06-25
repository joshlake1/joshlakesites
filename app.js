document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // 2. Interactive Pricing Selection Flow
    const planButtons = document.querySelectorAll('.select-plan');
    const packageSelect = document.getElementById('package');

    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPlan = button.getAttribute('data-plan');
            if (packageSelect) {
                packageSelect.value = targetPlan;
            }
        });
    });

    // 3. Production Formspree AJAX Submission Handler
    const projectForm = document.getElementById('projectForm');

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = projectForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Put button into responsive loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Inquiry... <i class="fas fa-spinner fa-spin"></i>';

        // Gather the form data automatically via the HTML name tags
        const formData = new FormData(projectForm);

        // Send the real AJAX request directly to your Formspree endpoint
        fetch(projectForm.action, {
            method: projectForm.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success State Animation
                submitBtn.style.backgroundColor = '#10b981'; // Premium Green
                submitBtn.innerHTML = 'Inquiry Sent Successfully! <i class="fas fa-check"></i>';
                projectForm.reset();
            } else {
                // Server Side Error Handlers
                response.json().then(data => {
                    submitBtn.style.backgroundColor = '#ef4444'; // Error Red
                    if (Object.hasOwn(data, 'errors')) {
                        submitBtn.innerHTML = 'Submission Error. Please check fields. <i class="fas fa-exclamation-circle"></i>';
                    } else {
                        submitBtn.innerHTML = 'Oops! Form configuration issue. <i class="fas fa-exclamation-circle"></i>';
                    }
                });
            }
        })
        .catch(error => {
            // Client Network/Connection Loss Handler
            submitBtn.style.backgroundColor = '#ef4444';
            submitBtn.innerHTML = 'Network Error. Check your internet connection. <i class="fas fa-wifi"></i>';
        })
        .finally(() => {
            // Clean interface loop: Reset button layout back to default after 4 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                submitBtn.innerHTML = originalText;
            }, 4000);
        });
    });
});
