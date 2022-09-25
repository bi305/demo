import { useState } from 'react'
import { Form, Input, Button, Alert } from "antd";
import dynamic from "next/dynamic";
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder'
import CourseSection from "../CourseSection";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPause, faStop, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';

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

    const [deleteAudio, SetDeleteAudio] = useState(false)

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


            />
            ,
        ]);
    };
    const deleteSection = () => { }
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
            }}
        >
            <div style={{
                marginTop: '30px', padding: '3rem',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)',
                webkitBackdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',

            }}>

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




                    <div className='md:grid md:grid-cols-2 md:ml-20 mt-20'  >
                        <div style={{
                            height: '100%',
                            padding: '50px',
                            borderRadius: '20px',
                            background: 'linear-gradient(225deg, #cacaca, #f0f0f0)',
                            boxShadow: " 9px 9px 19px #cecece, - 9px - 9px 19px #f2f2f2"
                        }} >

                            <p>
                                Status : <b>{status}</b>
                            </p>
                            <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                            <div>
                                <span style={{ cursor: 'pointer', }} className="p-3" onClick={() => {

                                    startRecording()
                                    setCourseAudio('')
                                }
                                }
                                >
                                    <FontAwesomeIcon icon={faMicrophone} />
                                </span>
                                <button disabled={status === 'idle'} style={{ cursor: 'pointer', }} className="p-3" onClick={(e) => {
                                    e.preventDefault()
                                    stopRecording();
                                    setCourseAudio();
                                    SetDeleteAudio(true)

                                }}>
                                    <FontAwesomeIcon icon={faStop} />

                                </button>
                                <span style={{ cursor: 'pointer', }} className="p-3" onClick={() => {

                                    pauseRecording()
                                    setCourseAudio('')
                                }
                                }>
                                    <FontAwesomeIcon icon={faPause} />

                                </span>
                                <span style={{ cursor: 'pointer', }} className="p-3" onClick={() => {

                                    resumeRecording()
                                    setCourseAudio('')
                                }
                                }>
                                    <FontAwesomeIcon icon={faPlay} />
                                </span>
                                {audioResult.length && deleteAudio ?
                                    <><div className='flex justify-between'>

                                        <audio className='mt-3' controls src={audioResult} style={{
                                            maxHeight: '100%',
                                            maxWidth: '100%',
                                            objectFit: 'contain'
                                        }} />
                                        <div className=" pt-4">

                                            <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faTrash} onClick={() => {
                                                SetDeleteAudio(false)
                                                audioResult = false
                                            }} />
                                        </div>
                                    </div>
                                    </>
                                    : ''
                                }
                            </div>
                        </div>
                        <div className="pl-5" >
                            <ReactMediaRecorder
                                setCourseVideo={setCourseVideo}
                                parentCaller={"course"}
                            />
                        </div>
                    </div>



                    <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }} >
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
            </div >
        </motion.div >


    )
}

export default MainTab