import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import { PrismaClient } from '@prisma/client';
import errors from './errors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());
app.use(errors);

app.get('/routes', async (req, res) => {
  const routes = await prisma.route.findMany();
  res.json(routes);
});

app.get('/routes/:id', async (req, res) => {
  const route = await prisma.route.findUnique({
    where: { id: Number(req.params.id) },
  });

  res.json(route);
});

app.post('/routes', async (req, res) => {
  const result = await prisma.route.create({
    data: { ...req.body },
  });

  res.json(result);
});

app.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

app.post('/categories', async (req, res) => {
  const result = await prisma.category.create({
    data: { ...req.body },
  });

  res.json(result);
});

app.post('/alerts', async (req, res) => {
  const result = await prisma.alert.create({
    data: { ...req.body },
  });

  res.json(result);
});

app.get('/alerts', async (req, res) => {
  const result = await prisma.alert.findMany({ include: { category: true } });

  res.json(result);
});

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
);
