// OrganicReveal/mask.js
export class OrganicMask {
    constructor(container, isMobile) {
        this.container = container;
        this.isMobile = isMobile;
        
        if (!isMobile) {
            // High frequency drift for desktop
            this.driftX = gsap.to(this.container, {
                '--or-noise-offset-x': '1.5px',
                duration: 3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            this.driftY = gsap.to(this.container, {
                '--or-noise-offset-y': '-1.2px',
                duration: 4.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        }
        
        // 2. Slow scale evolution (keep on mobile for basic life)
        this.scaleEvolution = gsap.to(this.container, {
            '--or-noise-scale': 1.05,
            duration: 7,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }
    
    setTurbulence(level) {
        if (this.isMobile) return; // No high frequency drift on mobile
        
        const timeScale = 0.1 + (level * 0.9);
        if (this.driftX && this.driftY) {
            gsap.to([this.driftX, this.driftY], {
                timeScale: timeScale,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    }
}
