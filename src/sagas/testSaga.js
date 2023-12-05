import { call, cancel, cancelled, delay, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

function double(number){
    return number*2;    
};

export function* testSaga(){
    while(true){
        console.log("Starting saga");
        const state = yield take('TEST_MESSAGE');
        const a = yield call(double, 2);
        console.log(a);
        const b = yield double(3);
        console.log(b);
        console.log("Finish saga function", state);
    };
};

function* doNothing(){
    console.log('I have been called');
    yield delay(1000);
    console.log('I am doing nothing');
};

export function* testSagaFork(){
    while(true){
        yield take('TEST_MESSAGE_2');
        yield fork(doNothing);
        yield fork(doNothing);
        yield fork(doNothing);
    };
};

export function* testSagaTakeEveryProcess({ payload }){
    console.log(`Starting process for index ${payload}`);
    yield delay(3000);
    console.log(`Ending process for index ${payload}`);
};

export function* testSagaTakeEvery(){
    const { payload } = yield takeEvery('TEST_MESSAGE_3', testSagaTakeEveryProcess);
    console.log(`Finish TakeEvery for index ${payload}`);
};

function* infinitySaga(){
    console.log('starting infinity saga');
    let index = 0;
    while(true){
        index++;
        try{
            console.log(`inside infinity loop ${index}`);
            yield delay(1000);
        }catch(error){
            console.error('An error happened: ', error);
        }finally{
            console.log('Was the fork was cancelled?', yield cancelled());
        }
    };
};

export function* testSagaCancelled(){
    yield take('TEST_MESSAGE_4');
    const handleCancel = yield fork(infinitySaga);
    yield delay(3000);
    yield cancel(handleCancel);
};

export function* testSagaTakeLatest(){
    yield takeLatest('TEST_MESSAGE_5', infinitySaga);
    const handleCancel = yield fork(infinitySaga);
    yield delay(3000);
    yield cancel(handleCancel);
};

export function* dispatchTest(){
    let index = 0;
    //yield put({ type: 'TEST_MESSAGE_5', payload: index });

    while(true){
        yield delay(5000);
        yield put({ type: 'TEST_MESSAGE_5', payload: index });
        index++;
    };
};
