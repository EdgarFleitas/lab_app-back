const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());
app.use(cors());


require('./src/routes/historial.routes')(app);
require('./src/routes/usuarios.routes')(app);
require('./src/routes/turnos.routes')(app);
require('./src/routes/resultados.routes')(app);
require('./src/routes/rolusus.routes')(app);

app.listen(3000, () => console.log("listening on port 3000"));
