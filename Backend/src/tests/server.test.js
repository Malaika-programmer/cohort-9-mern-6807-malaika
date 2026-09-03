import sinon from 'sinon';
import { expect } from 'chai';
import app from '../../app.js'; // Points to root Backend/app.js

describe('Server Entry Execution (src/tests/server.test.js)', () => {
  let listenStub;
  let consoleLogStub;
  let consoleErrorStub;
  let processExitStub;

  beforeEach(() => {
    listenStub = sinon.stub(app, 'listen');
    consoleLogStub = sinon.stub(console, 'log');
    consoleErrorStub = sinon.stub(console, 'error');
    processExitStub = sinon.stub(process, 'exit');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call app.listen on default port 5000 and log success', async () => {
    delete process.env.PORT;
    listenStub.callsFake((port, host, callback) => callback());

    await import(`../../server.js?update=${Date.now()}`);

    expect(listenStub.calledOnce).to.be.true;
    expect(String(listenStub.firstCall.args[0])).to.equal('5000'); // Fixed string vs number assertion
    expect(listenStub.firstCall.args[1]).to.equal('0.0.0.0');
    expect(consoleLogStub.calledWith('Server running on port 5000')).to.be.true;
  });

  it('should use custom process.env.PORT when defined', async () => {
    process.env.PORT = '8080';
    listenStub.callsFake((port, host, callback) => callback());

    await import(`../../server.js?update=${Date.now()}`);

    expect(listenStub.firstCall.args[0]).to.equal('8080');
    expect(consoleLogStub.calledWith('Server running on port 8080')).to.be.true;
  });

  it('should catch server startup errors and exit process with code 1', async () => {
    const error = new Error('EADDRINUSE: port in use');
    listenStub.throws(error);

    await import(`../../server.js?update=${Date.now()}`);

    expect(consoleErrorStub.calledWith('Failed to start server:', error)).to.be.true;
    expect(processExitStub.calledWith(1)).to.be.true;
  });
});