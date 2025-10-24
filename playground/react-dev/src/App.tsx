import "./App.css";
import { MyComponent, SdButton } from "@stencil-test/react";

function App() {
 return (
  <>
   <div>
    <MyComponent first="Hello" middle="the121212re" last="World" />

    <SdButton label="Click Me" />
   </div>
  </>
 );
}

export default App;
