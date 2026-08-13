const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/modrinth", async (req, res) => {
    try {
        const query = req.query.query || "";
        const type = req.query.type || "mod";

        const url = new URL(
            "https://api.modrinth.com/v2/search"
        );

        url.searchParams.set("query", query);

        url.searchParams.set(
            "facets",
            JSON.stringify([
                [`project_type:${type}`]
            ])
        );

        url.searchParams.set("limit", "24");

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Modrinth API error");
        }

        const data = await response.json();

        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to load Modrinth"
        });

    }
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`MCVault running on port ${PORT}`);
});
