import Dexie from 'dexie';

export const db = new Dexie('Challenge6Database');

db.version(1).stores({
  frutas: '++id, nombre, precio' 
});
