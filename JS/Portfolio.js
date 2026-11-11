document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("portfolioCategories");
    const portfolio = window.MTPPortfolio;

    if (!grid || !portfolio) {
        throw new Error("Portfolio categories could not be loaded.");
    }

    portfolio.categories.forEach(category => {
        const categoryProjects = portfolio.projects.filter(
            project => project.category === category.id
        );
        const card = document.createElement("a");
        card.className = "portfolio-category-card";
        card.href = `portfolio-category.html?category=${encodeURIComponent(category.id)}`;
        card.setAttribute("aria-label", `Open ${category.name} portfolio folder`);

        const cover = document.createElement("div");
        cover.className = "portfolio-category-cover";
        const image = document.createElement("img");
        image.src = category.cover;
        image.alt = category.coverAlt;
        image.loading = "lazy";
        image.decoding = "async";

        const folderLabel = document.createElement("span");
        folderLabel.className = "portfolio-folder-label";
        folderLabel.innerHTML = '<i class="fa-solid fa-folder-open" aria-hidden="true"></i> VIEW CATEGORY';
        cover.append(image, folderLabel);

        const content = document.createElement("div");
        content.className = "portfolio-category-content";
        const title = document.createElement("h3");
        title.textContent = category.name;
        const description = document.createElement("p");
        description.textContent = category.description;
        const footer = document.createElement("div");
        footer.className = "portfolio-category-footer";
        const status = document.createElement("span");
        status.textContent = categoryProjects.length
            ? `${categoryProjects.length} ${categoryProjects.length === 1 ? "project" : "projects"}`
            : "No published projects yet";
        const arrow = document.createElement("i");
        arrow.className = "fa-solid fa-arrow-right";
        arrow.setAttribute("aria-hidden", "true");
        footer.append(status, arrow);
        content.append(title, description, footer);
        card.append(cover, content);
        grid.append(card);
    });
});
