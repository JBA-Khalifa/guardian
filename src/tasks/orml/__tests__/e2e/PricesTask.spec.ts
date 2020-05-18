import { map } from 'rxjs/operators';
import { createLaminarApi } from '../../../laminarChain';
import PricesTask from '../../PricesTask';

describe('PricesTask', () => {
  const api$ = createLaminarApi('wss://testnet-node-1.laminar-chain.laminar.one/ws').pipe(map((a) => a.api));
  const task = new PricesTask(api$);

  jest.setTimeout(30_000);

  it('get oracle value', (done) => {
    task.call({ key: 'FEUR' }).subscribe((output) => {
      console.log(JSON.stringify(output, null, 2));
      expect(output).toBeTruthy();
      done();
    });
  });

  it('get oracle values [FEUR, FJPY]', (done) => {
    task.call({ key: ['FEUR', 'FJPY'] }).subscribe((output) => {
      console.log(JSON.stringify(output, null, 2));
      expect(output).toBeTruthy();
      done();
    });
  });

  it('get all oracle values', (done) => {
    task.call({ key: 'all' }).subscribe((output) => {
      console.log(JSON.stringify(output, null, 2));
      expect(output).toBeTruthy();
      done();
    });
  });
});