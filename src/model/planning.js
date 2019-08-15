import {prepareToPlan} from "../services/method";

export default {
  namespace: 'planning',
  state: {
    algo: {
      id: 1,
    },
    flight: {
      num: 0,
      //information: []
    },
    height: {
      h: 0,
      //information: []
    },
    point: {
      start: -1,
      pass: []
    },
    route: [],
  },
  effects:{
    *pre_to_plan({payload}, sagaEffects){
      const { call, put } = sagaEffects;
      const response = yield call(prepareToPlan,payload);
      console.log(response)
      yield put({ type: "updateRoute", payload: response });
    },
    // *get_the_route(_, sagaEffects){
    //   const { call, put } = sagaEffects;
    //   const datasets  = yield call(getTheRoute);
    //   console.log(datasets)
    //   yield put({ type: "updateRoute", payload: datasets });
    // }
  },
  reducers: {
    set_algo(state, { payload: number }) {
      console.log("asdf")
      const nextAlgo = number;
      const nextFlight = state.flight;
      //const nextInformation = state.flight.information;
      const nextHeight = state.height;
      const nextPoint = state.point;
      const nextRoute = state.route;
      // const newCardWithId = { ...newCard, id: nextCounter };
      // const nextData = state.data.concat(newCardWithId);
      return {
        algo: {
          id: nextAlgo,
        },
        flight: nextFlight,
        height: nextHeight,
        point: nextPoint,
        route: nextRoute,
      };
    },
    set_flight_num(state, { payload: number }) {
      const nextAlgo = state.algo;
      const nextNumber = number;
      //const nextInformation = state.flight.information;
      const nextHeight = state.height;
      const nextPoint = state.point;
      const nextRoute = state.route;
      // const newCardWithId = { ...newCard, id: nextCounter };
      // const nextData = state.data.concat(newCardWithId);
      return {
        algo: nextAlgo,
        flight: {
          num: nextNumber,
          //information: nextInformation,
        },
        height: nextHeight,
        point: nextPoint,
        route: nextRoute,
      };
    },
    set_height(state, { payload: number }) {
      const nextAlgo = state.algo;
      const nextHeight = number;
      //const nextInformation = state.good.information;
      const nextFlight = state.flight;
      const nextPoint = state.point;
      const nextRoute = state.route;
      // const newCardWithId = { ...newCard, id: nextCounter };
      // const nextData = state.data.concat(newCardWithId);
      return {
        algo: nextAlgo,
        flight: nextFlight,
        height: {
          h: nextHeight,
          //information: nextInformation,
        },
        point: nextPoint,
        route: nextRoute,
      };
    },
    set_start_point(state, { payload: start_id }) {
      const nextAlgo = state.algo;
      const nextStart = start_id;
      const nextPass = state.point.pass;
      const nextFlight = state.flight;
      const nextHeight = state.height;
      const nextRoute = state.route;
      // const newCardWithId = { ...newCard, id: nextCounter };
      // const nextData = state.data.concat(newCardWithId);
      return {
        algo: nextAlgo,
        flight: nextFlight,
        height: nextHeight,
        point: {
          start: nextStart,
          pass: nextPass,
        },
        route: nextRoute,
      };
    },
    set_pass_point(state, { payload: pass_id }) {
      const nextAlgo = state.algo;
      const nextStart = state.point.start;
      const nextPass = state.point.pass.concat(pass_id);
      const nextFlight = state.flight;
      const nextHeight = state.height;
      const nextRoute = state.route;
      // const newCardWithId = { ...newCard, id: nextCounter };
      // const nextData = state.data.concat(newCardWithId);
      return {
        algo: nextAlgo,
        flight: nextFlight,
        height: nextHeight,
        point: {
          start: nextStart,
          pass: nextPass,
        },
        route: nextRoute,
      };
    },
    updateRoute(state, { payload: datasets }) {
      const nextAlgo = state.algo;
      const nextFlight = state.flight;
      const nextHeight = state.height;
      const nextPoint = state.point;
      const nextRoute = datasets;
      // const newCardWithId = { ...newCard, id: nextCounter };
      // const nextData = state.data.concat(newCardWithId);
      return {
        algo: nextAlgo,
        flight: nextFlight,
        height: nextHeight,
        point: nextPoint,
        route: nextRoute,
      };
    },
  },
};