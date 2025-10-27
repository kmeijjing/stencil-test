import "./App.css";
import { SdButton, SdInput, SdCheckbox } from "@stencil-test/react";

function App() {
 return (
  <>
   <div>
    <h1>Stencil React Components</h1>
    
    <div style={{ margin: '20px 0' }}>
      <SdButton label="Click Me" />
    </div>

    <div style={{ margin: '20px 0' }}>
      <SdInput placeholder="Enter text..." />
    </div>

    <div style={{ margin: '20px 0' }}>
      <SdCheckbox label="Check me" />
    </div>
   </div>
  </>
 );
}

export default App;
