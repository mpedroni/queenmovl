import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { app } from './app';

export const database = getDatabase(app);

if (process.env.NODE_ENV !== 'production') {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(database, 'localhost', 9000);
}
