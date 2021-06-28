import { Router } from 'express';
import { makeResponse } from '../../lib';
import {
  addTrainValidation,
  checkRole,
  updateTrainValidation
} from '../../middlewares';
import { addTrain, listTrains, updateTrain } from '../../services';

const router = Router();

router.post('/add',
  checkRole(['ADMIN']),
  addTrainValidation,
  (req, res) => {
    addTrain(req.body)
      .then(async (train: any) => {
        await makeResponse(res, 200, true, 'train added successfully', train);
      })
      .catch(async error => {
        await makeResponse(res, 400, false, error.message, undefined);
      });
  }
);

router.get('/list', checkRole(['ADMIN', 'CUSTOMER']), (req, res) => {
  const { from, to } = req.query as any;
  listTrains(JSON.parse(JSON.stringify({
    fromPlace: from,
    toPlace: to
  })))
    .then(async trains => {
      await makeResponse(res, 200, true, '', trains);
    })
    .catch(async error => {
      await makeResponse(res, 400, false, error.message, undefined);
    });
});

router.put('/update/:id',
  checkRole(['ADMIN']),
  updateTrainValidation,
  (req, res) => {
    const { id } = req.params as any;
    updateTrain(id, req.body, { new: true })
      .then(async train => {
        await makeResponse(res, 200, true, 'update successful', train);
      })
      .catch(async error => {
        await makeResponse(res, 400, false, error.message, undefined);
      });
  });

router.delete('/delete/:id', checkRole(['ADMIN']), (req, res) => {
  const { id } = req.params as any;
  updateTrain(id, { status: 'INACTIVE' })
    .then(async () => {
      await makeResponse(res, 200, true, 'train deleted', undefined);
    })
    .catch(async error => {
      await makeResponse(res, 400, false, error.message, undefined);
    });
});

export const trainController = router;
