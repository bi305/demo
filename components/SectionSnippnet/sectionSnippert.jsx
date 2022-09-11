
import { useState } from "react";
import { Form, Input, Button } from "antd";
import dynamic from "next/dynamic";
import { useAudioRecorder } from "@sarafhbk/react-audio-recorder";
const ReactMediaRecorder = dynamic(
    () => import("../VideoRecorder/videoRecorder"),
    {
        ssr: false,
    }
);

const onFinish = (values) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const SectionSnippert = ({ renderKey }) => {
    const {
        audioResult,
        timer,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        status,
        errorMessage,
    } = useAudioRecorder();
    return (
        <>
            <h1 className="text-3xl my-4">Snippet no# {renderKey + 1}</h1>
            <div style={{ border: "1px solid black", marginTop: '30px', padding: '3rem', backgroundColor: "#65737E" }}>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                >
                    <Form.Item
                        label="Word Meaning"
                        name={`section_title_${renderKey}`}
                        rules={[
                            {
                                required: true,
                                message: "Please input your section Title!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <div className="flex md:ml-20 sm:ml-0">
                        <div className="w-96">
                            <div>
                                <audio controls src={audioResult} />
                                <p>
                                    Status : <b>{status}</b>
                                </p>

                                <div>
                                    <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                                    <div>
                                        <Button
                                            style={{ cursor: "pointer" }}
                                            className="p-1"
                                            onClick={startRecording}
                                        >
                                            Start
                                        </Button>
                                        <Button
                                            style={{ cursor: "pointer" }}
                                            className="p-1"
                                            onClick={stopRecording}
                                        >
                                            Stop
                                        </Button>
                                        <Button
                                            style={{ cursor: "pointer" }}
                                            className="p-1"
                                            onClick={pauseRecording}
                                        >
                                            Pause
                                        </Button>
                                        <Button
                                            style={{ cursor: "pointer" }}
                                            className="p-1"
                                            onClick={resumeRecording}
                                        >
                                            Resume
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-52">
                            <ReactMediaRecorder />
                        </div>
                    </div>

                    <Form.Item>
                        <Button htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default SectionSnippert;
