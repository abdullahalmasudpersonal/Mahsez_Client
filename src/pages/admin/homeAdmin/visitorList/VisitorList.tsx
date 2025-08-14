import { Col, Row, Select, Table, TableColumnsType } from "antd";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import { useState } from "react";

import Loader2 from "../../../shared/loader/Loader2";
import { useGetVisitorsWithFiltersQuery } from "../../../../redux/features/visitor/visitorApi";
import { TVisitors } from "../../../../types/visitor.types";
import { formatDate } from "../../../../utils/formatDate";

const { Option } = Select;

const VisitorList = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: visitorData, isLoading } = useGetVisitorsWithFiltersQuery({
    limit: pageSize,
    page: currentPage,
  });

  const handleTableChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const dataTable = visitorData?.data?.map(
    ({
      _id,
      ip,
      visitCount,
      deviceInfo,
      ispInfo,
      visitedAt,
      lastVisitedAt,
    }: TVisitors) => ({
      key: _id,
      ip,
      visitCount,
      deviceInfo,
      ispInfo,
      visitedAt,
      lastVisitedAt,
    })
  );

  const columns: TableColumnsType<TVisitors> = [
    {
      title: "IP Address",
      dataIndex: "ip",
      key: "ip",
      align: "center",
      width: 100,
    },
    {
      title: "Visit Count",
      dataIndex: "visitCount",
      key: "visitCount",
      align: "center",
      width: 100,
    },
    {
      title: "Device Type",
      dataIndex: "deviceInfo",
      key: "deviceInfo",
      align: "center",
      width: 120,
      render: (deviceInfo) =>
        (deviceInfo.type === "Unknown" && "Dasktop") || deviceInfo.type,
    },
    {
      title: "OS",
      dataIndex: "deviceInfo",
      key: "deviceInfo",
      align: "center",
      width: 100,
      render: (deviceInfo) =>
        (deviceInfo.os === "Unknown" && "Dasktop") || deviceInfo.os,
    },
    {
      title: "OS Version",
      dataIndex: "deviceInfo",
      key: "deviceInfo",
      align: "center",
      width: 120,
      render: (deviceInfo) => deviceInfo.osVersion,
    },
    {
      title: "Device Name",
      dataIndex: "deviceInfo",
      key: "deviceInfo",
      align: "center",
      width: 120,
      render: (deviceInfo) => deviceInfo.device,
    },
    {
      title: "Browser",
      dataIndex: "deviceInfo",
      key: "deviceInfo",
      align: "center",
      width: 140,
      render: (deviceInfo) => deviceInfo.browser,
    },
    {
      title: "VisitedAt",
      dataIndex: "visitedAt",
      key: "visitedAt",
      align: "center",
      width: 130,
      render: (visitedAt: string) => formatDate(visitedAt),
    },
  ];

  return (
    <div className="dashboard-dev2" style={{ overflowX: "auto" }}>
      <PageTitle pageTitle="Visitors || Admin" />
      <div className="py-4 px-4 d-flex justify-content-between align-items-center" style={{backgroundColor:'#033566ff',borderRadius:'5px 5px 0 0'}}>
        <h4 className="fw-bold m-0" style={{color:'white'}}>
          All Visitor List {visitorData?.meta?.total}
        </h4>
        <Row justify="end">
          <Col>
            <Select
              defaultValue={10}
              style={{ width: 120 }}
              onChange={(value) => setPageSize(value)}
            >
              <Option value={10}>10 / page</Option>
              <Option value={20}>20 / page</Option>
              <Option value={30}>30 / page</Option>
              <Option value={50}>50 / page</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <hr />

      {isLoading ? (
        <Loader2 />
      ) : (
        <div style={{ padding: "10px" }}>
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: visitorData?.meta?.total,
              showSizeChanger: false,
              onChange: handleTableChange,
            }}
            scroll={{ x: "max-content", y: 550 }}
            style={{ width: "100%" }}
            sticky
          />
        </div>
      )}
    </div>
  );
};

export default VisitorList;
