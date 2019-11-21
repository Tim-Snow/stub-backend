import { getHeaders, arrayToJson, buildUrl } from "../../utils.cli";

export const headTestTemplate = (path, args, idsFormatted) => {
  const pathWithDummyData = buildUrl(path, idsFormatted);
  let headers = getHeaders(args);
  return `
'use strict';

var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('GET - ${path} ', () => {
  it('should exist', (done) => {
    request(app)
      .head('${path.startsWith('/') ? pathWithDummyData : `/${pathWithDummyData}`}')
      ${headers ? `.set({${arrayToJson(headers)}})` : ''}
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
          done();
      });
  });
});
`;
}
