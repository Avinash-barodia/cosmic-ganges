// OrganicReveal/index.js
import { OrganicTimeline } from './timeline.js';
import { OrganicMask } from './mask.js';
import { OrganicEffects } from './effects.js';

export function initOrganicReveal() {
    const container = document.getElementById('organicReveal');
    if (!container) return;

    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    // Initialize modules with isMobile flag
    const mask = new OrganicMask(container, isMobile);
    mask.setTurbulence(0.2); 
    
    const effects = new OrganicEffects(container, isMobile);
    const timeline = new OrganicTimeline(container, effects, mask, isMobile);

    // Idle Breathing (Subtle life before hover)
    gsap.to(container, {
        '--or-illustration-scale': 1.005,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    let isHovered = false;
    let isScrolledIn = false;

    function updateState() {
        if (isHovered || isScrolledIn) {
            timeline.play();
        } else {
            timeline.reverse();
        }
    }

    // GSAP ScrollTrigger Integration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
            trigger: container,
            start: "top 60%", // Triggers when the container is in good view
            onEnter: () => { isScrolledIn = true; updateState(); },
            onLeaveBack: () => { isScrolledIn = false; updateState(); }
        });
    }

    if (!isMobile) {
        // Desktop: Combine Hover state with scroll state
        container.addEventListener('mouseenter', () => {
            isHovered = true;
            updateState();
        });

        container.addEventListener('mouseleave', () => {
            isHovered = false;
            updateState();
        });
    }
}
