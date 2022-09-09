import React from "react";
import { Tabs, Row, Col} from "antd";
import FirstTab from "../components/FirstTab";
import { data } from "../data";
 

const onChange = (key) => {
	console.log(key);
};
 

function App() {
	 
	return (
		<Row>
			<Col span={24}>
				<h1>Create Course</h1>
			</Col>
		 
			<Col span={20}>
				<Tabs
					defaultActiveKey="1"
					onChange={onChange}
					items={data.course_menu_header_list.map((data, index) => {
						const id = index + 1;
						return {
							label: <span> {data}</span>,
							key: id,
							children: (
								<>
									{id === 1 && <FirstTab />}
									{id === 2 && (
										<h1>
											<FirstTab />
										</h1>
									)}
									{id === 3 && <h1>tab 3 content</h1>}
									{id === 4 && <h1>tab 4 content</h1>}
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
