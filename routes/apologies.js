import express from 'express';
import { faker } from '@faker-js/faker';

const router = express.Router();

let apologies = [];

// Generate a random apology
function generateRandomApology() {
  const reasons = [
    'for talking anyhow',
    'for calling u cultist',
    'for the inconvenience',
    'for my mistake',
    'for the misunderstanding',
    'for not meeting expectations',
    'for being rude',
    'for the trouble',
    'for the error',
    'for the trouble caused',
  ];

  return {
    title: `I'm sorry ${reasons[Math.floor(Math.random() * reasons.length)]}`,
    description: faker.lorem.paragraph(),
  };
}

// Create a new apology
router.post('/', (req, res) => {
  const apology = generateRandomApology();
  apologies.push(apology);
  res.status(201).send(apology);
});

// Read all apologies
router.get('/', (req, res) => {
  res.send(apologies);
});

// Read an apology by title
router.get('/:title', (req, res) => {
  // const title = req.params.title;
  const title = decodeURIComponent(req.params.title);
  const apology = apologies.find((a) => a.title === title);
  if (apology) {
    res.send(apology);
  } else {
    res.status(404).send({ error: 'Apology not found' });
  }
});

// Delete an apology by title
router.delete('/:title', (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const initialLength = apologies.length;
  apologies = apologies.filter((a) => a.title !== title);
  if (apologies.length < initialLength) {
    res.status(200).send({ message: 'Apology deleted successfully' });
  } else {
    res.status(404).send({ error: 'Apology not found' });
  }
});

export default router;
