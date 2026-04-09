import { initForm } from '@formspree/ajax';

document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Formspree AJAX Form
    initForm({ formElement: '#contact-form', formId: 'meepwnqb' });
    
    // 0. Contact Modal Toggle Logic
    const contactModal = document.getElementById("contact-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const contactTriggers = document.querySelectorAll(".contact-trigger");

    if (contactModal) {
        contactTriggers.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                contactModal.classList.add("active");
                const mobileMenu = document.querySelector(".mobile-menu");
                if (mobileMenu && mobileMenu.classList.contains("active")) {
                    mobileMenu.classList.remove("active");
                }
            });
        });

        closeModalBtn.addEventListener("click", () => {
            contactModal.classList.remove("active");
        });

        // Close on outside click
        contactModal.addEventListener("click", (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove("active");
            }
        });
    }
    
    // 1. Navbar Scroll Effect
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

});
