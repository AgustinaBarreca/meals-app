import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = await req.body;

  if (orderData === null || orderData?.items === null || orderData?.items?.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  if (
    orderData?.order.customer.email === null ||
    !orderData?.order.customer.email.includes('@') ||
    orderData?.order.customer.name === null ||
    orderData?.order.customer.name.trim() === '' ||
    orderData?.order.customer.street === null ||
    orderData?.order.customer.street.trim() === '' ||
    orderData?.order.customer['postal-code'] === null ||
    orderData?.order.customer['postal-code'].trim() === '' ||
    orderData?.order.customer.city === null ||
    orderData?.order.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = orders ? JSON.parse(orders) : [];
  allOrders.push(newOrder);

  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));

  res.status(203).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
