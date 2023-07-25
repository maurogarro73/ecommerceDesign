import passport from 'passport';
import express from 'express';
export const sessionsRouter = express.Router();

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/auth/login' }), (req, res) => {
  req.session.email = req.user.email;
  req.session.isAdmin = req.user.isAdmin;
  req.session.cart = req.user.cart;
  // Successful authentication, redirect home.
  res.redirect('/products');
});

sessionsRouter.get('/current', (req, res) => {
  return res.send(JSON.stringify(req.session));
});
