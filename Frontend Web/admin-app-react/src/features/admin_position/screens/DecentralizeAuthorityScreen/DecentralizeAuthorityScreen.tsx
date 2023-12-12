import { memo, useEffect, useMemo, useState } from "react";
import { Breadcrumb, Button, Checkbox, Divider, Modal } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "redux/store";
import {
  PermissionList,
  PositionPaths,
  decentralizeAuthority,
  getPermissionIdListByPositionId,
  getPermissionList,
} from "features/admin_position/admin_position";
import Title from "antd/es/typography/Title";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const DecentralizeAuthorityScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { positionName } = state;

  const [permissionIdListData, setPermissionIdListData] = useState<number[]>(
    []
  );
  const [permissionListData, setPermissionListData] = useState<
    PermissionList[]
  >([]);
  const [checkedPermissionIds, setCheckedPermissionIds] = useState<number[]>(
    []
  );

  const [isDisabled, setIsDisabled] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getPermissionList())
      .unwrap()
      .then((body) => {
        setPermissionListData(body.data);
      });
    dispatch(getPermissionIdListByPositionId(Number(id)))
      .unwrap()
      .then((body) => {
        setPermissionIdListData(body.data);
        setCheckedPermissionIds(body.data);
      });
  }, [dispatch, id]);

  const onChangeCheckAll = (e: CheckboxChangeEvent) => {
    setIsCheckAll(e.target.checked);
    setIsDisabled(!isDisabled);
  };

  const handleDecentralizeAuthority = () => {
    var test: number[] = [];
    if (isCheckAll === true) {
      permissionListData.map((item) => test.push(item.id));
    } else {
      test = checkedPermissionIds;
    }
    setIsSubmitting(true);
    dispatch(decentralizeAuthority({ id: Number(id), listPermissionId: test }))
      .then(() => {
        navigate(PositionPaths.POSITIONS());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsModalOpen(false);
        setIsSubmitting(false);
      });
  };

  const permissionList = useMemo(() => {
    return permissionListData?.map((permission) => {
      var checked = permissionIdListData.includes(permission.id);
      return (
        <div key={permission.id} style={{ width: 300, paddingRight: 50 }}>
          <Checkbox
            defaultChecked={checked}
            value={permission.id}
            disabled={isDisabled}
            onChange={(e: CheckboxChangeEvent) => {
              var checked = e.target.checked;
              if (checked) {
                if (!checkedPermissionIds.includes(permission.id)) {
                  setCheckedPermissionIds([
                    ...checkedPermissionIds,
                    permission.id,
                  ]);
                }
              } else {
                setCheckedPermissionIds(
                  checkedPermissionIds.filter((item) => item !== permission.id)
                );
              }
            }}
          >
            {permission.name}
          </Checkbox>
        </div>
      );
    });
  }, [
    permissionIdListData,
    // permissionListData,
    isDisabled,
    checkedPermissionIds,
  ]);

  return (
    <div className="pt-30 pl-55">
      <Breadcrumb className="pb-10 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(PositionPaths.POSITIONS())}
        >
          Positions
        </Breadcrumb.Item>
        <Breadcrumb.Item>Decentralize Authority</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Title level={5}>Position Id: {id}</Title>
        <Title level={5} style={{ marginTop: 0 }}>
          Position Name: {positionName}
        </Title>
      </div>
      <div className="flex flex-wrap gap-20 pt-30 pl-50">{permissionList}</div>
      <Divider />
      <Checkbox
        className="pb-30 pl-50"
        defaultChecked={isCheckAll}
        onChange={onChangeCheckAll}
      >
        Check all
      </Checkbox>
      <div className="pl-50">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Save
        </Button>
      </div>
      <Modal
        centered
        title="Are you sure ?"
        open={isModalOpen}
        onOk={handleDecentralizeAuthority}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </div>
  );
};
export default memo(DecentralizeAuthorityScreen);
