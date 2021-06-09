import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useParams } from "umi";
import { Card, Descriptions, Spin, Form, Image } from "antd";
import { getItemDetail } from "./api";
import { useRequest } from "ahooks";
import { MinorText } from "@qiaoqiao/qiaoqiao-lib";
import { safeGet, Empty } from "@/utils/tool";
{{#if connect_model}}
import { connect } from 'umi';
import type { Dispatch } from "umi";
export type {{module_name}}ItemDetailProps = {
  dispatch: Dispatch;
};
{{/if}}

const empty = <MinorText>暂无</MinorText>;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

interface {{module_name}}ItemShape {
  cagetory: number[];
  commodityName: string;
  subtitle: string;
  shareDescription: string;
  goodCode: string;
  commdityMainPicture: string[];
  commdityMainVedio: { url: string };
  brandName: string;
  serviceAssurance: string;
  careful: string;
  brandLogo: string;
  brandQualifications: string[];
}

{{#if connect_model}}
const {{module_name}}ItemDetail: FC<{{module_name}}ItemDetailProps> = ({
  dispatch,
}) => {
{{else}}
const {{module_name}}ItemDetail: React.FC = () => {
{{/if}}
  const { id } = useParams();
  const { loading, data: detailData } = useRequest(() =>
    getItemDetail({ id })
  );

  const {
    shopName,
    shopNo,
    contacts,
    phone,
    openDate,
    wechatNo,
    invCode,
    certNo,
  } = detailData || {};

  return (
    <PageContainer>
      {/* 简单key-value表达形式 */}
      <ProCard>
        <Spin spinning={loading}>
          <Descriptions title={`${shopName}/${shopNo}`}>
            <Descriptions.Item label="联系人">
              {contacts || empty}
            </Descriptions.Item>
            <Descriptions.Item label="手机号">
              {phone || empty}
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {openDate || empty}
            </Descriptions.Item>
            <Descriptions.Item label="身份证">
              {certNo || empty}
            </Descriptions.Item>
            <Descriptions.Item label="微信号">
              {" "}
              {wechatNo || empty}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="邀请码">
              {invCode || empty}
            </Descriptions.Item>
          </Descriptions>
        </Spin>
      </ProCard>
      {/* 仅使用form的布局 */}
      <ProCard title="商品信息" headerBordered>
        <Form {...layout}>
          <Form.Item label="商品名称">{commodityName}</Form.Item>
          <Form.Item label="商品轮播图">
            {commdityMainPicture ? (
              commdityMainPicture?.map((url: string) => (
                <div style=\{{ margin: 8 }}>
                  <Image width={180} key={url} src={url} />
                </div>
              ))
            ) : (
              <Empty />
            )}
          </Form.Item>
          <Form.Item label="主图视频">
            {data.commdityMainVedio?.url ? (
              <video width="320" height="240" controls>
                <source
                  src={data.commdityMainVedio?.url}
                  type="video/mp4"
                ></source>
              </video>
            ) : (
              <Empty />
            )}
          </Form.Item>
        </Form>
      </ProCard>
      {/* 使用form.setFiledValue进行值设置 */}
      <ProCard title="XX详情">
        <ProForm
          onFinish={async (values) => {
            await waitTime(2000);
            console.log(values);
            message.success('提交成功');
          }}
          initialValues=\{{
            name: '蚂蚁设计有限公司',
            name2: '蚂蚁设计集团',
            useMode: 'chapter',
          }}
          form
        >
          <ProFormText
            width="md"
            name="name"
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          <ProFormText
            width="md"
            name={['name2', 'text']}
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          {/*  ProFormDependency 会自动注入并且 进行 shouldUpdate 的比对  */}
          <ProFormDependency name={['name', ['name2', 'text']]}>
            {({ name, name2 }) => {
              return (
                <ProFormSelect
                  options={[
                    {
                      value: 'chapter',
                      label: '盖章后生效',
                    },
                  ]}
                  width="md"
                  name="useMode"
                  label={`与《${name || ''}》 与 《${name2?.text || ''}》合同约定生效方式`}
                />
              );
            }}
          </ProFormDependency>
          {/* noStyle shouldUpdate 是必选的，写了 name 就会失效 */}
          <Form.Item noStyle shouldUpdate>
            {(form) => {
              return (
                <ProFormSelect
                  options={[
                    {
                      value: 'chapter',
                      label: '盖章后生效',
                    },
                  ]}
                  width="md"
                  name="useMode"
                  label={`与《${form.getFieldValue('name')}》合同约定生效方式`}
                />
              );
            }}
          </Form.Item>
          <ProForm.Group>
            <ProFormText
              name={['contract', 'name']}
              width="md"
              label="合同名称"
              placeholder="请输入名称"
            />
          </ProForm.Group>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}



/** 数据格式化工具 */
{{module_name}}ItemDetail.getInfoFromResponse = (res: any ) => {
  return {
    cagetory: [res.firstCatId, res.secondCatId, res.thirdCatId].filter(
      (item) => !!item
    ),
    commodityName: res.itemName,
    subtitle: res.subTitle,
    shareDescription: res.shareDescription,
    goodCode: res.goodCode,
    commdityMainPicture: res.mainImageUrlList,
    commdityMainVedio: { url: res.mainVideoUrl },
    brandName: res.brandName,
    serviceAssurance: res.serviceGuaranteeList,
    careful: res.note,
  };
};




{{#if connect_model}}
export default connect(({  namespace }) => ({ namespace}))({{module_name}}ItemDetail)
{{else}}
export default {{module_name}}ItemDetail
{{/if}}
