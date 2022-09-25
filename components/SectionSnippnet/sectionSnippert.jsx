import { Form, Input, Button } from "antd";
import dynamic from "next/dynamic";
import { useAudioRecorder } from "@sarafhbk/react-audio-recorder";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPause, faStop, faPlay,faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
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
    const [deleteAudio, SetDeleteAudio] = useState(false);

    return (
        <>
            <motion.div

                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {
                        scale: 0.8,
                        opacity: 0,
                    },
                    visible: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            delay: 0.4,
                        },

                    },
                    KeyframeEffect
                }}
            >

                <h1 className="text-3xl my-4">Snippet no# {renderKey + 1}</h1>
                <div style={{
                    marginTop: '30px', padding: '3rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(5px)',
                    webkitBackdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',

                }}>
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

                        <div className="md:grid md:grid-cols-2 md:ml-20" >

                            <div style={{
                                height: '100%',
                                padding: '50px',
                                borderRadius: '20px',
                                background: 'linear-gradient(225deg, #cacaca, #f0f0f0)',
                                boxShadow: " 9px 9px 19px #cecece, - 9px - 9px 19px #f2f2f2"
                            }}>

                                <p>
                                    Status : <b>{status}</b>
                                </p>

                                <div>
                                    <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                                    <div>
                                        <span
                                            style={{ cursor: "pointer" }}
                                            className="p-3"
                                            onClick={() => {
                                                startRecording();
                                                setSnippetAudio("")
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faMicrophone} />
                                        </span>
                                        <button
                                            style={{ cursor: "pointer" }}
                                            className="p-3"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                stopRecording();
                                                setSnippetAudio(audioResult)
                                                SetDeleteAudio(true);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faStop} />
                                        </button>
                                        <span
                                            style={{ cursor: "pointer" }}
                                            className="p-3"
                                            onClick={() => {

                                                pauseRecording();
                                                setSnippetAudio("")
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPause} />
                                        </span>
                                        <span
                                            style={{ cursor: "pointer" }}
                                            className="p-3"
                                            onClick={() => {
                                                resumeRecording();
                                                setSnippetAudio("")
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlay} />
                                        </span>
                                        {audioResult.length && deleteAudio ? (
                                            <>
                                                <div className="flex justify-between">
                                                    <audio
                                                        className="mt-3"
                                                        controls
                                                        src={audioResult}
                                                        style={{
                                                            maxHeight: "100%",
                                                            maxWidth: "100%",
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                    <div className=" pt-4">
                                                        <FontAwesomeIcon
                                                            style={{ cursor: "pointer" }}
                                                            icon={faTrash}
                                                            onClick={() => {
                                                                SetDeleteAudio(false);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
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

                        <Form.Item >
                            <Button htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </motion.div>
        </>
    );
};

export default SectionSnippert;
