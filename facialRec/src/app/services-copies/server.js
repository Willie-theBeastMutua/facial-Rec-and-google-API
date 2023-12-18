const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.post('/getDistanceMatrix', async (req, res) => {
    console.log("also fired")

    const { origins, destinations, key } = req.body;
    console.log((destinations))

    const apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    const params = new URLSearchParams(
        {
            origins: origins,
            destinations: destinations,
            key: key,
        }
    )
    const urlWithParams = `${apiUrl}?${params.toString()}`;
    console.log(urlWithParams)


    // k??y,
    //   });

    try {
        const response = await axios.get(`${apiUrl}?${params}`);
        // console.log(res)
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
