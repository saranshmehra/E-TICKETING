import { USER } from '../../models';

const getUser = async (search: any = {}, project: any = {}) =>
  USER.findOne(search, project)
    .lean()
    .exec();

const saveUser = async (userDetails = {}) => USER.create(userDetails);

export { getUser, saveUser };
