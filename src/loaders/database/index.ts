import mongoose from 'mongoose';
import { saveUser } from '../../services';
import { hashPassword } from '../../services/common';

mongoose.set('debug', false);
const databaseLoader = async () => new Promise<any>((resolve, reject) => {
  mongoose.connect(String(process.env.MONGO_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(async db => {
      console.log('Database connection established');
      resolve(db);
      saveUser({
        name: 'Administrator',
        email: 'admin@relinns.com',
        gender: 'MALE',
        phone: '',
        department: 'ADMIN',
        role: ['ADMIN'],
        password: await hashPassword('12345678'),
        status: 'ACTIVE'
      })
        .then()
        .catch(() => {
          // Ignore Admin error
        });
    })
    .catch(reject);
});

export { databaseLoader };
