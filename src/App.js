import React from 'react';
import './App.css';
import MessagePanel from './components/MessagePanel/MessagePanel';
import SelectionPanel from './components/SelectionPanel/SelectionPanel';

import apiMain from './utils/api';


function App() {

  const [checkboxQueue, setCheckboxQueue] = React.useState([]);
  const [visibility, setVisibility] = React.useState(false);

  function saveConfis(item) {
    apiMain.saveCongif(item)
    .then((data) => {
    })
    .catch((err)=> console.log(err))
  }

  return (
    <div className="App">
      <SelectionPanel checkboxQueue={checkboxQueue} setCheckboxQueue={setCheckboxQueue} visibility={visibility} setVisibility={setVisibility}/>
      <MessagePanel checkboxQueue={checkboxQueue} setCheckboxQueue={setCheckboxQueue} visibility={visibility} setVisibility={setVisibility} saveConfis={saveConfis}/>
    </div>
  );
}

export default App;
