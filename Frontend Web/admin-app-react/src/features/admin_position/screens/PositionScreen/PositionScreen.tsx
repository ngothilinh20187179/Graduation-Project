import { Breadcrumb, Button, Pagination, Table, Typography } from "antd";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { RequestParams } from "types/param.types";
import { getPositions } from "features/admin_position/redux/position.slice";
import { COLUMNS_TABLE_POSITIONS, PositionPaths } from "features/admin_position/admin_position";
import DropdownButton from "components/DropdownButton/DropdownButton";
import {
  EditOutlined,
  OrderedListOutlined
} from "@ant-design/icons";
import { numberWithCommas } from "helpers/utils.helper";

const PositionScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [search, setSearch] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    positions: { positions },
  } = useAppSelector((state: RootState) => state);
  
  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      search,
    };
    setIsLoading(true);
    dispatch(getPositions(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize, search]);

  const positionList = useMemo(() => {
    return positions?.data?.map((position, index) => ({
      ...position,
      index: index + 1,
      salaryMin: `${numberWithCommas(position.salaryMin)} (VNĐ)`,
      salaryMax: `${numberWithCommas(position.salaryMax)} (VNĐ)`,
      hourlyRate: `${numberWithCommas(position.hourlyRate)} (VNĐ)`,
      action: (
        <DropdownButton
          menuProps={{
            items: [
              {
                key: "1",
                label: (
                  <>
                    <Typography>
                      <span>
                        <EditOutlined />
                      </span>{" "}
                      Edit
                    </Typography>
                  </>
                ),
                onClick: () =>
                  navigate(PositionPaths.EDIT_POSITION(Number(position.id))),
              },
              {
                key: "2",
                label: (
                  <>
                    <Typography style={{maxWidth: 130}}>
                      <span>
                        <OrderedListOutlined />
                      </span>{" "}
                      Decentralize authority
                    </Typography>
                  </>
                ),
                onClick: () =>
                navigate(PositionPaths.DECENTRALIZE_AUTHORITY(Number(position.id)), { state: { positionName: position.name } }),
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [positions?.data, navigate]);

  
  return (
    <div className="pt-30 pl-55 pr-55">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Positions</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-space-between-center">
        <Typography>Total: There are {positions?.totalRecords} positions</Typography>
        <Search
          placeholder="position's name"
          allowClear
          enterButton
          size="large"
          onSearch={(value) => setSearch(value)}
          style={{ width: 350 }}
        />
        <Button
          type="primary"
          style={{ height: 40 }}
          onClick={() => navigate(PositionPaths.CREATE_POSITION())}
        >
          New Position
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_POSITIONS()}
        dataSource={positionList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={positions?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(positions?.totalPages) * 10}
      />
    </div>
  );
};

export default memo(PositionScreen);
