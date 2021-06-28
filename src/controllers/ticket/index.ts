import { Router } from 'express';
import { makeResponse } from '../../lib';
import { bookTicketValidation } from '../../middlewares';
import { bookTicket, cancelTicket, myTickets } from '../../services';

const router = Router();

router.post('/book', bookTicketValidation, (req, res) => {
  const { _id } = req.user as any;
  bookTicket({ ...req.body, bookedBy: _id })
    .then(async ticket => {
      await makeResponse(res, 200, true, 'ticket booked', ticket);
    })
    .catch(async error => {
      await makeResponse(res, 400, false, error.message);
    });
});

router.get('/booking-history', (req, res) => {
  const { _id } = req.user as any;
  myTickets({ bookedBy: _id })
    .then(async tickets => {
      await makeResponse(res, 200, true, '', tickets);
    })
    .catch(async error => {
      await makeResponse(res, 400, false, error.message);
    });
});

router.patch('/cancel/:id', (req, res) => {
  const { id } = req.params as any;
  cancelTicket(id, { status: 'CANCELLED' })
    .then(async () => {
      await makeResponse(res, 200, true, 'ticket cancelled');
    })
    .catch(async error => {
      await makeResponse(res, 400, false, error.message);
    });
});

export const ticketController = router;
