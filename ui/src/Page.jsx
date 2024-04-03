import React from "react";
import { NavLink } from "react-router-dom";

import Content from "./Content.jsx";

function NavBar() {
	return (
		<nav>
			<NavLink to="/">Home</NavLink>
			{" | "}
			<NavLink to="/employeeDirectory">Employee Directory</NavLink>
			{" | "}
			<NavLink to="/detail">Employee Detail</NavLink>
		</nav>
	);
}

export default function Page() {
	return (
		<div>
			<NavBar />
			<Content />
		</div>
	);
}
