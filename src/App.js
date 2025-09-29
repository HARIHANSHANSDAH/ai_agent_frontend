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
        <h1 className="app-title">AI Data Analytics</h1>

        {/* Upload */}
        <div className="input-group">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleUpload}>Upload Excel</button>
        </div>

        {/* Sheets */}
        {sheets.length > 0 && (
          <div className="sheets-list">
            <b>Sheets:</b> {sheets.join(", ")}
          </div>
        )}

        {/* Ask Question */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleAsk}>Ask AI</button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}

        {/* Answer */}
        {!loading && answer && (
          <div className="card">
            <h3>AI Answer:</h3>
            <p>{answer}</p>
          </div>
        )}

        {/* Chart */}
        {chart && (
          <div className="card">
            <h3>Chart:</h3>
            <img src={`data:image/png;base64,${chart}`} alt="chart" />
          </div>
        )}
      </div>

      {/* Footer */}
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
