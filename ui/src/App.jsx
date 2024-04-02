import React from "react";
import ReactDOM from "react-dom";

// compatibility libs
import "babel-polyfill";
import "whatwg-fetch";

import { EmployeeDirectory } from "./EmployeeDirectory.jsx";

const element = <EmployeeDirectory />;

ReactDOM.render(element, document.getElementById("content"));
