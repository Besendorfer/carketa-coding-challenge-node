import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { beforeEach } from 'mocha';
import nock from 'nock';

import app from '../index';
import { planetList1 } from './planets.constants';

chai.use(chaiHttp);

describe('Planets router tests', () => {
  beforeEach(() => {
    dotenv.config();
    if (!nock.isActive()) nock.activate();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should retrieve the list of planets', (done) => {
    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/planets')
      .reply(200, {
        next: null,
        results: planetList1,
      });

    nock('https://testurl.test')
      .get('/person/3')
      .reply(200, {
        name: 'test resident3'
      });

    chai.request(app)
      .get(`${process.env.BASE_URL}/planets`)
      .end((_error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.length).to.equal(1);
        done();
      });
  });

  it('should use the resident\'s name in place of the resident\'s url, which is initially given', (done) => {
    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/planets')
      .reply(200, {
        next: null,
        results: planetList1,
      });

    nock('https://testurl.test')
      .get('/person/3')
      .reply(200, {
        name: 'test resident3'
      });

    chai.request(app)
      .get(`${process.env.BASE_URL}/planets`)
      .end((_error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.length).to.equal(1);
        expect(res.body[0].residents[0]).to.equal('test resident3');
        done();
      });
  });
});