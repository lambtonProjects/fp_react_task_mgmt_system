import * as express from 'express';
export const router = express.Router();

//get list of user tasks
router.get('/list', async (req, res, next) => {
  try {
    let userKey = req.body.id;
    let userTasks = [{"name":"test1"},{"name":"test23"}];//todo add array with tasks from database
    res.render('itemsList', { title: 'blabla', itemsList: userTasks });
  } catch (err) {
      next(err); }
});