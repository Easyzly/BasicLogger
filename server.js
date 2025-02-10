const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const dataFilePath = './data.json';
const path = require('path');

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

app.post('/country', (req, res) => {
    const newCountry = req.body;
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            jsonData = { logs: [], country: null };
        }
        jsonData.country = newCountry;
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) throw err;
            res.status(200).send('Country saved');
        });
    });
});

app.post('/log', (req, res) => {
    const newLog = req.body;
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            jsonData = { logs: [], country: null };
        }
        jsonData.logs.push(newLog);
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) throw err;
            res.status(200).send('Log saved');
        });
    });
});

app.delete('/log/:id', (req, res) => {
    const logId = req.params.id;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data file');
        }

        const jsonData = JSON.parse(data);
        const logIndex = jsonData.logs.findIndex(log => log.id === logId);

        if (logIndex === -1) {
            return res.status(404).send('Log not found');
        }

        jsonData.logs.splice(logIndex, 1);

        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing data file');
            }

            res.send('Log deleted successfully');
        });
    });
});

app.get('/logs', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            jsonData = { logs: [], country: null };
        }
        res.status(200).json(jsonData.logs);
    });
});

app.get('/country', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            jsonData = { logs: [], country: null };
        }
        res.status(200).json(jsonData.country);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});