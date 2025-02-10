const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Ensure data.json exists and contains an array
const initializeDataFile = () => {
    if (!fs.existsSync('data.json')) {
        fs.writeFileSync('data.json', '[]');
    } else {
        const data = fs.readFileSync('data.json', 'utf8');
        if (!data.trim()) {
            fs.writeFileSync('data.json', '[]');
        } else {
            try {
                JSON.parse(data);
            } catch (e) {
                fs.writeFileSync('data.json', '[]');
            }
        }
    }
};

initializeDataFile();

app.post('/log', (req, res) => {
    const newLog = req.body;
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        const logs = JSON.parse(data);
        logs.push(newLog);
        fs.writeFile('data.json', JSON.stringify(logs, null, 2), (err) => {
            if (err) throw err;
            res.status(200).send('Log saved');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});