
import type { Reducer, Effect } from "umi";
import { getCommodityDetail } from "./api";

export type {{module_name}}State = {
  commodityInfo: {};
  saleProps: {};
  /** 不可派送区域 */
  restrictArea: any[];
};

export type {{module_name}}ModelType = {
  namespace: "commodityDetail";
  state: {{module_name}}State;
  effects: {
    fetchCommodity: Effect;
  };
  reducers: {
    save: Reducer<commodityDetailState>;
  };
};

const {{module_name}}Model: {{module_name}}ModelType = {
  namespace: "commodityDetail",

  state: {
    commodityInfo: {},
  },

  effects: {
    *fetchCommodity({ payload }, { call, put }) {
      const commodityInfo = yield call(getCommodityDetail, payload);
      yield put({
        type: "save",
        payload: {
          commodityInfo,
        },
      });
      return commodityInfo;
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default {{module_name}}Model;
