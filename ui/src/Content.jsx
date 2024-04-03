import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import EmployeeDetail from "./EmployeeDetail.jsx";
import EmployeeDirectory from "./EmployeeDirectory.jsx";
import EmployeeEdit from "./EmployeeEdit.jsx";

const NotFound = () => <h1>404 Page Not Found</h1>;

export default function Content() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/employeeDirectory" replace />} />
			<Route path="/employeeDirectory" element={<EmployeeDirectory />} />
			<Route path="/detail" element={<EmployeeDetail />} />
			<Route path="/edit/:id" element={<EmployeeEdit />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
