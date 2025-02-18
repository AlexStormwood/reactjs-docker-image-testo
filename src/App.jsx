import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {

    const fetchData = async () => {
      let targetUrl = "";
      if (import.meta.env.DEV) {
        targetUrl = "http://localhost:5000"
      } else {
        targetUrl = `http://${import.meta.env.VITE_BACKEND_CONTAINER_NAME}:${import.meta.env.VITE_BACKEND_CONTAINER_PORT}/`;
      }

      let response = null;
      
      response = await fetch(targetUrl).then(async (response) => {
        if (response.ok){
          let data = await response.json();
          setApiResponse(data);
        } else {
          setApiResponse({
            message: "Fetch completed, but the response is not okay."
          });
        }
      }).catch(error => {
        
        setApiResponse({
          message: error.message,
          error: {
            status: response?.status,
            name: error.name,
            cause: error.cause,
            code: error.code
          }
        });
        return;
      });

      

      
    }

    fetchData();

  }, []);

  return (
    <>
      <div>
        <h1>API response:</h1>
        <p>{JSON.stringify(apiResponse, null, 4)}</p>    
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
