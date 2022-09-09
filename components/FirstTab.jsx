
import { Tabs, Row, Col, Form, Input, Button } from "antd";
import RecorderControls from "../components/recorder-controls";
import RecordingsList from "../components/recordings-list";
import useRecorder from "../hooks/useRecorder";


const onChange = (key) => {
    console.log(key);
};
const onFinish = (values) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};


const FirstTab = () => {
    const { recorderState, ...handlers } = useRecorder();
    const { audio } = recorderState;
    return (
        <>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="Course Title"
                    name="course_title"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Course Title!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Course Desc."
                    name="course_esc"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Course Desc.!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>






                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
            <RecorderControls
                recorderState={recorderState}
                handlers={handlers}
            />
            <RecordingsList audio={audio} />

        </>
    )
}

export default FirstTab