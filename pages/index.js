import React, { useState } from "react";
import { Tabs, Row, Col, Button } from "antd";
import FirstTab from "../components/MainTab/MainTab";
import { data } from "../data";

function App() {
	// const [componentDublicator, setComponentDublicator] = useState([
	// 	<FirstTab key={0} />,
	// ]);
	// let handleAddSection = (e) => {
	// 	e.preventDefault();
	// 	setComponentDublicator([
	// 		...componentDublicator,
	// 		<FirstTab key={componentDublicator.length} />,
	// 	]);
	// };
	return (
		<Row gutter={[0, 10]} className="p-5 bg-slate-400">
			<Col className="gutter-row" md={24}>
				<h1 className="text-3xl">Create Course</h1>
			</Col>

			<Col className="gutter-row" md={20} style={{}}>
				<Tabs
					defaultActiveKey="1"
					items={data.course_menu_header_list.map((data, index) => {
						const id = index + 1;
						return {
							label: <span> {data}</span>,
							key: id,
							children: (
								<>
									{id === 1 && (
										<>
											<FirstTab />
											{/* <Button onClick={handleAddSection}>ADD SECTION</Button> */}
										</>
									)}
									{id === 2 && (
										<h1>
											<FirstTab />
										</h1>
									)}
									{id === 3 && <h1>tab 3 content</h1>}
									{id === 4 && <h1>tab 4 content</h1>}
									{id === 5 && <h1>others</h1>}
								</>
							),
						};
					})}
				/>
			</Col>
		</Row>
	);
}

export default App;
