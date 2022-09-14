import { useState } from 'react'
import { Form, Input, Button } from "antd";
import RecorderControls from "../recorder-controls";
import RecordingsList from "../recordings-list";
import useRecorder from "../../hooks/useRecorder";
import dynamic from "next/dynamic";
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder'
import CourseSection from "../CourseSection";
const ReactMediaRecorder = dynamic(() => import('../VideoRecorder/videoRecorder'), {
    ssr: false,
});


const onFinish = (values) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const sectionValues = (values) => {
    console.log(values)
}

const snippetValues = (values) => {
    console.log(values)
}
// https://course-webite.free.beeceptor.com/my/api/path'
const MainTab = () => {
    const [course, setCourse] = useState({
        course: {
            course_title: '',
            course_desc: '',
            sections: []
        }
    })
    const [state, setState] = useState(false);
    const [componentDublicator, setComponentDublicator] = useState([
        <CourseSection key={0} renderKey={0} sectionValues={sectionValues} snippetValues={snippetValues} />,
    ]);
    let handleAddSection = (e) => {
        setComponentDublicator([
            ...componentDublicator,
            <CourseSection

                key={componentDublicator.length}
                renderKey={componentDublicator.length}
                sectionValues={sectionValues}
                snippetValues={snippetValues}
            />,
        ]);
    };
    const {
        audioResult,
        timer,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        status,
        errorMessage
    } = useAudioRecorder()
    console.log(audioResult, "audioResult")
    return (
        <>
            <div style={{ border: "1px solid black", marginTop: '30px', padding: '3rem', backgroundColor: '#C2C5CD' }}>

                <Form onFinish={onFinish} onFinishFailed={onFinishFailed} >
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




                    <div className='md:grid md:grid-cols-2 md:ml'>
                        <div >
                            <audio controls src={audioResult} style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                // margin: 'auto',
                                objectFit: 'contain'
                            }} />
                            <p>
                                Status : <b>{status}</b>
                            </p>
                            <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                            <div>
                                <Button style={{ cursor: 'pointer' }} className="p-1" onClick={startRecording}>Start</Button>
                                <Button style={{ cursor: 'pointer' }} className="p-1" onClick={stopRecording}>Stop</Button>
                                <Button style={{ cursor: 'pointer' }} className="p-1" onClick={pauseRecording}>Pause</Button>
                                <Button style={{ cursor: 'pointer' }} className="p-1" onClick={resumeRecording}>Resume</Button>
                            </div>
                        </div>
                        <div className="pl-5">
                            <ReactMediaRecorder />
                        </div>
                    </div>



                    <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>


                </Form>
                <div className="">
                    {state && componentDublicator}
                    <div className='mt-5'>

                        <Button
                            onClick={() => {
                                setState(true)
                                if (state) {

                                    handleAddSection();
                                }
                            }}

                        >
                            Add Section
                        </Button>
                    </div>

                </div>
            </div>


        </>
    )
}

export default MainTab