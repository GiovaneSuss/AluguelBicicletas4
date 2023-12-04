server.post("/api/bikes", async (req, res) => {
    try {
        const id = await AudioParamMap.registerBike(req.body);
        res.status(201).json({ id });
    } catch (e) {
        if (e instanceof DuplicateBikeError) {
            res.status(400).json({
                message: "Could not register bike.",
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error.",
        });
    }
});