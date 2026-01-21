import { request } from "qiaoqiao-lib";
import type { IRequestResult } from "qiaoqiao-lib";

export interface ListParams {
  current?: number;
  pageSize?: number;
  keyword?: string;
}

export interface ImageItem {
  id: string;
  picName: string;
  picUrl: string;
  remark: string;
  modifiedByName?: string;
  gmtModified?: string;
}

export interface ListResponse {
  list: ImageItem[];
  total: number;
}

// 获取列表
export async function getImageList(data: ListParams) {
  const { bizData } = await request<IRequestResult<ListResponse>>(
    "/api/xxx/xxxx/xxx",
    {
      method: "post",
      data,
    }
  );
  return bizData;
}

// 获取详情
export async function getImageDetails(params: { pictureId: string }) {
  const { bizData } = await request<IRequestResult<ImageItem>>(
    "/api/xxx/xxxx/xxx",
    {
      method: "get",
      params,
    }
  );
  return bizData;
}

// 删除
export async function deleteImage(params: { id: string }) {
  const { bizData } = await request<IRequestResult<boolean>>(
    "/api/xxx/xxxx/xxx",
    {
      method: "post",
      data: params,
    }
  );
  return bizData;
}

// 新增
export async function addNewImage(data: Omit<ImageItem, "id">) {
  const { bizData } = await request<IRequestResult<boolean>>(
    "/api/xxx/xxxx/xxx",
    {
      method: "post",
      data,
    }
  );
  return bizData;
}

// 更新
export async function updateImage(data: ImageItem) {
  const { bizData } = await request<IRequestResult<boolean>>(
    "/api/xxx/xxxx/xxx",
    {
      method: "post",
      data,
    }
  );
  return bizData;
}
