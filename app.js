// Require Libraries
const express = require('express');
const handlebars = require('express-handlebars');

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

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
// Routes
app.get('/', (req, res) => {
    console.log(req.query)
    res.render('home')
  })

  app.get('/greetings/:name', (req, res) => {
    // grab the name from the path provided
    const name = req.params.name;
    // render the greetings view, passing along the name
    res.render('greetings', { name });
  })

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});