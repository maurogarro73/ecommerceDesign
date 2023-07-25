class AuthController {
  async renderLogin(req, res) {
    return res.render('login', {});
  }

  async login(req, res) {
    if (!req.user) {
      return res.json({ error: 'invalid credentials' });
    }
    req.session.email = req.user.email;
    req.session.isAdmin = req.user.isAdmin;
    req.session.cart = req.user.cart;

    return res.redirect('/products');
  }

  async perfil(req, res) {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin, cart: req.session.cart };
    return res.render('perfil', { user: user });
  }

  async admin(req, res) {
    return res.send('datos clasificados');
  }

  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).render('error', { error: 'No se pudo cerrar su sesión :(' });
      } else {
        return res.redirect('/auth/login');
      }
    });
  }

  async register(req, res) {
    if (!req.user) {
      return res.json({ error: 'something went wrong' });
    }

    req.session.email = req.user.email;
    req.session.isAdmin = req.user.isAdmin;
    req.session.cart = req.user.cart;

    return res.redirect('/auth/perfil');
  }

  async failRegister(req, res) {
    return res.json({ error: 'fail to register' });
  }

  async failLogin(req, res) {
    return res.status(401).render('error', { error: 'Usuario o contraseña incorrectos' });
  }

  async renderRegister(req, res) {
    return res.render('register', {});
  }

  async session(req, res) {
    return res.send(JSON.stringify(req.session));
  }
}

export const authController = new AuthController();
