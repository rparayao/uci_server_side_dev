/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */

import express from 'express';
import { deleteBillItem, addBillItem } from './bills'

const app = express();
const staticRoute = express.static('public');
app.use('/', staticRoute);


//add bill item
const addItem = (req, res) =>{
    const {label, category, amount} = req.params || {};
    const item = addBillItem(label, category, amount);
    res.json(item);
};
app.get('/api/add/:label/:category/:amount', addItem);

//delete bill item
const deleteItem = (req, res) =>{
    const {id} = req.params || {};
    const item = deleteBillItem(parseFloat(id));
    console.log(JSON.stringify(item));
    res.json(item).send();
};
app.get('/api/delete/:id', deleteItem)


app.listen(8001, () => console.log("Listening on 8000\n" +
                                    "\tCreate Bill button sends a get request to /api/add endpoint.\n" +
                                    "\tDelete icon button sends a get request to /api/delete endpoint."));

app.all('*', (req, res) => res.status(404).send("<h1>Page not found</h1>"));