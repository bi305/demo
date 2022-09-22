import React from 'react'
import {

    useRecordWebcam,
    CAMERA_STATUS
} from "react-record-webcam";
import { Button, Dropdown, Menu, } from 'antd';
import { faCamera, faRecordVinyl, faVideo, faStopwatch, faDownload, faTrashRestoreAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const OPTIONS = {
    filename: "test-filename",
    fileType: "mp4",
    width: 400,
    height: 400
};

const videoRecorder = ({ parentCaller, setCourseVideo, setSectionVideo, setSnippetVideo }) => {
    const recordWebcam = useRecordWebcam(OPTIONS);
    const getRecordingFileHooks = async () => {
        const blob = await recordWebcam.getRecording();
        console.log({ blob });
        if (parentCaller === "course") {
            setCourseVideo(blob)
        }
        if (parentCaller === "course_section") {
            setSectionVideo(blob)
        }
        if (parentCaller === "section_snippet") {
            setSnippetVideo(blob)
        }

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
                    key: '2',
                    label: (

                        <button
                            disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
                            onClick={recordWebcam.stop}
                        >
                            Stop recording
                        </button>
                    ),
                }, {
                    key: '3',
                    label: (
                        <button
                            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                            onClick={recordWebcam.retake}
                        >
                            Retake
                        </button>
                    ),
                }, {
                    key: '4',
                    label: (
                        <button
                            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                            onClick={recordWebcam.download}
                        >
                            Download
                        </button>
                    ),
                }, {
                    key: '5',
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
        <>

            <div style={{
                height: '100%',
                padding: '50px',
                borderRadius: '20px',
                background: 'linear-gradient(225deg, #cacaca, #f0f0f0)',
                boxShadow: " 9px 9px 19px #cecece, - 9px - 9px 19px #f2f2f2"
            }}>
                <p>Camera status: {recordWebcam.status}</p>
                {/* 
                <div style={{ cursor: 'pointer' }}
                    disabled={
                        recordWebcam.status === CAMERA_STATUS.OPEN ||
                        recordWebcam.status === CAMERA_STATUS.RECORDING ||
                        recordWebcam.status === CAMERA_STATUS.PREVIEW
                    }
                    onClick={recordWebcam.open}
                >
                    Open camera
                </div>
                <div style={{ cursor: 'pointer' }}
                    disabled={
                        recordWebcam.status === CAMERA_STATUS.CLOSED ||
                        recordWebcam.status === CAMERA_STATUS.PREVIEW
                    }
                    onClick={recordWebcam.close}
                >
                    Close camera
                </div>
                <Dropdown overlay={menu} placement="top">
                    <Button>Video Options</Button>
                </Dropdown> */}
                <div>
                    <span className='p-2' style={{ cursor: 'pointer' }}
                        disabled={
                            recordWebcam.status === CAMERA_STATUS.OPEN ||
                            recordWebcam.status === CAMERA_STATUS.RECORDING ||
                            recordWebcam.status === CAMERA_STATUS.PREVIEW
                        }
                        onClick={recordWebcam.open}
                    >
                        Open <FontAwesomeIcon icon={faCamera} />
                    </span>
                    <span className='p-2' style={{ cursor: 'pointer' }}
                        disabled={
                            recordWebcam.status === CAMERA_STATUS.CLOSED ||
                            recordWebcam.status === CAMERA_STATUS.PREVIEW
                        }
                        onClick={recordWebcam.close}
                    >
                        Close <FontAwesomeIcon icon={faVideo} />
                    </span>
                    <span className='p-2' style={{ cursor: 'pointer' }}
                        disabled={
                            recordWebcam.status === CAMERA_STATUS.CLOSED ||
                            recordWebcam.status === CAMERA_STATUS.RECORDING ||
                            recordWebcam.status === CAMERA_STATUS.PREVIEW
                        }
                        onClick={recordWebcam.start}
                    >
                        Start <FontAwesomeIcon icon={faStopwatch} />
                    </span>
                    <span className='p-2' style={{ cursor: 'pointer' }}
                        disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
                        onClick={recordWebcam.stop}
                    >
                        Stop  <FontAwesomeIcon icon={faRecordVinyl} />

                    </span>
                    <span className='p-2' style={{ cursor: 'pointer' }}
                        disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                        onClick={recordWebcam.retake}
                    >
                        Retake <FontAwesomeIcon icon={faTrashRestoreAlt} />
                    </span>

                    <span className='p-2' style={{ cursor: 'pointer' }}
                        disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                        onClick={getRecordingFileHooks}
                    >
                        recording <FontAwesomeIcon icon={faDownload} />
                    </span>
                </div>

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
        </ >
    )
}

export default videoRecorder