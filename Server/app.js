const express = require('express');
const cors = require('cors');
const Routes = require('./routes/Routes');
const app = express();
const port = 8899;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/api",Routes); 
app.get('/', (req, res) => { res.send("API Working."); });
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening at http://localhost:${port}`)
})