export default async function handler(req, res) {
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
            throw new Error(
                `Modrinth returned ${response.status}`
            );
        }

        const data = await response.json();

        res.status(200).json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Modrinth API failed",
            message: error.message
        });

    }
}
