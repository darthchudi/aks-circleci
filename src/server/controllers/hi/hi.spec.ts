// import metadata for es7 decorators support
import 'reflect-metadata';

import request from 'supertest';
import { App } from '../../app';

const newApp = new App();
const app = newApp.getServer().build();

it('it works', async () => {
  const result = await request(app)
    .get('/hi')
    .expect(200);
  const { data } = result.body;
  expect(data.message).toMatch(/I'm a new feature! Hi!/);
  expect(data.environment).toBeDefined();
  expect(data.name).toBeDefined();
  expect(data.port).toBeDefined();
});
