import express from 'express';




const app = express();
const staticRoute = express.static('public');
app.use('/', staticRoute);

app.listen(8000, () => console.log('Listening on 8000'));

/*
const handler =(req, res) => res.send("src/index.html");
app.get('/api/foo.json', handler);
app.get('/foo', (req, res, next) => {
    req.a = 'foo';
    next();
}, (req, res, next) =>{
    req.b = 'bar';
    next(); 
}, (req, res) => {
    // const {bar, baz} = req.query;
    // res.json({"foo": [bar,baz]});
    res.send(req.a + req.b);
});
*/


app.all('*', (req, res) => res.status(404).send("<h1>Page not found</h1>"));