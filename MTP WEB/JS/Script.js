/* =========================================================
   MATSOGO TAU PROJECTS
   MAIN JAVASCRIPT
   ========================================================= */


/* ================= PAGE READY ================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                if (navLinks.classList.contains("active")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                    menuBtn.setAttribute(
                        "aria-label",
                        "Close navigation menu"
                    );

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                    menuBtn.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }

        });


        /* Close mobile menu after clicking a link */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* ================= ACTIVE NAVIGATION ================= */

    // Keep the navigation highlight correct on local files and hosted pages.
    const currentPage = decodeURIComponent(
        window.location.pathname.split("/").pop() || "index.html"
    ).trim().toLowerCase();

    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        const linkPage = decodeURIComponent(
            href.split("/").pop() || "index.html"
        ).trim().toLowerCase();

        const isCurrent =
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html");

        link.classList.toggle("active", isCurrent);

        if (isCurrent) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    /* ================= CURRENT YEAR ================= */

    const yearElements =
        document.querySelectorAll("#year");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ================= HEADER SCROLL ================= */

    const header =
        document.querySelector(".header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* ================= BACK TO TOP ================= */

    const backToTop =
        document.createElement("button");

    backToTop.className = "back-to-top";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    backToTop.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(backToTop);


    function handleBackToTop() {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(
            ".service-card, .feature, .contact-item, .about-content, .about-hero-content, .section-heading"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "reveal-visible"
            );

        });

    }


    /* ================= PHONE FORMATTING ================= */

    const phoneInputs =
        document.querySelectorAll(
            'input[type="tel"]'
        );


    phoneInputs.forEach(input => {

        input.addEventListener("input", () => {

            input.value =
                input.value.replace(
                    /[^0-9+\s()-]/g,
                    ""
                );

        });

    });


    /* ================= STATISTICS COUNTER ================= */

    const stats =
        document.querySelectorAll(
            ".stat strong[data-target]"
        );


    if (
        stats.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const stat =
                            entry.target;

                        const target =
                            parseInt(
                                stat.dataset.target,
                                10
                            );


                        if (
                            Number.isNaN(target)
                        ) {
                            return;
                        }


                        let current = 0;

                        const duration = 1200;

                        const stepTime =
                            Math.max(
                                Math.floor(
                                    duration / target
                                ),
                                10
                            );


                        const counter =
                            setInterval(() => {

                                current += 1;

                                stat.textContent =
                                    current;

                                if (
                                    current >= target
                                ) {

                                    stat.textContent =
                                        target;

                                    clearInterval(
                                        counter
                                    );

                                }

                            }, stepTime);


                        statsObserver.unobserve(
                            stat
                        );

                    });

                },
                {
                    threshold: 0.4
                }
            );


        stats.forEach(stat => {

            statsObserver.observe(stat);

        });

    }


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const contactSuccess =
        document.getElementById(
            "contactSuccess"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                /* Check EmailJS */

                if (
                    typeof emailjs === "undefined"
                ) {

                    alert(
                        "Email service is currently unavailable. Please contact us directly."
                    );

                    return;

                }


                /* Prevent double submission */

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (
                    submitButton &&
                    submitButton.disabled
                ) {

                    return;

                }


                /* Form values */

                const firstName =
                    contactForm
                        .querySelector(
                            '[name="firstName"]'
                        )
                        ?.value
                        .trim() || "";


                const lastName =
                    contactForm
                        .querySelector(
                            '[name="lastName"]'
                        )
                        ?.value
                        .trim() || "";


                const email =
                    contactForm
                        .querySelector(
                            '[name="email"]'
                        )
                        ?.value
                        .trim() || "";


                const phone =
                    contactForm
                        .querySelector(
                            '[name="phone"]'
                        )
                        ?.value
                        .trim() || "";


                const subject =
                    contactForm
                        .querySelector(
                            '[name="subject"]'
                        )
                        ?.value
                        .trim() || "";


                const message =
                    contactForm
                        .querySelector(
                            '[name="message"]'
                        )
                        ?.value
                        .trim() || "";


                /* Validation */

                if (
                    !firstName ||
                    !lastName ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    alert(
                        "Please complete all required fields."
                    );

                    return;

                }


                /* Basic email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                /* EmailJS settings */

                const PUBLIC_KEY =
                    "hbyKylhNhdNzw5t4";


                const SERVICE_ID =
                    "service_9stxcql";


                const ADMIN_TEMPLATE =
                    "template_w8wmhed";


                const AUTO_REPLY_TEMPLATE =
                    "template_z74lgj6";


                try {

                    /* Initialize EmailJS */

                    emailjs.init({
                        publicKey: PUBLIC_KEY
                    });


                    /* Disable button */

                    if (submitButton) {

                        submitButton.disabled = true;

                        submitButton.innerHTML =
                            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                    }


                    /* Template parameters */

                    const templateParams = {

                        firstName: firstName,

                        lastName: lastName,

                        name:
                            `${firstName} ${lastName}`,

                        email: email,

                        phone: phone,

                        subject: subject,

                        message: message,

                        reply_to: email,

                        time:
                            new Date().toLocaleString(
                                "en-ZA"
                            )

                    };


                    /* Send notification to company */

                    await emailjs.send(
                        SERVICE_ID,
                        ADMIN_TEMPLATE,
                        templateParams
                    );


                    /* Send automatic reply to client */

                    try {

                        await emailjs.send(
                            SERVICE_ID,
                            AUTO_REPLY_TEMPLATE,
                            templateParams
                        );

                    } catch (autoReplyError) {

                        console.warn(
                            "Automatic reply could not be sent:",
                            autoReplyError
                        );

                    }


                    /* Show success */

                    if (contactSuccess) {

                        contactSuccess.style.display =
                            "block";

                        contactSuccess.textContent =
                            "Thank you! Your message has been sent successfully.";

                    }


                    /* Reset form */

                    contactForm.reset();


                    /* Restore button */

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            '<i class="fa-solid fa-paper-plane"></i> Send Message';

                    }


                    /* Hide success after 7 seconds */

                    setTimeout(() => {

                        if (contactSuccess) {

                            contactSuccess.style.display =
                                "none";

                        }

                    }, 7000);


                } catch (error) {

                    console.error(
                        "EmailJS error:",
                        error
                    );


                    alert(
                        "We could not send your message. Please try again or contact us directly."
                    );


                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            '<i class="fa-solid fa-paper-plane"></i> Send Message';

                    }

                }

            }
        );

    }


    /* ================= REQUIRED FIELD VALIDATION ================= */

    const requiredFields =
        document.querySelectorAll(
            "input[required], textarea[required], select[required]"
        );


    requiredFields.forEach(field => {

        field.addEventListener(
            "blur",
            () => {

                if (
                    !field.value.trim()
                ) {

                    field.classList.add(
                        "input-error"
                    );

                }

            }
        );


        field.addEventListener(
            "input",
            () => {

                if (
                    field.value.trim()
                ) {

                    field.classList.remove(
                        "input-error"
                    );

                }

            }
        );

    });


    /* ================= CONSOLE MESSAGE ================= */

    console.log(
        "MATSOGO TAU PROJECTS website loaded successfully."
    );

});