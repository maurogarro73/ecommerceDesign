import express from 'express';

export const chatRouter = express.Router();

chatRouter.get('/', (req, res) => {
  return res.render('chat', {});
});
