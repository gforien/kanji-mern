/******************************
 *        dependencies        *
 ******************************/
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');



/***************************************
 *        back-end unit testing        *
 ***************************************/
describe('back-end unit testing', () => {

  beforeEach(() => {
    this.log = sinon.stub(console, 'log');
  });

  afterEach(() => {
    this.log.restore();
  });

  it('should log "Listening on port 8888"', function () {
    console.log('Listening on port 8888');
    expect(console.log.calledWith('Listening on port 8888')).to.be.true;
  });
});