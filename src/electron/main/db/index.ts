import {JsonDB, Config} from 'node-json-db';

const jsonDB = new JsonDB(new Config('bot', true, false, '/'));

export {jsonDB};
