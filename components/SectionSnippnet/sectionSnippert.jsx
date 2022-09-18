
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



const SectionSnippert = ({ renderKey, snippetValues, setSnippetAudio, setSnippetVideo, }) => {
    const {
        audioResult,
        timer,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        status,

    } = useAudioRecorder();
    return (
        <>
            <h1 className="text-3xl my-4">Snippet no# {renderKey + 1}</h1>
            <div style={{ border: "1px solid black", marginTop: '30px', padding: '3rem', backgroundColor: "#65737E" }}>
                <Form
                    onFinish={snippetValues}

                >
                    <Form.Item
                        label="Word Meaning"
                        name={`snippet_${renderKey + 1}`}
                        rules={[
                            {
                                required: true,
                                message: "Please input your section Title!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <div className="md:grid md:grid-cols-2 md:ml">

                        <div>
                            <audio controls src={audioResult} style={{
                                maxHeight: "100%",
                                maxWidth: "100%",
                                objectFit: "contain",
                            }} />
                            <p>
                                Status : <b>{status}</b>
                            </p>

                            <div>
                                <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                                <div>
                                    <Button
                                        style={{ cursor: "pointer" }}
                                        className="p-1"
                                        onClick={() => {
                                            startRecording;
                                            setSnippetAudio("")
                                        }}
                                    >
                                        Start
                                    </Button>
                                    <Button
                                        style={{ cursor: "pointer" }}
                                        className="p-1"
                                        onClick={() => {
                                            stopRecording;
                                            setSnippetAudio(audioResult)
                                        }}
                                    >
                                        Stop
                                    </Button>
                                    <Button
                                        style={{ cursor: "pointer" }}
                                        className="p-1"
                                        onClick={() => {
                                            pauseRecording;
                                            setSnippetAudio("")
                                        }}
                                    >
                                        Pause
                                    </Button>
                                    <Button
                                        style={{ cursor: "pointer" }}
                                        className="p-1"
                                        onClick={() => {
                                            resumeRecording;
                                            setSnippetAudio("")
                                        }}
                                    >
                                        Resume
                                    </Button>
                                </div>
                            </div>
                        </div>


                        <div className="pl-5">
                            <ReactMediaRecorder
                                setSnippetVideo={setSnippetVideo}
                                parentCaller={"section_snippet"}
                            />
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
