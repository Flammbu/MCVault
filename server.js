const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));


app.get("/api/modrinth", async (req, res) => {

    try {

        const query = req.query.query || "";
        const type = req.query.type || "mod";

        const url = new URL(
            "https://api.modrinth.com/v2/search"
        );

        url.searchParams.set(
            "query",
            query
        );

        url.searchParams.set(
            "facets",
            JSON.stringify([
                [`project_type:${type}`]
            ])
        );

        url.searchParams.set(
            "limit",
            "24"
        );


        const response = await fetch(url);


        if (!response.ok) {

            throw new Error(
                `Modrinth API returned ${response.status}`
            );

        }


        const data =
            await response.json();


        res.status(200).json(data);


    } catch (error) {

        console.error(error);

        res.status(500).json({

            error:
                "Failed to load Modrinth",

            message:
                error.message

        });

    }

});


module.exports = app;
