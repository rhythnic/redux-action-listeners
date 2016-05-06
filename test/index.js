import test from 'tape';
import configureActionListener from '../src';
import { includes } from 'lodash';
import sinon from 'sinon';


test('middleware configuration', function (t) {

  let message = '';

  try { configureActionListener(); }
  catch(e) { message = e.message; }
  t.ok(includes(message, 'listener'), "Throws error if listener is not an object.");

  const listener = {};

  try { configureActionListener(listener); }
  catch(e) { message = e.message; }
  t.ok(includes(message, 'handleAction'), "Throws error if handleAction is not a function.");

  listener.handleAction = () => {};

  try { configureActionListener(listener); }
  catch(e) { message = e.message; }
  t.ok(includes(message, 'types'), "Throws error if types not 'all' or an array of strings.");

  t.end();
});


test('middleware', function (t) {

  const listener = {
    setStore: sinon.spy(),
    types: ['SAMPLE_ACTION'],
    handleAction: sinon.spy()
  };

  const middleware = configureActionListener(listener);

  const createFakeStore = fakeData => ({
    getState() {
      return fakeData;
    }
  });

  const dispatchWithStoreOf = (storeData, action) => {
    let dispatched = null;
    const store = createFakeStore(storeData);
    const dispatch = middleware(store)(actionAttempt => dispatched = actionAttempt);
    dispatch(action);
    return { store, dispatched };
  };

  let action = { type: 'UNLISTENED_ACTION' };
  res = dispatchWithStoreOf({}, action);
  t.equal(res.dispatched, action, "Dispatches actions that are not listened to.");
  action = { type: 'SAMPLE_ACTION' };
  let res = dispatchWithStoreOf({}, action);
  t.equal(res.dispatched, action, "Dispatches actions that are listened to.");
  t.ok(listener.setStore.calledWith(res.store), "Calls setStore with store.");
  const expectedArgs = [action, action, res.store];
  const args = listener.handleAction.getCall(0).args;
  t.deepEqual(args, expectedArgs, "Calls handleAction with args (action, dispatched, store).");

  t.end();
});
