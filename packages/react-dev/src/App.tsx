import "./App.css";
import { MyComponent } from "@stencil-test/react";

function App() {
 return (
  <>
   <div>
    <MyComponent first="Hello" middle="there" last="World" />
   </div>
  </>
 );
}

export default App;
