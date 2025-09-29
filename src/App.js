import React, { useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const sessionId = "session_1"; 
  const [sheets, setSheets] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chart, setChart] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = "https://ai-server-zf5u.onrender.com";


  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("session_id", sessionId);

    try {
      const res = await axios.post(`${backendUrl}/upload`, formData);
      setSheets(res.data.sheets);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };


  const handleAsk = async () => {
    if (!question) return alert("Enter a question!");
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/ask`, {
        session_id: sessionId,
        question: question,
      });

      setAnswer(res.data.answer);
      setChart(res.data.chart);
    } catch (err) {
      console.error(err);
      alert("Failed to get answer!");
    } finally {
      setLoading(false); 
    }
  };

  return (

    <div>
  <div className="bg-video">
      <video className="video-bg" autoPlay loop muted>
        <source src="https://cordly.ai/wave2.mp4" type="video/mp4" />
      </video>
  </div>
  
    <div className="app-container">

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <p1>AI Data Analytics</p1>


      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
          Upload Excel
        </button>
      </div>

    
      {sheets.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <b>Sheets:</b> {sheets.join(", ")}
        </div>
      )}


      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: "70%", padding: "5px" }}
        />
        <button onClick={handleAsk} style={{ marginLeft: "10px" }}>
          Ask AI
        </button>
      </div>

      {loading &&(
        <div className="loader-container">
        <div className="loader"></div>
      </div>)}


      {!loading && answer && (
        <div style={{ marginBottom: "20px" }}>
          <h3>AI Answer:</h3>
          <p>{answer}</p>
        </div>
      )}

      {chart && (
        <div>
          <h3>Chart:</h3>
          <img src={`data:image/png;base64,${chart}`} alt="chart" />
        </div>
      )}

      
    </div>

    </div>

    <div className="footer">
   
    <a 
      href="https://www.linkedin.com/in/harihanshansdah/" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      Developed by Hari
    </a>   
  </div>
</div>
    
  );
}

export default App;
