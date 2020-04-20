import React, { useState, useEffect } from "react";


function App() {
  const [count, setCount] = useState(0);
  const [data, refreshData] = useState([{name: 'ivan', sex: 'male'}]);

  useEffect(()=>{
      console.log(Math.random());
  })
  return (
    <div className='px-5 py-5 bg-light'>
      <p>Вы кликнули {count} раз</p>,
      <button onClick={() => setCount(count + 1)}>Push me</button>
      <div>
         
          {data.map(item => {return ( 
              <div>Name: {item.name} sex: {item.sex}</div>
              )
              })}
          <button onClick={()=>refreshData(data=>([...data,{name:'fff',sex:'female'}]))}>Add data</button>
      </div>
    </div>
  );
}

export default App;
