document.addEventListener("DOMContentLoaded", () => {
    const portfolio = window.MTPPortfolio;
    const categoryId = new URLSearchParams(window.location.search).get("category");
    const category = portfolio?.categories.find(item => item.id === categoryId);
    const main = document.getElementById("categoryContent");

    if (!portfolio || !main) {
        throw new Error("Portfolio category page is missing required content.");
    }

    const breadcrumb = document.getElementById("categoryBreadcrumb");
    const title = document.getElementById("categoryTitle");
    const description = document.getElementById("categoryDescription");
    const grid = document.getElementById("categoryProjects");
    const emptyState = document.getElementById("categoryEmpty");

    if (!category) {
        title.textContent = "Category not found";
        description.textContent = "This portfolio category is unavailable.";
        emptyState.hidden = false;
        emptyState.querySelector("h2").textContent = "Choose a portfolio category";
        emptyState.querySelector("p").textContent =
            "The category link may be incorrect or out of date. Browse all portfolio categories to continue.";
        grid.hidden = true;
        return;
    }

    const projects = portfolio.projects
        .filter(project => project.category === category.id)
        .sort((first, second) => first.name.localeCompare(second.name));

    document.title = `${category.shortName} Portfolio | MATSOGO TAU PROJECTS`;
    document.querySelector('meta[name="description"]').content =
        `Explore MATSOGO TAU PROJECTS' ${category.name.toLowerCase()} portfolio.`;
    document.querySelector('meta[property="og:title"]').content =
        `${category.shortName} Portfolio | MATSOGO TAU PROJECTS`;
    document.querySelector('meta[property="og:description"]').content = category.description;
    document.querySelector('meta[property="og:url"]').content = window.location.href;
    document.querySelector('meta[property="og:image"]').content =
        new URL(category.cover, window.location.href).href;
    document.querySelector('link[rel="canonical"]').href = window.location.href;

    const breadcrumbCurrent = document.createElement("span");
    breadcrumbCurrent.setAttribute("aria-current", "page");
    breadcrumbCurrent.textContent = category.shortName;
    breadcrumb.append(document.createTextNode(" › "), breadcrumbCurrent);
    title.textContent = category.name;
    description.textContent = category.description;

    if (!projects.length) {
        emptyState.hidden = false;
        grid.hidden = true;
        return;
    }

    emptyState.hidden = true;
    projects.forEach(project => {
        const card = document.createElement("a");
        card.className = "portfolio-project-card";
        card.href = `portfolio-project.html?project=${encodeURIComponent(project.id)}`;
        card.setAttribute("aria-label", `Open project: ${project.name}`);

        const imageWrap = document.createElement("div");
        imageWrap.className = "portfolio-project-cover";
        const image = document.createElement("img");
        image.src = project.images[0].src;
        image.alt = project.images[0].alt;
        image.loading = "lazy";
        image.decoding = "async";
        if (project.images[0].fit === "contain") {
            imageWrap.classList.add("portfolio-project-cover--contain");
        }

        const status = document.createElement("span");
        status.className = "portfolio-project-status";
        status.textContent = project.status;
        imageWrap.append(image, status);

        const content = document.createElement("div");
        content.className = "portfolio-project-content";
        const name = document.createElement("h2");
        name.textContent = project.name;
        const summary = document.createElement("p");
        summary.textContent = project.summary;
        const linkLabel = document.createElement("span");
        linkLabel.className = "portfolio-project-link";
        linkLabel.append(
            document.createTextNode("View project details "),
            document.createElement("i")
        );
        linkLabel.querySelector("i").className = "fa-solid fa-arrow-right";
        linkLabel.querySelector("i").setAttribute("aria-hidden", "true");
        content.append(name, summary, linkLabel);
        card.append(imageWrap, content);
        grid.append(card);
    });
});
