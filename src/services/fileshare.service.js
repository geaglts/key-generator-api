import dayjs from 'dayjs';
import turso from '../libs/turso';
import KeyGenerator from '../classes/KeyGenerator';
import * as secureService from './secure.service';

const service = {};

service.getFiles = async () => {
  const files = await turso.execute({
    sql: 'SELECT * FROM files',
  });
  return files;
};

service.getFile = async (id) => {
  const files = await turso.execute({
    sql: 'SELECT * FROM files WHERE hash = ?',
    args: [id],
  });
  const [file] = files.rows;
  if (!file) throw new Error('Not Found');
  if (dayjs().diff(file.created_date, 'day') > 0) {
    await turso.execute({
      sql: 'DELETE FROM files WHERE id = ?',
      args: [file.id],
    });
    throw new Error('Not found');
  }
  return file;
};

service.addNewFile = async (data) => {
  const keyGenerator = new KeyGenerator(10);
  keyGenerator.generateKey(['symbols']);
  const { name, content, type, passkey } = data;
  let securePasskey = '';
  if (passkey) {
    securePasskey = await secureService.encrypt(passkey);
  }
  const result = await turso.execute({
    sql: 'INSERT INTO files(hash, name, content, type, passkey) VALUES (?, ?, ?, ?, ?)',
    args: [keyGenerator.key, name, content, type, securePasskey],
  });
  const insertedRow = await turso.execute({
    sql: 'SELECT hash FROM files WHERE id = ?',
    args: [result.lastInsertRowid],
  });
  return `/file/${insertedRow.rows[0].hash}`;
};

export default service;
