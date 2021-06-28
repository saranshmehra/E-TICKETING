import { Types } from 'mongoose';
import { TICKET } from '../../models';

const bookTicket = async (payload = {}) => new Promise((resolve, reject) => {
  const newTicket = new TICKET(payload);
  newTicket.save()
    .then(resolve)
    .catch(reject);
});

const myTickets = async (select: any = {}, project: any = {}) =>
  TICKET.find(select, project)
    .populate('train', 'name fromPlace toPlace departureTime arrivalTime')
    .lean()
    .exec();

const cancelTicket = async (id: Types.ObjectId, update: any = {}) =>
  TICKET.findByIdAndUpdate(id, update)
    .lean()
    .exec();

export { bookTicket, myTickets, cancelTicket };
