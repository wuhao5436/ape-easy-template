import React, { useRef, useState } from "react";
import { Card, Space, Popconfirm, Button, Form, Spin } from "antd";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import { ModalForm, ProFormTextArea, ProFormText } from "@ant-design/pro-form";
import { ProTable, VALUE_TYPE, Upload, UPLOAD_TYPE } from "qiaoqiao-lib";
import { PageContainer } from "@ant-design/pro-layout";
import {
  getImageList,
  getImageDetails,
  deleteImage,
  addNewImage,
  updateImage,
} from "./api";
import { PlusOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
{{#if batch_handler}}
import type { TableRowSelection } from "antd/lib/table/interface";
{{/if}}
{{#if connect_model}}
import { connect } from 'umi';
import type { Dispatch } from "umi";

export type {{module_name}}Props = {
  dispatch: Dispatch;
};
{{/if}}

interface {{module_name}}TableListItem {
  id: string;
  picName: string;
  picUrl: string;
  remark: string;
  modifiedByName: string;
  gmtModified: string;
}

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 14 },
};

{{#if connect_model}}
const TableList: FC<{{module_name}}Props> = ({
  dispatch,
}) => {
{{else}}
const TableList: React.FC = () => {
{{/if}}
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  {{#if batch_handler}}
  /** 批量操作 */
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [selectedRows, setSelectedRows] = useState<CommodityItem[]>([]);
  {{/if}}

  {{#if hander_modal}}
  const [ modalVisible, setModalVisible ] = useState<boolean>(false);
  const [ curHandleItem, setCurHandleItem ] = useState<{{module_name}}TableListItem | null>(
    null
  );
  const { run: runGetImageDetail, loading: getDetailloading } = useRequest(
    getImageDetails,
    {
      manual: true,
      onSuccess: (res: {{module_name}}TableListItem) => {
        form.setFieldsValue({
          picName: res.picName,
          picUrl: [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: res.picUrl,
            },
          ],
          remark: res.remark,
        });
      },
      onError: () => {},
    }
  );

  /** 点击添加 */
  const showAddModal = async () => {
    setModalVisible(true);
    form.resetFields();
    setCurHandleItem(null);
  };

  /** 点击编辑 */
  const editItem = async (item: {{module_name}}TableListItem) => {
    setModalVisible(true);
    setCurHandleItem(item);
    await runGetImageDetail({ pictureId: item.id });
  };

  /** 新增编辑 */
  const handleFinishImageEdit = async (values: any) => {
    values.picUrl = values.picUrl?.[0]?.url;
    const handler = curHandleItem ? updateImage : addNewImage;
    if (curHandleItem) {
      values.id = curHandleItem.id;
    }
    const res = await handler(values);
    if (res) {
      setModalVisible(false);
      actionRef.current?.reload();
    }
  };
  {{/if}}

  {{#if batch_handler}}
  const rowSelection: TableRowSelection<{{module_name}}TableListItem> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, newSelectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys as number[]);
      setSelectedRows(newSelectedRows);
    },
  };
  {{/if}}


  /** 删除 */
  const deleteSingle = async (id: string) => {
    const res = await deleteImage({ id });
    if (res) {
      actionRef.current?.reload();
    }
  };

  const columns: ProColumns<{{module_name}}TableListItem>[] = [
    {
      title: "ID",
      dataIndex: "id",
      copyable: true,
    },
    {
      title: "备注",
      dataIndex: "remark",
      hideInSearch: true,
    },
    {
      title: "最后编辑时间",
      dataIndex: "gmtModified",
      valueType: VALUE_TYPE.DATE_TIME,
      hideInSearch: true,
    },
    {
      title: "操作",
      dataIndex: "handler",
      hideInSearch: true,
      render: (text, record) => {
        return (
          <Space>
            <a onClick={() => editItem(record)}>编辑</a>
            <Popconfirm
              title="确定删除？"
              onConfirm={() => {
                deleteSingle(record.id);
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<{{module_name}}TableListItem>
        form=\{{
          ignoreRules: false,
        }}
        actionRef={actionRef}
        withIndex={true}
        rowKey="id"
        search=\{{
          labelWidth: 120,
          defaultCollapsed: false,
        }}
        request={getImageList}
        columns={columns}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={showAddModal}
          >
            添加
          </Button>,
        ]}
        {{#if batch_handler}}
        rowSelection={rowSelection}
        {{/if}}
      />
      {{#if hander_modal}}
      <ModalForm
        {...layout}
        width={800}
        visible={modalVisible}
        formRef={form}
        title={`${curHandleItem ? "编辑" : "新增"}`}
        size="large"
        layout="horizontal"
        onFinish={handleFinishImageEdit}
        modalProps=\{{
          okText: "确认",
          onCancel: () => {
            setModalVisible(false);
            setCurHandleItem(null);
          },
        }}
      >
        <Spin spinning={getDetailloading}>
          <ProFormText
            name="picName"
            label="名称"
            required
            rules={[
              {
                required: true,
                message: "请输入名称",
              },
            ]}
          />
          <Form.Item
            required
            label="图片"
            name="picUrl"
            rules={[
              {
                required: true,
                message: "请上传图片",
              },
            ]}
          >
            <Upload
              accept=".png,.jpeg,.jpg"
              listType="picture-fixed-card"
              maxSize={1024 * 1024 * 6}
              maxSizeErrorMessage="图片必须小于 6 M"
              placeholder="支持上传扩展名为png,jpg,jpeg，大小5Mb以内的图片。"
              businessType={UPLOAD_TYPE.LOGO_PROFILE}
            />
          </Form.Item>
          <ProFormTextArea
            name="remark"
            label="备注"
            placeholder="请输入备注"
            fieldProps=\{{
              rows: 3,
            }}
          />
        </Spin>
      </ModalForm>
      {{/if}}
    </PageContainer>
  );
};

{{#if connect_model}}
export default connect(({  namespace }) => ({ namespace}))(TableList)
{{else}}
export default TableList;
{{/if}}
