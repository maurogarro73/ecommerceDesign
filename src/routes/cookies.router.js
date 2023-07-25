import express from 'express';

export const coockieRouter = express.Router();

coockieRouter.get('/set', (req, res) => {
  res.cookie('intereses', '["futboll", "basquet"]', { maxAge: 100000 });
  res.cookie('count', '0', { maxAge: 100000 });
  return res.status(200).json({
    status: 'error',
    msg: 'Te meti las cookies!!',
    data: {},
  });
});

coockieRouter.get('/get', (req, res) => {
  console.log(req.cookies);
  return res.status(200).json({
    status: 'ok',
    msg: 'Cookies por consola',
    data: {},
  });
});

coockieRouter.get('/delete', (req, res) => {
  res.clearCookie('intereses');
  console.log(req.cookies);
  return res.status(200).json({
    status: 'ok',
    msg: 'Cookies por consola',
    data: {},
  });
});
