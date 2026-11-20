document.addEventListener("DOMContentLoaded", () => {

    // ===== THEME SWITCHER =====

    const themeToggle = document.getElementById("themeToggle");

    function setTheme(theme) {
        const isLight = theme === "light";

        document.body.classList.toggle("light-theme", isLight);

        if (themeToggle) {
            themeToggle.textContent = isLight ? "🌙" : "☀️";
            themeToggle.setAttribute(
                "aria-label",
                isLight ? "Увімкнути темну тему" : "Увімкнути світлу тему"
            );
        }

        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch (error) {
            console.warn("Не вдалося зберегти тему:", error);
        }
    }

    // Завантаження збереженої теми
    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    } catch (error) {
        console.warn("LocalStorage недоступний");
    }

    setTheme(savedTheme);

    // Перемикання теми
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLight = document.body.classList.contains("light-theme");

            setTheme(isLight ? "dark" : "light");
        });
    }


    // ===== PROJECT FILTERS =====

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            projectItems.forEach(project => {
                const category = project.dataset.category;

                project.classList.toggle(
                    "hidden",
                    filter !== "all" && filter !== category
                );
            });
        });
    });


    // ===== MOBILE NAVIGATION =====

    const navLinks = document.querySelectorAll("#navbarMenu .nav-link");
    const navbarMenu = document.getElementById("navbarMenu");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (
                navbarMenu &&
                navbarMenu.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {
                bootstrap.Collapse
                    .getOrCreateInstance(navbarMenu)
                    .hide();
            }
        });
    });


    // ===== SCROLL REVEAL =====

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }

});