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
        email: 'admin@admin.com',
        gender: 'MALE',
        phone: '9814602599',
        age: 30,
        role: 'ADMIN',
        password: await hashPassword('12345678')
      })
        .then()
        .catch(() => {
          // Ignore Admin error
        });
    })
    .catch(reject);
});

export { databaseLoader };
