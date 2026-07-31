// OrganicReveal/effects.js
export class OrganicEffects {
    constructor(container, isMobile) {
        this.container = container;
        this.isMobile = isMobile;
        
        // Edge Flicker Timeline - Smooth Waveform
        // Creates a subtle, alive feeling without looking broken
        // 96 -> 98 -> 100 -> 99 -> 97 -> 98 -> 100 -> 96
        this.flickerTl = gsap.timeline({ paused: true, repeat: -1 });
        this.flickerTl.to(this.container, { '--or-glow-opacity': 0.98, duration: 0.15, ease: "sine.inOut" })
                      .to(this.container, { '--or-glow-opacity': 1.00, duration: 0.1, ease: "sine.inOut" })
                      .to(this.container, { '--or-glow-opacity': 0.99, duration: 0.12, ease: "sine.inOut" })
                      .to(this.container, { '--or-glow-opacity': 0.97, duration: 0.18, ease: "sine.inOut" })
                      .to(this.container, { '--or-glow-opacity': 0.98, duration: 0.15, ease: "sine.inOut" })
                      .to(this.container, { '--or-glow-opacity': 1.00, duration: 0.12, ease: "sine.inOut" })
                      .to(this.container, { '--or-glow-opacity': 0.96, duration: 0.2, ease: "sine.inOut" });
    }
    
    showGlow() {
        gsap.to(this.container, {
            '--or-glow-opacity': 0.96,
            duration: 0.3,
            ease: "sine.inOut",
            onComplete: () => this.flickerTl.play()
        });
        
        if (!this.isMobile) {
            // Activate fake heat distortion only on desktop
            gsap.to(this.container, {
                '--or-distortion-opacity': 0.4,
                duration: 0.4,
                ease: "power1.inOut"
            });
        }
    }
    
    hideGlow() {
        this.flickerTl.pause();
        gsap.to(this.container, {
            '--or-glow-opacity': 0,
            duration: 0.4,
            ease: "sine.inOut"
        });
        
        if (!this.isMobile) {
            gsap.to(this.container, {
                '--or-distortion-opacity': 0,
                duration: 0.4,
                ease: "power1.inOut"
            });
        }
    }
}
