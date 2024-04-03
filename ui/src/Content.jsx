import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import EmployeeDetail from "./EmployeeDetail.jsx";
import EmployeeDirectory from "./EmployeeDirectory.jsx";

const NotFound = () => <h1>404 Page Not Found</h1>;

export default function Content() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/employeeDirectory");
	}, [navigate]);

	return (
		<Routes>
			<Route path="/employeeDirectory" element={<EmployeeDirectory />} />
			<Route path="/detail" element={<EmployeeDetail />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
