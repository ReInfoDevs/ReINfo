import express from 'express';

const router = express.Router();

router.get('/resources', (req, res) => {
  res.locals.test = 'Nice you did a server thing!';
  return res.json(res.locals);
})

export default router;