import React, { useState } from "react";
import { Tabs, Row, Col, Button } from "antd";
import FirstTab from "../components/MainTab/MainTab";
import { data } from "../data";

function App() {
	return (
		<div
			className="p-5 "
			style={{
				height: "100%",
				background: "linear-gradient(320deg,#f27121,#e94057,#8a2387)",
			}}
		>
			<Row gutter={[0, 10]} className="p-5 ">
				<Col className="gutter-row" md={24}>
					<h1 className="text-8xl font-bold">Create Course</h1>
				</Col>

				<Col className="gutter-row" md={24} style={{}}>
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
											</>
										)}
										{id === 2 && (
											<div style={{ height: "100vh" }}>
												{" "}
												<h1>{/* <FirstTab /> */}</h1>
											</div>
										)}
										{id === 3 && (
											<div style={{ height: "100vh" }}>
												{" "}
												<h1>tab 3 content</h1>
											</div>
										)}
										{id === 4 && (
											<div style={{ height: "100vh" }}>
												{" "}
												<h1>tab 4 content</h1>
											</div>
										)}
										{id === 5 && (
											<div style={{ height: "100vh" }}>
												{" "}
												<h1>others</h1>
											</div>
										)}
									</>
								),
							};
						})}
					/>
				</Col>
			</Row>
		</div>
	);
}

export default App;
