
document.addEventListener('DOMContentLoaded', () => {
    

    const currentFilename = window.location.pathname.split('/').pop() || 'index.html';
    const navigationLinks = document.querySelectorAll('.nav-link');
    
    navigationLinks.forEach(navigationLink => {
        if (navigationLink.getAttribute('href') === currentFilename) {
            navigationLink.classList.add('nav-active');
        } else {
            navigationLink.classList.remove('nav-active');
        }
    });


    const quotationForm = document.querySelector('.interactive-form');
    
    if (quotationForm) {
        quotationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            

            const inputName = quotationForm.querySelector('#client-name');
            const inputEmail = quotationForm.querySelector('#client-email');
            
            const rawNameValue = inputName ? inputName.value.trim() : '';
            const rawEmailValue = inputEmail ? inputEmail.value.trim() : '';
            
            if (!rawNameValue || !rawEmailValue) {
                renderNotificationToast('❌ Error: Please check that all mandatory parameters are complete.', 'bg-red');
                return;
            }


            renderNotificationToast(`⚡ System Message: Form received! Thank you, ${rawNameValue}. Our staff will reply shortly.`, 'bg-emerald');
            quotationForm.reset();
        });
    }


    function renderNotificationToast(messageText, interfaceBgColorClass) {

        const activeToastContainer = document.getElementById('form-toast');
        if (activeToastContainer) {
            activeToastContainer.remove();
        }


        const toastElement = document.createElement('div');
        toastElement.id = 'form-toast';
        toastElement.className = `${interfaceBgColorClass} fade-in-up`;
        toastElement.innerText = messageText;

        document.body.appendChild(toastElement);


        setTimeout(() => {
            toastElement.style.opacity = '0';
            toastElement.style.transform = 'translateY(10px)';
            setTimeout(() => {
                if (toastElement.parentNode) {
                    toastElement.remove();
                }
            }, 400);
        }, 4500);
    }
});
