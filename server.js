const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get("/players", function(req, res) {
    res.sendFile(__dirname + "/playerinfo.json")
});

app.listen(PORT, function() {
    console.log("Server running at http://localhost:" + PORT);
})
