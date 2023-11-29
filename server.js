const express = require('express');
const siretRoutes = require('./routes/siretRoutes');
const app = express();
const port = 3000;

//? Use the routes (defined in routes/siretRoutes.js)
app.use(express.json());
app.use('/siret', siretRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});