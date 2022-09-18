import { useState } from 'react'
import { Form, Input, Button, Alert } from "antd";
import RecorderControls from "../recorder-controls";
import RecordingsList from "../recordings-list";
import useRecorder from "../../hooks/useRecorder";
import dynamic from "next/dynamic";
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder'
import CourseSection from "../CourseSection";
const ReactMediaRecorder = dynamic(() => import('../VideoRecorder/videoRecorder'), {
    ssr: false,
});





const MainTab = () => {

    const [sections, setSection] = useState([])
    const [snippets, setSnippets] = useState([])

    const [courseAudio, setCourseAudio] = useState([])
    const [sectionAudio, setSectionAudio] = useState([])
    const [snippetAudio, setSnippetAudio] = useState()

    const [courseVideo, setCourseVideo] = useState()
    const [sectionVideo, setSectionVideo] = useState([])
    const [snippetVideo, setSnippetVideo] = useState([])

    const [state, setState] = useState(false);
    const sectionValues = (values) => {
        setSection((preState) => {
            return [...preState, values]
        })
    }
    console.log(sections)

    const snippetValues = (values) => {
        setSnippets((preState) => {
            return [...preState, values]
        })
    }
    const [componentDublicator, setComponentDublicator] = useState([
        <CourseSection
            key={0}
            renderKey={0}
            sectionValues={sectionValues}
            snippetValues={snippetValues}
            setSectionAudio={setSectionAudio}
            setSectionVideo={setSectionVideo}
            setSnippetAudio={setSnippetAudio}
            setSnippetVideo={setSnippetVideo}
        />,
    ]);
    const onFinish = async (values) => {

        // setSectionVideo((pre) => {
        //     return [{ ...pre, sectionVideo }]
        // })
        // setSnippetVideo((pre) => {
        //     return [...pre, snippetVideo]
        // })
        console.log({ values, sections, snippets, courseAudio, courseVideo, sectionAudio, snippetAudio, sectionVideo, snippetVideo })
    };


    console.log(snippets)


    let handleAddSection = (e) => {
        setComponentDublicator([
            ...componentDublicator,
            <CourseSection
                key={componentDublicator.length}
                renderKey={componentDublicator.length}
                sectionValues={sectionValues}
                snippetValues={snippetValues}
                setSectionAudio={setSectionAudio}
                setSectionVideo={setSectionVideo}
                setSnippetAudio={setSnippetAudio}
                setSnippetVideo={setSnippetVideo}
            />,
        ]);
    };

    const { audioResult, timer, startRecording, stopRecording, pauseRecording, resumeRecording, status, } = useAudioRecorder()
    // if (courseAudio) {
    //     setCourseAudio((pre) => { return [...pre, courseAudio] })
    // }
    // if (sectionAudio) {
    //     setSectionAudio((pre) => { return [...pre, sectionAudio] })
    // }
    // if (snippetAudio) {
    //     setSnippetAudio((pre) => { return [...pre, snippetAudio] })
    // }

    return (
        <>
            <div style={{ border: "1px solid black", marginTop: '30px', padding: '3rem', backgroundColor: '#C2C5CD' }}>

                <Form onFinish={onFinish} >
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
                        name="course_desc"
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
                                objectFit: 'contain'
                            }} />
                            <p>
                                Status : <b>{status}</b>
                            </p>
                            <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                            <div>
                                <Button style={{ cursor: 'pointer' }} className="p-1" onClick={() => {

                                    startRecording()
                                    setCourseAudio('')
                                }
                                }
                                >
                                    Start</Button>
                                <Button style={{ cursor: 'pointer' }} className="p-1" onClick={() => {

                                    stopRecording();
                                    setCourseAudio(audioResult);

                                }}>Stop</Button>
                                <Button style={{ cursor: 'pointer' }} className="p-1" onClick={() => {

                                    pauseRecording()
                                    setCourseAudio('')
                                }
                                }>Pause</Button>
                                <Button style={{ cursor: 'pointer' }} className="p-1" onClick={() => {

                                    resumeRecording()
                                    setCourseAudio('')
                                }
                                }>Resume</Button>
                            </div>
                        </div>
                        <div className="pl-5" >
                            <ReactMediaRecorder
                                setCourseVideo={setCourseVideo}
                                parentCaller={"course"}
                            />
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