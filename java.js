function updateDisplaySupport() {
    const pixelRatio = window.devicePixelRatio || 1;
    const screenWidth = Math.max(window.screen.width || 0, window.screen.availWidth || 0) * pixelRatio;
    const screenHeight = Math.max(window.screen.height || 0, window.screen.availHeight || 0) * pixelRatio;
    const isSupportedDisplay = screenWidth >= 1600 && screenHeight >= 900;

    document.body.classList.toggle('unsupported-display', !isSupportedDisplay);
}

updateDisplaySupport();
window.addEventListener('resize', updateDisplaySupport);

const submitButton = document.getElementById("submit-form");

if (submitButton) {
    submitButton.addEventListener("click", function() {
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        const subject = encodeURIComponent(subjectInput ? subjectInput.value : "");
        const body = encodeURIComponent(messageInput ? messageInput.value : "");

        const email = "telacaster@gmail.com";

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
}


/*About Page*/

const plusIcons = document.querySelectorAll('.plus');
const skillLists = document.querySelectorAll('.Skill_List');

plusIcons.forEach(icon => {
    icon.addEventListener("click", () => {

        const list = icon.parentElement.nextElementSibling;
        const isOpen = icon.classList.contains("rotated");

        // Close all other sections
        plusIcons.forEach(i => i.classList.remove("rotated"));
        skillLists.forEach(l => l.classList.remove("visible"));

        // Re-open the one that was clicked (if it wasn't already open)
        if (!isOpen) {
            icon.classList.add("rotated");
            list.classList.add("visible");
        }
    });
});

/* Portfolio Page */

const tab_Containers = document.querySelectorAll('.tab_container');
const chevrons = document.querySelectorAll('.tab svg');

chevrons.forEach(icon => {
    icon.addEventListener("click", function () {

        // Find THIS chevron's tab container
        const tabContainer = icon.closest('.tab_container');

        // Toggle only this one
        tabContainer.classList.toggle('tab_extend');
        icon.classList.toggle("rotated180");

    });
});


/*Loss Mitigation*/

const design_Steps = document.querySelectorAll('.design_steps');
const design_Steps_Content = document.querySelectorAll('.design_steps_content');

if (design_Steps.length > 0 && design_Steps_Content.length > 0) {
    design_Steps[0].classList.add('active');
    design_Steps[0].style.color = '#476C62';
    design_Steps_Content[0].classList.add('visible');
}

design_Steps.forEach((step, index) => {
    step.addEventListener("click", function () {
        const step_Selected = step.classList.contains("active");

        // Remove active from all steps
        design_Steps.forEach(s => {
            s.classList.remove("active");
            s.style.color = "#1E1E1E";
        });

        // Hide all content
        design_Steps_Content.forEach(content => {
            content.classList.remove("visible");
        });

        // Add active to clicked step + show its content
        if (!step_Selected) {
            step.classList.add("active");
            step.style.color = "#476C62";
            design_Steps_Content[index].classList.add("visible");
        }
    });
});

/*Loss Mit*/

function initializeSlideGroup(slideSelector, chevronSelector) {
    const slides = Array.from(document.querySelectorAll(slideSelector));
    const chevrons = Array.from(document.querySelectorAll(chevronSelector));

    if (slides.length === 0 || chevrons.length < 2) {
        return;
    }

    let currentIndex = 0;
    const previousButton = chevrons[0];
    const nextButton = chevrons[1];

    function updateChevronState() {
        previousButton.classList.toggle('is-disabled', currentIndex === 0);
        nextButton.classList.toggle('is-disabled', currentIndex === slides.length - 1);
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('visible'));
        slides[index].classList.add('visible');
        updateChevronState();
    }

    previousButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            return;
        }

        currentIndex -= 1;
        showSlide(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex === slides.length - 1) {
            return;
        }

        currentIndex += 1;
        showSlide(currentIndex);
    });

    showSlide(currentIndex);
}

initializeSlideGroup('.empathize_container', '.chevron_circle');
initializeSlideGroup('.prototype_container', '.chevron_circle2');
initializeSlideGroup('.test_container', '.chevron_circle3');

/* Image Modal */

const expandableImages = document.querySelectorAll('.expandable_image');
const modal = document.getElementById('image_modal');
const modalImage = document.getElementById('modal_image');
const modalClose = document.querySelector('.modal_close');

if (modal && modalImage && modalClose) {
    expandableImages.forEach(img => {
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modal.classList.add('show');
        });
    });

    modalClose.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
}

