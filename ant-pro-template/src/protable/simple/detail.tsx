import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import { Descriptions, Spin, Image, Empty } from "antd";
import { useParams } from "umi";
import { useRequest } from "ahooks";
import { getImageDetails } from "./api";
{{#if connect_model}}
import { connect } from "umi";
import type { Dispatch } from "umi";

export type {{module_name}}ItemDetailProps = {
  dispatch: Dispatch;
};
{{/if}}

interface {{module_name}}ItemDetail {
  id: string;
  picName: string;
  picUrl: string;
  remark?: string;
  modifiedByName?: string;
  gmtModified?: string;
}

{{#if connect_model}}
const {{module_name}}ItemDetail: React.FC<{{module_name}}ItemDetailProps> = ({
  dispatch: _dispatch,
}) => {
{{else}}
const {{module_name}}ItemDetail: React.FC = () => {
{{/if}}
  const { id } = useParams<{ id: string }>();
  const { loading, data } = useRequest<{{module_name}}ItemDetail | undefined>(
    () => getImageDetails({ pictureId: id as string }),
    {
      ready: Boolean(id),
    }
  );

  return (
    <PageContainer>
      <ProCard title="基本信息" headerBordered>
        <Spin spinning={loading}>
          <Descriptions column={2}>
            <Descriptions.Item label="ID">
              {data?.id || <Empty />}
            </Descriptions.Item>
            <Descriptions.Item label="名称">
              {data?.picName || <Empty />}
            </Descriptions.Item>
            <Descriptions.Item label="备注">
              {data?.remark || <Empty />}
            </Descriptions.Item>
            <Descriptions.Item label="最后编辑人">
              {data?.modifiedByName || <Empty />}
            </Descriptions.Item>
            <Descriptions.Item label="最后编辑时间">
              {data?.gmtModified || <Empty />}
            </Descriptions.Item>
          </Descriptions>
        </Spin>
      </ProCard>
      <ProCard title="图片预览" headerBordered>
        {data?.picUrl ? (
          <Image width={200} src={data.picUrl} />
        ) : (
          <Empty />
        )}
      </ProCard>
    </PageContainer>
  );
};

{{#if connect_model}}
export default connect(({ namespace }) => ({ namespace }))({{module_name}}ItemDetail);
{{else}}
export default {{module_name}}ItemDetail;
{{/if}}
