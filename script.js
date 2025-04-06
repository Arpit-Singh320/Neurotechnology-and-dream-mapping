document.addEventListener('DOMContentLoaded', function() {
    // Get all slides
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Get control buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const slideNumber = document.getElementById('slide-number');

    // Initialize current slide index
    let currentSlideIndex = 0;

    // Initialize presentation
    function initPresentation() {
        // Hide all slides initially
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else if (index === 1) {
                slide.style.transform = 'translateX(100%)';
            } else {
                slide.style.transform = 'translateX(100%)';
                slide.style.display = 'none';
            }
        });

        // Update slide number
        updateSlideNumber();

        // Initialize brain region hover effects
        initBrainRegions();

        // Initialize region fill animations
        initRegionFills();

        // Initialize feature animations
        initFeatureAnimations();
    }

    // Go to specific slide
    function goToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) {
            index = 0;
        } else if (index >= totalSlides) {
            index = totalSlides - 1;
        }

        // Reset any ongoing animations for the previous slide
        resetAnimations(currentSlideIndex);

        // Update classes for previous, current, and next slides
        slides.forEach((slide, i) => {
            slide.style.display = 'flex'; // Make sure it's visible for transition

            if (i < index) {
                // Previous slides
                slide.classList.remove('active');
                slide.style.transform = 'translateX(-100%)';
            } else if (i === index) {
                // Current slide
                slide.classList.add('active');
                slide.style.transform = 'translateX(0)';

                // Trigger animations for the current slide
                triggerAnimations(index);
            } else {
                // Next slides
                slide.classList.remove('active');
                slide.style.transform = 'translateX(100%)';
            }

            // Optimize for performance by hiding slides not adjacent to current
            if (i < index - 1 || i > index + 1) {
                setTimeout(() => {
                    slide.style.display = 'none';
                }, 500); // Hide after transition completes
            }
        });

        // Update current slide index
        currentSlideIndex = index;

        // Update slide number
        updateSlideNumber();
    }

    // Reset animations for a slide
    function resetAnimations(index) {
        const slide = slides[index];

        // Reset region fill animations
        const regionFills = slide.querySelectorAll('.region-fill');
        regionFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width') || fill.style.width;
            fill.style.transition = 'none';
            fill.style.width = '0%';
            fill.setAttribute('data-width', targetWidth);
        });

        // Reset feature animations
        const features = slide.querySelectorAll('.feature');
        features.forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
        });
    }

    // Trigger animations for a slide
    function triggerAnimations(index) {
        const slide = slides[index];

        // Trigger region fill animations
        const regionFills = slide.querySelectorAll('.region-fill');
        if (regionFills.length > 0) {
            setTimeout(() => {
                regionFills.forEach((fill, i) => {
                    setTimeout(() => {
                        fill.style.transition = 'width 1.5s ease-in-out';
                        fill.style.width = fill.getAttribute('data-width') || fill.style.width;
                    }, i * 300);
                });
            }, 500);
        }

        // Trigger feature animations
        const features = slide.querySelectorAll('.feature');
        if (features.length > 0) {
            setTimeout(() => {
                features.forEach((feature, i) => {
                    setTimeout(() => {
                        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateY(0)';
                    }, i * 200);
                });
            }, 500);
        }

        // Animate process boxes
        const processBoxes = slide.querySelectorAll('.process-box');
        if (processBoxes.length > 0) {
            processBoxes.forEach((box, i) => {
                box.style.opacity = '0';
                box.style.transform = 'translateX(-20px)';

                setTimeout(() => {
                    box.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    box.style.opacity = '1';
                    box.style.transform = 'translateX(0)';
                }, 300 + (i * 200));
            });
        }

        // Animate stats
        if (slide.querySelectorAll('.stat-item').length > 0) {
            animateStats();
        }
    }

    // Go to next slide
    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            goToSlide(currentSlideIndex + 1);
        }
    }

    // Go to previous slide
    function prevSlide() {
        if (currentSlideIndex > 0) {
            goToSlide(currentSlideIndex - 1);
        }
    }

    // Update slide number display
    function updateSlideNumber() {
        slideNumber.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
    }

    // Initialize brain region hover effects
    function initBrainRegions() {
        const brainRegions = document.querySelectorAll('.brain-region');

        brainRegions.forEach(region => {
            const dot = region.querySelector('.region-dot');
            const info = region.querySelector('.region-info');

            if (dot && info) {
                // Show info on hover
                dot.addEventListener('mouseenter', () => {
                    info.style.opacity = '1';
                });

                // Hide info on mouse leave
                dot.addEventListener('mouseleave', () => {
                    info.style.opacity = '0';
                });
            }
        });
    }

    // Initialize region fill animations
    function initRegionFills() {
        const regionFills = document.querySelectorAll('.region-fill');

        regionFills.forEach(fill => {
            const targetWidth = fill.style.width;
            fill.style.width = '0%';
            fill.setAttribute('data-width', targetWidth);
        });
    }

    // Initialize feature animations
    function initFeatureAnimations() {
        const features = document.querySelectorAll('.feature');

        features.forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
        });
    }

    // Toggle fullscreen
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // Event listeners for controls
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            prevSlide();
        } else if (e.key === 'f') {
            toggleFullscreen();
        }
    });

    // Add swipe gestures for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance to trigger navigation

        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            prevSlide();
        }
    }

    // Enhance interactive elements
    function enhanceInteractiveElements() {
        // Make process boxes interactive
        const processBoxes = document.querySelectorAll('.process-box');
        processBoxes.forEach(box => {
            box.addEventListener('mouseenter', () => {
                box.style.backgroundColor = '#e8f4fd';
                box.style.transform = 'scale(1.03)';
                box.style.transition = 'all 0.3s ease';
            });

            box.addEventListener('mouseleave', () => {
                box.style.backgroundColor = '';
                box.style.transform = '';
            });
        });

        // Make badges interactive
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'scale(1.1)';
                badge.style.transition = 'all 0.3s ease';
            });

            badge.addEventListener('mouseleave', () => {
                badge.style.transform = '';
            });
        });

        // Team members hover effect
        const members = document.querySelectorAll('.member');
        members.forEach(member => {
            member.addEventListener('mouseenter', () => {
                member.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
            });

            member.addEventListener('mouseleave', () => {
                member.style.backgroundColor = '';
            });
        });

        // Add hover effects for region items
        const regionItems = document.querySelectorAll('.region-item');
        regionItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(5px)';
                item.style.transition = 'all 0.3s ease';
                item.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
                item.style.boxShadow = '';
            });
        });

        // Add hover effects for info boxes
        const infoBoxes = document.querySelectorAll('.info-box');
        infoBoxes.forEach(box => {
            box.addEventListener('mouseenter', () => {
                box.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                box.style.transform = 'translateY(-3px)';
                box.style.transition = 'all 0.3s ease';
            });

            box.addEventListener('mouseleave', () => {
                box.style.boxShadow = '';
                box.style.transform = '';
            });
        });
    }

    // Create animated background for title slide
    function createAnimatedBackground() {
        const titleSlide = document.getElementById('slide1');
        if (!titleSlide) return;

        const bg = titleSlide.querySelector('.title-background');
        if (!bg) return;

        // Add floating particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('bg-particle');

            // Random size between 5px and 20px
            const size = Math.random() * 15 + 5;

            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;

            // Random opacity
            const opacity = Math.random() * 0.3 + 0.1;

            // Random animation duration between 20s and 40s
            const duration = Math.random() * 20 + 20;

            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            bg.appendChild(particle);
        }
    }

    // Add interactive animations for dream content
    function initDreamContentAnimations() {
        // Dreamscape image hover effect
        const dreamscapeImages = document.querySelectorAll('.dreamscape-image');
        dreamscapeImages.forEach(image => {
            const visual = image.querySelector('.dream-visual');
            if (!visual) return;

            image.addEventListener('mouseenter', () => {
                visual.style.transform = 'scale(1.05)';
                visual.style.transition = 'transform 0.5s ease';
            });

            image.addEventListener('mouseleave', () => {
                visual.style.transform = '';
            });
        });

        // Brain tech image hover effect
        const brainTechImages = document.querySelectorAll('.brain-tech-image');
        brainTechImages.forEach(image => {
            image.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.03)';
                image.style.transition = 'transform 0.5s ease';
                image.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });

            image.addEventListener('mouseleave', () => {
                image.style.transform = '';
                image.style.boxShadow = '';
            });
        });

        // Animate stats on view
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            const statValue = item.querySelector('.stat-value');
            if (!statValue) return;

            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
    }

    // Animate stats when they come into view
    function animateStats() {
        const slide = slides[currentSlideIndex];
        const statItems = slide.querySelectorAll('.stat-item');

        statItems.forEach((item, i) => {
            setTimeout(() => {
                item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';

                const statValue = item.querySelector('.stat-value');
                if (statValue) {
                    const targetValue = parseInt(statValue.textContent);
                    let currentValue = 0;
                    const duration = 1500; // Animation duration in ms
                    const interval = duration / targetValue;

                    const counter = setInterval(() => {
                        currentValue += 1;
                        statValue.textContent = `${currentValue}%`;

                        if (currentValue >= targetValue) {
                            clearInterval(counter);
                        }
                    }, interval);
                }
            }, i * 300);
        });
    }

    // Initialize all interactive components
    function initInteractiveComponents() {
        enhanceInteractiveElements();
        createAnimatedBackground();
        initDreamContentAnimations();
    }

    // Initialize presentation
    initPresentation();

    // Initialize all interactive components
    initInteractiveComponents();
});