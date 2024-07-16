import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import passport from 'passport';
import verifyToken from '@middleware/VerifyToken';

import AuthController from '../../controllers/auth/AuthController';

dotenv.config();
const router = Router();
const authController = new AuthController();

router.get('/login/success', (req: Request, res: Response) => {
  if (req.user) {
    return authController.sign_in_success_oauth(req, res);
  } else {
    return res.status(400).json({ message: 'Not Authorized' });
  }
});

router.get('/login/failed', (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});
router.get('/logout', (req: Request, res: Response) => {
  req.logOut((err: any) => {
    if (err) {
      console.log('err', err);
    }
  });
});
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: String(process.env.CLIENT_URL),
    failureRedirect: '/login/failed',
  }),
);

export default router;
