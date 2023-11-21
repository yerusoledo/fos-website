document.addEventListener('DOMContentLoaded', function () {
    // Auto transition from welcome screen to home page after 3 seconds
    setTimeout(function () {
        document.querySelector('.welcome-screen').classList.add('fade-out');
    }, 3000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('data-target')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Your existing slider code
    let sliderWrap = document.querySelector('.slider-wrap');
    let slider = document.querySelector('.slider');
    let clonesWidth;
    let sliderWidth;
    let clones = [];
    let disableScroll = false;
    let scrollPos;

    let items = [...document.querySelectorAll('.slider-item')];
    let images = [...document.querySelectorAll('.img-div')];

    images.forEach((image, idx) => {
        image.style.backgroundImage = `url('images/${idx + 1}.jpg')`;
    });

    items.forEach(item => {
        let clone = item.cloneNode(true);
        clone.classList.add('clone');
        slider.appendChild(clone);
        clones.push(clone);
    });

    function getScrollPos() {
        return window.scrollY;
    }

    function getClonesWidth() {
        let width = 0;
        clones.forEach(clone => {
            width += clone.offsetWidth;
        });
        return width;
    }

    function scrollUpdate() {
        if (window.innerWidth > 760) {
            sliderWrap.style.overflow = 'hidden';
            scrollPos = getScrollPos();
            if (clonesWidth + scrollPos >= sliderWidth) {
                window.scrollTo({ top: 1 });
            } else if (scrollPos <= 0) {
                window.scrollTo({ top: sliderWidth - clonesWidth - 1 });
            }

            slider.style.transform = `translateX(${-scrollPos}px)`;

            requestAnimationFrame(scrollUpdate);
        } else {
            sliderWrap.style.overflow = 'scroll';
        }
    }

    // Add event listeners for background color change
    slider.addEventListener('mouseenter', function () {
        // Change to your desired color palette
        const colorPalette = ['#817465'];
        const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        document.body.style.backgroundColor = randomColor;
    });

    slider.addEventListener('mouseleave', function () {
        document.body.style.backgroundColor = ''; // Reset to default background color
    });

    window.addEventListener('resize', onLoad);

    function onLoad() {
        calculateDimensions();
        document.body.style.height = `${sliderWidth}px`;
        window.scrollTo({ top: 1 });
        scrollUpdate();
    }

    function calculateDimensions() {
        sliderWidth = slider.getBoundingClientRect().width;
        clonesWidth = getClonesWidth();
    }

    // Call onLoad initially to set up the initial dimensions
    onLoad();
});
