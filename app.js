// Require Libraries
const express = require('express');
const handlebars = require('express-handlebars');
require('dotenv').config()
const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": process.env.API_KEY,
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
  });

// App Setup
const app = express();

// Middleware
const hbs = handlebars.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo() { return 'FOO!'; },
        bar() { return 'BAR!'; }
    }
});

app.use(express.static('public'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes
app.get('/', (req, res) => {
    // Handle the home page when we haven't queried yet
    term = ""
    if (req.query.term) {
        term = req.query.term
        // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
        Tenor.Search.Query(term, "10")
        .then(response => {
          // store the gifs we get back from the search
          const gifs = response;
          // pass the gifs as an object into the home page
          res.render('home', { gifs })
        }).catch(console.error);
      }
      else {
        res.render('home', { gifs: [] })
      }
  });
// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});