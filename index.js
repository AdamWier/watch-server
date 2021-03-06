const {KEY} = require('./watchApiInfo');
const express = require('express');
const app = express();
const port = 3000;
app.set('query parser', 'extended');

const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: './key.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
});
const calendar = google.calendar({version: 'v3', auth});

app.get('/mycalendar', (req, res) => {
    
    if(req.query.KEY !== KEY){
        res.statusCode = 404;
        return res.send()
    }

    calendar.events.list({
        calendarId: 'wier.adam@gmail.com',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, googleRes) => {
        const events = googleRes.data.items
        res.json(events);
    })
})

app.listen(port, () => {
  console.log(`App listening at ${port}`)
})