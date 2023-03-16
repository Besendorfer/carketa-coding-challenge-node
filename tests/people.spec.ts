import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { beforeEach } from 'mocha';
import nock from 'nock';

import app from '../index';
import { peopleList1 } from './people.constants';

chai.use(chaiHttp);

describe('People router tests', () => {
  beforeEach(() => {
    dotenv.config();
    if (!nock.isActive()) nock.activate();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should retrieve the list of people', (done) => {
    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/people')
      .reply(200, {
        next: null,
        results: peopleList1,
      });

    chai.request(app)
      .get(`${process.env.BASE_URL}/people`)
      .end((_error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.length).to.equal(3);
        done();
      });
  });

  it('should sort (ascending) the list by name when passing the name query param', (done) => {
    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/people')
      .reply(200, {
        next: null,
        results: peopleList1,
      });

    chai.request(app)
      .get(`${process.env.BASE_URL}/people?sortBy=name`)
      .end((_error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.length).to.equal(3);
        expect(res.body[0].name).to.equal('test person1')
        expect(res.body[1].name).to.equal('test person2')
        expect(res.body[2].name).to.equal('test person4')
        done();
      });
  });

  it('should sort (ascending) the list by height when passing the height query param', (done) => {
    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/people')
      .reply(200, {
        next: null,
        results: peopleList1,
      });

    chai.request(app)
      .get(`${process.env.BASE_URL}/people?sortBy=height`)
      .end((_error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.length).to.equal(3);
        expect(res.body[0].height).to.equal('10')
        expect(res.body[1].height).to.equal('12')
        expect(res.body[2].height).to.equal('unknown')
        done();
      });
  });

  it('should sort (ascending) the list by mass when passing the mass query param', (done) => {
    nock(`${process.env.SWAPI_BASE_URL}`)
      .get('/people')
      .reply(200, {
        next: null,
        results: peopleList1,
      });

    chai.request(app)
      .get(`${process.env.BASE_URL}/people?sortBy=mass`)
      .end((_error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.length).to.equal(3);
        expect(res.body[0].mass).to.equal('9')
        expect(res.body[1].mass).to.equal('2,031')
        expect(res.body[2].mass).to.equal('unknown')
        done();
      });
  });
});