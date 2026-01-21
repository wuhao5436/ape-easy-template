import type { Reducer, Effect } from "umi";
import { getImageDetails } from "./api";

export type {{module_name}}State = {
  commodityInfo: Record<string, unknown>;
  saleProps: Record<string, unknown>;
  /** 不可派送区域 */
  restrictArea: any[];
};

export type {{module_name}}ModelType = {
  namespace: "{{module_name}}";
  state: {{module_name}}State;
  effects: {
    fetchCommodity: Effect;
  };
  reducers: {
    save: Reducer<{{module_name}}State>;
  };
};

const {{module_name}}Model: {{module_name}}ModelType = {
  namespace: "{{module_name}}",

  state: {
    commodityInfo: {},
    saleProps: {},
    restrictArea: [],
  },

  effects: {
    *fetchCommodity({ payload }, { call, put }) {
      const commodityInfo = yield call(getImageDetails, payload);
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
