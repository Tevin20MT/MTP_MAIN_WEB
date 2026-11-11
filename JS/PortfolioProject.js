document.addEventListener("DOMContentLoaded", () => {
    const portfolio = window.MTPPortfolio;
    const projectId = new URLSearchParams(window.location.search).get("project");
    const project = portfolio?.projects.find(item => item.id === projectId);
    const content = document.getElementById("projectContent");

    if (!portfolio || !content) {
        throw new Error("Portfolio project page is missing required content.");
    }

    const notFound = document.getElementById("projectNotFound");
    if (!project) {
        notFound.hidden = false;
        content.hidden = true;
        return;
    }

    const category = portfolio.categories.find(item => item.id === project.category);
    if (!category) {
        throw new Error(`Portfolio category "${project.category}" is not configured.`);
    }

    const categoryUrl =
        `portfolio-category.html?category=${encodeURIComponent(category.id)}`;
    const breadcrumb = document.getElementById("projectBreadcrumb");
    const categoryCrumb = document.createElement("a");
    categoryCrumb.href = categoryUrl;
    categoryCrumb.textContent = category.shortName;
    const currentCrumb = document.createElement("span");
    currentCrumb.setAttribute("aria-current", "page");
    currentCrumb.textContent = project.name;
    breadcrumb.append(
        document.createTextNode(" › "),
        categoryCrumb,
        document.createTextNode(" › "),
        currentCrumb
    );

    const projectTitle = document.getElementById("projectTitle");
    projectTitle.textContent = project.name;
    document.title = `${project.name} | ${category.shortName} | MATSOGO TAU PROJECTS`;
    document.querySelector('meta[name="description"]').content = project.summary;
    document.querySelector('meta[property="og:title"]').content =
        `${project.name} | MATSOGO TAU PROJECTS`;
    document.querySelector('meta[property="og:description"]').content = project.summary;
    document.querySelector('meta[property="og:url"]').content = window.location.href;
    document.querySelector('link[rel="canonical"]').href = window.location.href;

    const categoryName = document.getElementById("projectCategory");
    categoryName.textContent = category.name;
    categoryName.href = categoryUrl;
    document.getElementById("backToCategory").href = categoryUrl;
    document.getElementById("projectBackCategory").href = categoryUrl;
    if (project.websiteUrl) {
        const websiteLink = document.getElementById("projectWebsite");
        websiteLink.href = project.websiteUrl;
        websiteLink.hidden = false;
    }
    document.querySelector('meta[property="og:image"]').content =
        new URL(project.images[0].src, window.location.href).href;
    document.getElementById("projectStatus").textContent = project.status;
    document.getElementById("projectSummary").textContent = project.summary;

    const gallery = document.getElementById("projectGallery");
    project.images.forEach(projectImage => {
        const image = document.createElement("img");
        image.src = projectImage.src;
        image.alt = projectImage.alt;
        image.loading = "lazy";
        image.decoding = "async";
        if (projectImage.fit === "contain") {
            image.className = "project-detail-image--contain";
        }
        gallery.append(image);
    });

    document.getElementById("projectImageNote").textContent = project.imageNote;

    const detailFields = [
        ["Project overview", project.overview],
        ["Client or organisation", project.client],
        ["Objectives", project.objective],
        ["Scope of work", project.scope],
        ["Proposed solution", project.solution],
        ["Technologies or equipment", project.technologies],
        ["Project outcome", project.outcome],
        ["Completion date", project.completionDate]
    ];
    const detailList = document.getElementById("projectDetails");
    detailFields.forEach(([label, value]) => {
        const item = document.createElement("div");
        item.className = "project-detail-field";
        const term = document.createElement("dt");
        term.textContent = label;
        const description = document.createElement("dd");
        description.textContent = value;
        item.append(term, description);
        detailList.append(item);
    });

    const categoryProjects = portfolio.projects
        .filter(item => item.category === category.id)
        .sort((first, second) => first.name.localeCompare(second.name));
    const projectIndex = categoryProjects.findIndex(item => item.id === project.id);
    const previousProject = categoryProjects[projectIndex - 1];
    const nextProject = categoryProjects[projectIndex + 1];
    const categoryProjectsUrl = item =>
        `portfolio-project.html?project=${encodeURIComponent(item.id)}`;

    const previousLink = document.getElementById("previousProject");
    const nextLink = document.getElementById("nextProject");
    if (previousProject) {
        previousLink.href = categoryProjectsUrl(previousProject);
        previousLink.textContent = `← Previous: ${previousProject.name}`;
    } else {
        previousLink.classList.add("is-disabled");
        previousLink.setAttribute("aria-disabled", "true");
        previousLink.removeAttribute("href");
        previousLink.textContent = "← Previous project";
    }
    if (nextProject) {
        nextLink.href = categoryProjectsUrl(nextProject);
        nextLink.textContent = `Next: ${nextProject.name} →`;
    } else {
        nextLink.classList.add("is-disabled");
        nextLink.setAttribute("aria-disabled", "true");
        nextLink.removeAttribute("href");
        nextLink.textContent = "Next project →";
    }
});
