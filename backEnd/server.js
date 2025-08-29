import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const NASA_KEY = process.env.NASA_KEY;

app.get('/health', (req, res) => {
    res.json({
        ok: true
    })
})

// APOD (Astronomy Picture of the Day)
app.get('/api/apod', async(req, res) => {
    try {
        const { date } =  req.query;
        const url = "https://api.nasa.gov/planetary/apod";
        const { data } = await axios.get(url, {
            params: {api_key: NASA_KEY, date}
        });
        res.json(data);
    }catch(err){
        console.log(err?.response?.data || err.message);
        res.status(err?.response?.status || 500).json({
            error: "Failed to fetch APOD",
            details: err?.response?.data || err.message
        });
    }
});


    //Mors rover photos 
    app.get('/api/mars', async(req, res) => {
       try{

        const { earth_date = "2015-06-03", rover = "curiosity", camera } = req.query;
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;
        const { data } = await axios.get(url, {
             params: {api_key: NASA_KEY, date};
        });
        res.json(data);
        }catch(err){
            console.error(err?.response?.data || err.message);
            res.status(err?.response?.status || 500).json({
            error: "Failed to fetch Mars photos",
            details: err?.response?.data || err.message
             });
        }
    });



app.listen(PORT, () => {
     console.log(`Backend running on http://localhost:${PORT}`);
})