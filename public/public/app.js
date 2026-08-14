let edition = null;
let currentType = "mod";

const editionScreen =
    document.getElementById("editionScreen");

const mainScreen =
    document.getElementById("mainScreen");

const editionLabel =
    document.getElementById("editionLabel");

const editionName =
    document.getElementById("editionName");

const searchInput =
    document.getElementById("searchInput");

const results =
    document.getElementById("results");

const loading =
    document.getElementById("loading");

const count =
    document.getElementById("count");


function selectEdition(value) {

    edition = value;

    localStorage.setItem(
        "mcvault-edition",
        value
    );

    editionScreen.classList.add("hidden");

    mainScreen.classList.remove("hidden");

    if (value === "java") {

        editionLabel.textContent =
            "JAVA EDITION";

    } else {

        editionLabel.textContent =
            "BEDROCK EDITION";

    }

    showDemoContent();
}


function changeEdition() {

    mainScreen.classList.add("hidden");

    editionScreen.classList.remove("hidden");
}


function setType(type) {

    currentType = type;

    showDemoContent();
}


function search() {

    showDemoContent(
        searchInput.value.trim()
    );
}


function showDemoContent(query = "") {

    loading.classList.add("hidden");

    results.innerHTML = "";

    const names = {

        mod: [
            "Sodium",
            "Lithium",
            "Fabric API",
            "Mod Menu"
        ],

        modpack: [
            "Fabulously Optimized",
            "Simply Optimized",
            "Adrenaline"
        ],

        resourcepack: [
            "Faithful",
            "Bare Bones",
            "Fresh Animations"
        ],

        shader: [
            "Complementary Shaders",
            "BSL Shaders",
            "MakeUp Ultra Fast"
        ]

    };


    let list =
        names[currentType] || names.mod;


    if (query) {

        list = list.filter(
            name =>
                name
                    .toLowerCase()
                    .includes(
                        query.toLowerCase()
                    )
        );

    }


    count.textContent =
        `${list.length} results`;


    if (list.length === 0) {

        results.innerHTML = `
            <article class="card">
                <h3>No results</h3>
                <p>
                    Try another search.
                </p>
            </article>
        `;

        return;
    }


    list.forEach(name => {

        const card =
            document.createElement("article");

        card.className = "card";

        card.innerHTML = `
            <h3>${escapeHTML(name)}</h3>

            <p>
                Minecraft ${currentType}
                for ${edition === "java"
                    ? "Java Edition"
                    : "Bedrock Edition"}.
            </p>

            <a
                href="#"
                onclick="return false"
            >
                VIEW PROJECT →
            </a>
        `;

        results.appendChild(card);

    });
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


const saved =
    localStorage.getItem(
        "mcvault-edition"
    );


if (saved) {

    selectEdition(saved);

}
