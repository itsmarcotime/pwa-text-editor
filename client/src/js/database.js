import { openDB } from 'idb';

const initdb = async () =>
  openDB('content_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contents')) {
        console.log('content database already exists');
        return;
      }
      db.createObjectStore('contents', { keyPath: 'id', autoIncrement: true });
      console.log('content database created');
    },
  });

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET')
  const contentDb = await openDB('content_db', 1);
  const tx = contentDb.transaction('contents', 'readonly');
  const store = tx.objectStore('contents');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('PUT');
  const contentDb = await openDB('content_db', 1);
  const tx = contentDb.transaction('content', 'readwrite');
  const store = tx.objectStore('contents');
  const request = store.put({ content: content });
  const result = await request;
  console.log('data saved', result);
  return result;
};

initdb();
