import turso from '../libs/turso';
import KeyGenerator from '../classes/KeyGenerator';

const service = {};

service.getFiles = async () => {
  const files = await turso.execute({
    sql: 'SELECT * FROM files',
  });
  return files;
};

service.getFile = async (id) => {
  const files = await turso.execute({
    sql: 'SELECT name, content, type, created_date FROM files WHERE hash = ?',
    args: [id],
  });
  if (files.rows.length === 0) throw new Error('Not Found');
  return files.rows[0];
};

service.addNewFile = async (data) => {
  const keyGenerator = new KeyGenerator(10);
  keyGenerator.generateKey(['symbols']);
  const { name, content, type, passkey } = data;
  const result = await turso.execute({
    sql: 'INSERT INTO files(hash, name, content, type, passkey) VALUES (?, ?, ?, ?, ?)',
    args: [keyGenerator.key, name, content, type, passkey],
  });
  const insertedRow = await turso.execute({
    sql: 'SELECT hash FROM files WHERE id = ?',
    args: [result.lastInsertRowid],
  });
  return `/file/${insertedRow.rows[0].hash}`;
};

export default service;
