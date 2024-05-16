import express from 'express';

import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('saving a new diagnoses');
});

export default router;
