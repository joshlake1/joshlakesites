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
        button.addEventListener('click', (e) => {
            const targetPlan = button.getAttribute('data-plan');
            if (packageSelect) {
                packageSelect.value = targetPlan;
            }
        });
    });

    // 3. Clean Contact Form Submission Handler
    const projectForm = document.getElementById('projectForm');

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Capture data values for production analytics/hooks
        const clientName = document.getElementById('name').value;
        const clientEmail = document.getElementById('email').value;
        const selectedPackage = packageSelect.value;
        const clientMessage = document.getElementById('message').value;

        // Custom UI Success Feedback
        const submitBtn = projectForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Inquiry... <i class="fas fa-spinner fa-spin"></i>';

        // Simulating processing delay before validation messaging
        setTimeout(() => {
            submitBtn.style.backgroundColor = '#10b981'; // Green accent
            submitBtn.innerHTML = 'Inquiry Sent Successfully! <i class="fas fa-check"></i>';
            
            // Reset fields
            projectForm.reset();

            // Revert button interface state
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                submitBtn.innerHTML = originalText;
            }, 4000);
        }, 1200);
    });
});
