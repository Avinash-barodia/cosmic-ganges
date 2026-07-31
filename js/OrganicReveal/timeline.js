// OrganicReveal/timeline.js

export class OrganicTimeline {
    constructor(container, effects, mask, isMobile) {
        this.container = container;
        this.effects = effects;
        this.mask = mask; // Pass mask to control turbulence
        this.isMobile = isMobile;
        this.tl = null;
        this.isActive = false;
        
        gsap.set(this.container, {
            '--or-reveal-radius': 0,
            '--or-illustration-brightness': 1
        });
    }

    play() {
        if (this.isActive) return;
        this.isActive = true;
        
        if (this.tl) this.tl.kill();
        this.tl = gsap.timeline();
        
        // Trigger Glow Effects & energetic edge
        this.effects.showGlow();
        this.mask.setTurbulence(1.0);
        
        // Mobile speed multiplier (mobile should be shorter: ~1.0s vs 2.7s)
        const m = this.isMobile ? 0.4 : 1;
        
        // Apple-style buttery smooth expansion
        // Starts slowly, bursts fast, and eases out beautifully over a single curve
        this.tl.to(this.container, { 
            '--or-reveal-radius': 150, 
            duration: 1.8 * m, 
            ease: "expo.inOut", 
            delay: 0.1 * m 
        }, 0);
        
        // At burst point (around 0.9s), calm the edge turbulence
        this.tl.call(() => this.mask.setTurbulence(0.2), [], 1.0 * m);
               
        // Illustration Lighting interaction (smooth sync with reveal)
        this.tl.to(this.container, { '--or-illustration-brightness': 1.08, duration: 0.9 * m, ease: "sine.inOut" }, 0.2 * m)
               .to(this.container, { '--or-illustration-brightness': 1, duration: 0.9 * m, ease: "sine.inOut" }, 1.1 * m);
    }

    reverse() {
        if (!this.isActive) return;
        this.isActive = false;
        
        if (this.tl) this.tl.kill();
        this.tl = gsap.timeline();
        
        this.effects.hideGlow();
        this.mask.setTurbulence(0.2); // Idle turbulence
        
        // Smooth retreat for everything
        this.tl.to(this.container, {
            '--or-reveal-radius': 0,
            duration: this.isMobile ? 0.6 : 1.2,
            ease: "power2.inOut"
        });
    }
}
