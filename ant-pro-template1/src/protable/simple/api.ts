import { request } from "qiaoqiao-lib";
import type { IRequestResult } from "qiaoqiao-lib";

// 获取列表

export async function getTableList(data: any) {
  const { bizData } = await request<IRequestResult>(
    "/api/xxx/xxxx/xxx",
    {
      method: "post",
      data,
    }
  );
  return bizData;
}

// 获取详情
export async function getItemDetail(params: any) {
  const { bizData } = await request<IRequestResult>("/api/xxx/xxxx/xxx", {
    method: "get",
    params,
  });
  return bizData;
}
