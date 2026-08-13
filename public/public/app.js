let selectedEdition = null;
let currentType = "mod";

const editionScreen = document.getElementById("editionScreen");
const mainScreen = document.getElementById("mainScreen");
const editionName = document.getElementById("editionName");
const results = document.getElementById("results");
const loading = document.getElementById("loading");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");


function selectEdition(edition) {
    selectedEdition = edition;

    localStorage.setItem(
        "mcvault-edition",
        edition
    );

    editionScreen.style.animation =
        "mainIn 0.5s ease reverse";

    setTimeout(() => {

        editionScreen.classList.add("hidden");
        mainScreen.classList.remove("hidden");

        updateEdition();

        searchProjects();

    }, 450);
}


function updateEdition() {

    if (selectedEdition === "java") {

        editionName.textContent =
            "JAVA EDITION";

    } else {

        editionName.textContent =
            "BEDROCK EDITION";

    }
}


function changeEdition() {

    mainScreen.classList.add("hidden");

    editionScreen.classList.remove("hidden");

    editionScreen.style.animation =
        "screenIn 0.5s ease";
}


function loadType(type) {

    currentType = type;

    searchProjects();
}


async function searchProjects() {

    results.innerHTML = "";

    loading.classList.remove("hidden");

    resultCount.textContent =
        "Loading...";


    if (selectedEdition === "bedrock") {

        loading.classList.add("hidden");

        resultCount.textContent =
            "Bedrock";

        results.innerHTML = `

            <article class="card">

                <div class="card-body">

                    <div class="card-source">
                        BEDROCK EDITION
                    </div>

                    <h3>
                        Bedrock content
                    </h3>

                    <p>
                        Bedrock support is being prepared.
                        More content sources will be added
                        to MCVault.
                    </p>

                </div>

            </article>

        `;

        return;
    }


    const query =
        searchInput.value.trim();


    try {

        const response =
            await fetch(
                "/api/modrinth?query=" +
                encodeURIComponent(query) +
                "&type=" +
                encodeURIComponent(currentType)
            );


        if (!response.ok) {
            throw new Error(
                "API request failed"
            );
        }


        const data =
            await response.json();


        loading.classList.add("hidden");


        const projects =
            data.hits || [];


        resultCount.textContent =
            `${data.total_hits || projects.length} results`;


        if (projects.length === 0) {

            results.innerHTML = `

                <article class="card">

                    <div class="card-body">

                        <div class="card-source">
                            MCVAULT
                        </div>

                        <h3>
                            No results
                        </h3>

                        <p>
                            Try another search.
                        </p>

                    </div>

                </article>

            `;

            return;
        }


        projects.forEach(
            (project, index) => {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className = "card";


                card.style.animationDelay =
                    `${index * 0.04}s`;


                const image =
                    project.icon_url ||
                    "https://placehold.co/600x350/11151d/ffffff?text=MCVault";


                card.innerHTML = `

                    <img
                        src="${escapeHTML(image)}"
                        alt=""
                        loading="lazy"
                    >

                    <div class="card-body">

                        <div class="card-source">
                            MODRINTH
                        </div>

                        <h3>
                            ${escapeHTML(
                                project.title
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                project.description ||
                                "No description available."
                            )}
                        </p>

                        <a
                            class="card-link"
                            href="https://modrinth.com/project/${encodeURIComponent(project.slug)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            VIEW PROJECT →
                        </a>

                    </div>

                `;


                results.appendChild(card);

            }
        );


    } catch (error) {

        console.error(error);

        loading.classList.add("hidden");

        resultCount.textContent =
            "Error";


        results.innerHTML = `

            <article class="card">

                <div class="card-body">

                    <div class="card-source">
                        ERROR
                    </div>

                    <h3>
                        Could not load projects
                    </h3>

                    <p>
                        Check the server connection
                        and try again.
                    </p>

                </div>

            </article>

        `;

    }
}


function escapeHTML(value) {

    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


searchInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            searchProjects();
        }

    }
);


const savedEdition =
    localStorage.getItem(
        "mcvault-edition"
    );


if (savedEdition) {

    selectedEdition =
        savedEdition;

    editionScreen.classList.add(
        "hidden"
    );

    mainScreen.classList.remove(
        "hidden"
    );

    updateEdition();

    searchProjects();
}
