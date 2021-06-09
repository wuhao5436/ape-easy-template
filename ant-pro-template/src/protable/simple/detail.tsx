import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { useParams } from "umi";
import { Card, Descriptions, Spin } from "antd";
import { getItemDetail } from "./api";
import { useRequest } from "ahooks";
import { MinorText } from "@qiaoqiao/qiaoqiao-lib";

const empty = <MinorText>暂无</MinorText>;

export default function ShopDetail() {
  const { id } = useParams();
  const { loading, data: detailData } = useRequest(() =>
  getItemDetail({ shopId: id })
  );

  const {
    shopName,
    shopNo,
    contacts,
    phone,
    openDate,
    wechatNo,
    invCode,
    // wechatQrCode,
    certNo,
  } = detailData || {};

  return (
    <PageContainer>
      <Card>
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
      </Card>
    </PageContainer>
  );
}
