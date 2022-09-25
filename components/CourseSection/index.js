import { useState } from "react";
import { Form, Input, Button } from "antd";
import dynamic from "next/dynamic";
import { useAudioRecorder } from "@sarafhbk/react-audio-recorder";
import SectionSnippert from "../SectionSnippnet";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMicrophone,
	faPause,
	faStop,
	faPlay,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
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

	const [deleteAudio, SetDeleteAudio] = useState(false);

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
			<motion.div
				initial="hidden"
				animate={{ y: [-100, 8, -4, 4 - 2, 0] }}
				// animate="visible"
				// variants={{
				// 	hidden: {
				// 		scale: 0.8,
				// 		opacity: 0,
				// 	},
				// 	visible: {
				// 		scale: 1,
				// 		opacity: 1,
				// 		transition: {
				// 			delay: 0.4,
				// 		},
				// 	},
				// }}
			>
				<h1 className="text-3xl my-4">Section no #{renderKey + 1}</h1>
				<div
					style={{
						marginTop: "30px",
						padding: "3rem",
						background: "rgba(255, 255, 255, 0.0)",
						borderRadius: "16px",
						boxShadow: "0 4px 30px rgba(0, 0, 0, 0.0)",
						backdropFilter: "blur(1px)",
						webkitBackdropFilter: "blur(5px)",
						border: "1px solid rgba(255, 255, 255, 0.0)",
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

						<div className="md:grid md:grid-cols-2 md:ml-20">
							<div
								style={{
									height: "100%",
									padding: "50px",
									borderRadius: "20px",
									background: "linear-gradient(225deg, #cacaca, #f0f0f0)",
									boxShadow: " 9px 9px 19px #cecece, - 9px - 9px 19px #f2f2f2",
								}}
							>
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
												setSectionAudio("");
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
												setSectionAudio(audioResult);
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
												setSectionAudio("");
											}}
										>
											<FontAwesomeIcon icon={faPause} />
										</span>
										<span
											style={{ cursor: "pointer" }}
											className="p-3"
											onClick={() => {
												resumeRecording();
												setSectionAudio("");
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
			</motion.div>
		</>
	);
};

export default CourseSection;
