import React from "react";

import Content from "./Content.jsx";

function NavBar() {
	return (
		<nav>
			<a href="/">Home</a>
			{" | "}
			<a href="/#/employees">Employee Directory</a>
			{" | "}
			<a href="/#/detail">Employee Detail</a>
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
