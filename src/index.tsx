import * as esbuild from "esbuild-wasm";
import * as React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [input, setInput] = React.useState<string>("");
    const [code, setCode] = React.useState<string>();

    const startService = async () => {
        await esbuild.initialize({
            wasmURL: "/esbuild.wasm",
        });
        console.log("Service started!");
    };

    React.useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        const result = await esbuild.transform(input, {
            loader: "jsx",
            target: "es2015",
        });
        console.log("result", result);
        setCode(result.code);
    };

    return (
        <>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
