/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */

import express from 'express';
import { deleteBillItem, addBillItem, getBillItem, updateBillItem, getBillItemWithOptions } from './services/bills'

const app = express();
const staticRoute = express.static('public');
app.use('/', staticRoute);


//add bill item
const createItem = (req, res) =>{
    const {label, category, amount} = req.params || {};
    const item = addBillItem(label, category, amount);
    res.json(item);
};

//delete bill item
const deleteItem = async (req, res) =>{
    const {id} = req.params || {};
    const item = await deleteBillItem(parseFloat(id));
    res.json(item);
};

//get all bill items from DB
const getItem = async (req, res) =>{
    console.log(JSON.stringify(req.params));
    // console.log(JSON.stringify(req.query));
    // console.log(req.query);
    // console.log(Object.entries(req.query).length);
    // const {label, category, amount} = req.query || {};
    const {filter} = req.params || {};
    if (filter === undefined){
        const items = await getBillItem();
        res.json(items);
    }else {
        console.log("Filter: " + filter);
        const items = await getBillItemWithOptions(filter);
        res.json(items);
    }
};

//delete bill item
const updateItem = async (req, res) =>{
    console.log(JSON.stringify(req.params));

    const {id, label, category, amount} = req.params || {};
    const item = await updateBillItem(id, label, category, amount);
    res.json(item);
};

app.get('/api/create/:label/:category/:amount', createItem);
app.get('/api/delete/:id', deleteItem);
app.get('/api/read', getItem);
app.get('/api/read/:filter', getItem);
app.get('/api/update/:id/:label/:category/:amount', updateItem);




app.listen(8000, () => console.log("Listening on 8000\n" +
                                    "\tCreate   ==>Create Bill button sends a get request to /api/create and performs an insert on DB.\n" +
                                    "\tRead     ==>On startup a get request to /api/read and performs a select all on DB\n" +
                                    "\tRead     ==>Find Item button sends arequest to /api/read and performs a select on DB\n" +
                                    "\tUpdate   ==>Update bill amount sends request to /api/update and performs an update on DB\n" +
                                    "\tDelete   ==>Delete icon sends a request to /api/delete and peforms a delete on DB"));

app.all('*', (req, res) => res.status(404).send("<h1>Page not found</h1>"));