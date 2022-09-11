import React from 'react'
import {

    useRecordWebcam,
    CAMERA_STATUS
} from "react-record-webcam";
import { Button, Dropdown, Menu,   } from 'antd';
const OPTIONS = {
    filename: "test-filename",
    fileType: "mp4",
    width: 400,
    height: 400
};

const videoRecorder = () => {
    const recordWebcam = useRecordWebcam(OPTIONS);
    const getRecordingFileHooks = async () => {
        const blob = await recordWebcam.getRecording();
        console.log({ blob });
    };

    const getRecordingFileRenderProp = async (blob) => {
        console.log({ blob });
    };
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <button
                            disabled={
                                recordWebcam.status === CAMERA_STATUS.OPEN ||
                                recordWebcam.status === CAMERA_STATUS.RECORDING ||
                                recordWebcam.status === CAMERA_STATUS.PREVIEW
                            }
                            onClick={recordWebcam.open}
                        >
                            Open camera
                        </button>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <button
                            disabled={
                                recordWebcam.status === CAMERA_STATUS.CLOSED ||
                                recordWebcam.status === CAMERA_STATUS.PREVIEW
                            }
                            onClick={recordWebcam.close}
                        >
                            Close camera
                        </button>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <button
                            disabled={
                                recordWebcam.status === CAMERA_STATUS.CLOSED ||
                                recordWebcam.status === CAMERA_STATUS.RECORDING ||
                                recordWebcam.status === CAMERA_STATUS.PREVIEW
                            }
                            onClick={recordWebcam.start}
                        >
                            Start recording
                        </button>
                    ),
                },
                {
                    key: '4',
                    label: (

                        <button
                            disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
                            onClick={recordWebcam.stop}
                        >
                            Stop recording
                        </button>
                    ),
                }, {
                    key: '5',
                    label: (
                        <button
                            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                            onClick={recordWebcam.retake}
                        >
                            Retake
                        </button>
                    ),
                }, {
                    key: '6',
                    label: (
                        <button
                            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                            onClick={recordWebcam.download}
                        >
                            Download
                        </button>
                    ),
                }, {
                    key: '7',
                    label: (
                        <button
                            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                            onClick={getRecordingFileHooks}
                        >
                            Get recording
                        </button>
                    ),
                },
            ]}
        />
    );
    return (
        <div>

            <div>
                <p>Camera status: {recordWebcam.status}</p>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button>Video Options</Button>
                </Dropdown>


                <video
                    ref={recordWebcam.webcamRef}
                    style={{
                        display: `${recordWebcam.status === CAMERA_STATUS.OPEN ||
                            recordWebcam.status === CAMERA_STATUS.RECORDING
                            ? "block"
                            : "none"
                            }`
                    }}
                    autoPlay
                    muted
                />
                <video
                    ref={recordWebcam.previewRef}
                    style={{
                        display: `${recordWebcam.status === CAMERA_STATUS.PREVIEW ? "block" : "none"
                            }`
                    }}
                    controls
                />
            </div>
        </div>
    )
}

export default videoRecorder