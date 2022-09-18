import { useState } from "react";
import { Form, Input, Button } from "antd";
import dynamic from "next/dynamic";
import { useAudioRecorder } from "@sarafhbk/react-audio-recorder";
import SectionSnippert from "../SectionSnippnet";
const ReactMediaRecorder = dynamic(
	() => import("../VideoRecorder/videoRecorder"),
	{
		ssr: false,
	}
);

const CourseSection = ({
	renderKey,
	sectionValues,
	snippetValues,
	setSectionAudio,
	setSectionVideo,
	setSnippetAudio,
	setSnippetVideo,
}) => {
	const [state, setState] = useState(false);
	const [componentDublicator, setComponentDublicator] = useState([
		<SectionSnippert
			key={0}
			renderKey={0}
			snippetValues={snippetValues}
			setSnippetAudio={setSnippetAudio}
			setSnippetVideo={setSnippetVideo}
		/>,
	]);
	let handleAddSection = (e) => {
		setComponentDublicator([
			...componentDublicator,
			<SectionSnippert
				key={componentDublicator.length}
				renderKey={componentDublicator.length}
				snippetValues={snippetValues}
				setSnippetAudio={setSnippetAudio}
				setSnippetVideo={setSnippetVideo}
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
		errorMessage,
	} = useAudioRecorder();
	return (
		<>
			<h1 className="text-3xl my-4">Section no #{renderKey + 1}</h1>
			<div
				style={{
					border: "1px solid black",
					marginTop: "30px",
					padding: "3rem",
					backgroundColor: "#A6ADBA",
				}}
			>
				<Form onFinish={sectionValues}>
					<Form.Item
						label="section Title"
						name={`section_title_${renderKey + 1}`}
						rules={[
							{
								required: true,
								message: "Please input your section Title!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="section number"
						name={`section_number_${renderKey + 1}`}
						rules={[
							{
								required: true,
								message: "Please input your section number!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="section Desc."
						name={`section_desc_${renderKey + 1}`}
						rules={[
							{
								required: true,
								message: "Please input your section Desc.!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<div className="md:grid md:grid-cols-2 md:ml">
						<div>
							<audio
								controls
								src={audioResult}
								style={{
									maxHeight: "100%",
									maxWidth: "100%",
									objectFit: "contain",
								}}
							/>

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
											startRecording();
											setSectionAudio("");
										}}
									>
										Start
									</Button>
									<Button
										style={{ cursor: "pointer" }}
										className="p-1"
										onClick={() => {
											stopRecording();
											setSectionAudio(audioResult);
										}}
									>
										Stop
									</Button>
									<Button
										style={{ cursor: "pointer" }}
										className="p-1"
										onClick={() => {
											pauseRecording();
											setSectionAudio("");
										}}
									>
										Pause
									</Button>
									<Button
										style={{ cursor: "pointer" }}
										className="p-1"
										onClick={() => {
											resumeRecording();
											setSectionAudio("");
										}}
									>
										Resume
									</Button>
								</div>
							</div>
						</div>
						<div className="pl-5">
							<ReactMediaRecorder
								setSectionVideo={setSectionVideo}
								parentCaller={"course_section"}
							/>
						</div>
					</div>

					<Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
						<Button htmlType="submit">Submit</Button>
					</Form.Item>
				</Form>
				<div className="-mt-10 ">
					{state && componentDublicator}
					<div className="mt-5">
						<Button
							onClick={() => {
								setState(true);
								if (state) {
									handleAddSection();
								}
							}}
						>
							Add snippet
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseSection;
