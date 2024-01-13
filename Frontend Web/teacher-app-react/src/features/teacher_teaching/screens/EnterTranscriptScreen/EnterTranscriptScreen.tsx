import { Breadcrumb, Button, InputNumber, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { TeachingPaths } from "features/teacher_teaching/constants/teaching.paths";
import { RootState } from "redux/root-reducer";
import { getAllStudentsInClass } from "features/teacher_users/redux/users.slice";
import TextArea from "antd/es/input/TextArea";
import { enterTranscript } from "features/teacher_teaching/redux/teaching.slice";
import { Transcript } from "features/teacher_teaching/teaching.types";
import { StudentNameAndId } from "features/teacher_users/teacher_users";

const EnterTranscriptScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [nameOfTest, setNameOfTest] = useState<string | null>(null);
  const [totalPoint, setTotalPoint] = useState<number | null>(null);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    users: { allStudents },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllStudentsInClass(Number(id)))
      .unwrap()
      .then((body) => {
        body.data.map((studentTranscript: StudentNameAndId) => {
            transcripts.push({
                studentId: studentTranscript.id,
                point: 0
            });
          }  
        )
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const updateStudentTranscript = (studentId: number, point: number | null) => {
    const index = transcripts.findIndex((transcript) => transcript.studentId === studentId);
    transcripts[index] = {studentId, point}
  };

  const transcriptStudentList = useMemo(() => {
    return allStudents?.data.map((student, index) => {
      return (
        <div key={student.id} className="mb-20 gap-10 flex-align-center">
          <Typography style={{ width: 300 }}>
            {index + 1}. {student.firstName} {student.lastName} (Id:{" "}
            {student.id} )
          </Typography>
          <InputNumber min={0} defaultValue={0} onChange={(value: number | null) => {
            updateStudentTranscript(student.id, value)
          }}/>
          <Typography>point</Typography>
        </div>
      );
    });
  }, [allStudents?.data]);

  const onChangeNameOfTest = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNameOfTest(e.target.value);
  };

  const onChangeTotalPoint = (value: number | null) => {
    setTotalPoint(value);
  };

  const handleEnterTranscript = () => {
    if (nameOfTest === null || totalPoint === null) {
      return;
    }
    setIsSubmitting(true);
    console.log(transcripts)
    var newTranscripts = [];
    newTranscripts = transcripts.slice(0,Math.ceil(transcripts.length / 2))
    dispatch(
      enterTranscript({
        name: nameOfTest,
        totalPoint,
        transcripts: newTranscripts,
      })
    )
      .unwrap()
      .finally(() => {
        setIsSubmitting(false);
        navigate(TeachingPaths.CLASSES());
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pl-55 pt-30 pb-20">
      <Breadcrumb className="pb-30 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TeachingPaths.CLASSES())}
        >
          Classes
        </Breadcrumb.Item>
        <Breadcrumb.Item>Enter Transcript</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-wrap">
        <div className="mr-100 mb-20">
          <div className="mb-10">
            <Typography className="mb-10">Name of test: </Typography>
            <TextArea
              style={{ minWidth: 350 }}
              allowClear
              onChange={onChangeNameOfTest}
            />
          </div>
          <div>
            <Typography className="mb-10">Total point: </Typography>
            <InputNumber min={0} onChange={onChangeTotalPoint} />
          </div>
        </div>
        <div>{transcriptStudentList}</div>
      </div>
      <div>
        <Button
          type="primary"
          onClick={handleEnterTranscript}
          disabled={nameOfTest === null || totalPoint === null || isSubmitting}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default memo(EnterTranscriptScreen);
