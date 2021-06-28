import { Types } from 'mongoose';
import { TRAIN } from '../../models';

const addTrain = async (payload = {}) => new Promise((resolve, reject) => {
  const newTrain = new TRAIN(payload);
  newTrain.save()
    .then(resolve)
    .catch(reject);
});

const listTrains = async (select: any = {}, project: any = {}) =>
  TRAIN.find(select, project)
    .lean()
    .exec();

const updateTrain = async (id: Types.ObjectId, update: any = {}, options: any = {}) =>
  TRAIN.findByIdAndUpdate(id, update, options)
    .lean()
    .exec();

export { addTrain, listTrains, updateTrain };
