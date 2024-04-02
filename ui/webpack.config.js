const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/App.jsx",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "app.bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: "babel-loader",
			},
		],
	},
};
