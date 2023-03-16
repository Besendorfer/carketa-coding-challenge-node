import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { beforeEach } from 'mocha';
import nock from 'nock';

import app from '../index';
import { peopleList1, peopleList2 } from './people.constants';
import { planetList1, planetList2 } from './planets.constants';

chai.use(chaiHttp);

describe('Router tests - pagination', () => {
  beforeEach(() => {
    dotenv.config();
    if (!nock.isActive()) nock.activate();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should handle people pagination properly', (done) => {
    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/people')
      .reply(200, {
        next: `${process.env.SWAPI_BASE_URL}/people?page=2`,
        results: peopleList1,
      });

    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/people')
      .query({ page: '2' })
      .reply(200, {
        next: null,
        results: peopleList2,
      });

    chai.request(app)
      .get(`${process.env.BASE_URL}/people`)
      .end((_error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.length).to.equal(4);
        done();
      });
  });

  it('should handle planet pagination properly', (done) => {
    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/planets')
      .reply(200, {
        next: `${process.env.SWAPI_BASE_URL}/planets?page=2`,
        results: planetList1,
      });

    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/planets')
      .query({ page: '2' })
      .reply(200, {
        next: null,
        results: planetList2,
      });

    nock('https://testurl.test')
      .get('/person/3')
      .reply(200, {
        name: 'test resident3'
      });

    nock('https://testurl.test')
      .get('/person/1')
      .reply(200, {
        name: 'test resident1'
      });

    chai.request(app)
      .get(`${process.env.BASE_URL}/planets`)
      .end((_error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.length).to.equal(2);
        expect(res.body[0].residents[0]).to.equal('test resident3');
        expect(res.body[1].residents[0]).to.equal('test resident1');
        done();
      });
  });
});