import {
    Breadcrumb,
    Table,
    Typography,
  } from "antd";
  import { memo, useEffect, useMemo, useState } from "react";
  import { useAppDispatch, useAppSelector } from "redux/store";
  import { useNavigate } from "react-router-dom";
  import { RootState } from "redux/root-reducer";
  import { HomeOutlined } from "@ant-design/icons";
  import { numberWithCommas } from "helpers/utils.helper";
import { TopPaths } from "features/student_top/student_top";
import { COLUMNS_TABLE_TUITION_DEBT } from "features/student_finance/student_finance";
import { getMyTuitionDebtInformations } from "features/student_finance/redux/finance.slice";
  
  const TuitionDebtScreen = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
  
    const {
      finance: { tuitionDebts },
    } = useAppSelector((state: RootState) => state);
  
    const tuitionDebtList = useMemo(() => {
      return tuitionDebts?.data?.map((tuitionDebt, index) => ({
        ...tuitionDebts,
        ...tuitionDebt.classInfo,
        index: index + 1,
        credit: `${numberWithCommas(tuitionDebt.classInfo.credit)} VNĐ`,
      }));
    }, [tuitionDebts]);
  
    useEffect(() => {
      setIsLoading(true);
      dispatch(getMyTuitionDebtInformations())
        .unwrap()
        .finally(() => setIsLoading(false));
    }, [dispatch]);

    useEffect(() => {
        tuitionDebts?.data.forEach((item) => {
            setTotal(total + item.classInfo.credit)
        })
      }, [tuitionDebts]);
  
    return (
      <>
        <div className="pt-30 pl-55 pr-60">
          <Breadcrumb className="pb-20 font-18">
            <Breadcrumb.Item
              className="cursor-pointer"
              onClick={() => navigate(TopPaths.TOP())}
            >
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>My Tuition Debt Infomation</Breadcrumb.Item>
          </Breadcrumb>
          <Table
            bordered
            rowKey="id"
            size="small"
            loading={isLoading}
            columns={COLUMNS_TABLE_TUITION_DEBT()}
            dataSource={tuitionDebtList}
            pagination={false}
            className="mt-20"
            scroll={{ y: 320, x: 400 }}
          />
          <Typography className="pt-20">Total tuition debt: {numberWithCommas(total)} VNĐ</Typography>
        </div>
      </>
    );
  };
  
  export default memo(TuitionDebtScreen);
  