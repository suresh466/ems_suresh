const HelloWorld = () => (
    <div title="outer-div">
        <h1>Hello, World! dynamically from different file</h1>
    </div>
    );

ReactDOM.render(<HelloWorld />, document.getElementById('content'));