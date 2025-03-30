import { useRef, useState, useEffect } from "react";
import { uploadFile } from '../services/api.js';
import background from '../assets/scenery.jpg'; // Import the background image
import owlImage from '../assets/owl.png'; // Import the owl image

function Share() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");
  const [fileName, setFileName] = useState(""); // State to hold the name of the uploaded file
  const [copied, setCopied] = useState(false); // State to track whether the link has been copied
  const fileinputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        const response = await uploadFile(data);
        setResult(response.path);
        setFileName(file.name); // Set the name of the uploaded file
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileinputRef.current.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true); // Set copied state to true
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'File Share',
        text: 'Check out this file I uploaded:',
        url: result
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center pt-16" style={{ backgroundImage: `url(${background})`, filter: 'brightness(0.6)' }}>
      <div className="bg-white rounded-lg p-8 shadow-lg bg-opacity-70 max-w-md w-full mx-4 flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl text-center text-gray-800 mb-4">FILE SHARING MADE EASY</h1>
        <p className="text-lg text-gray-700 text-center mb-2">Drop your files here and share the link with your friends!(First upload takes about a minute.)</p>
        {fileName && (
          <p className="text-lg text-gray-700 text-center font-bold mb-4">Uploaded file: {fileName}</p>
        )}
        {result && (
          <div className="flex flex-col items-center justify-center w-full mb-4">
            <img src={owlImage} alt="Uploaded file" className="w-24 h-24 object-contain rounded-lg mb-4" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-2" onClick={copyToClipboard}>
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mb-2" onClick={shareLink}>
              Share
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => window.location.reload()}>
              New Upload
            </button>
          </div>
        )}
        {!result && (
          <div className="flex flex-col items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4" onClick={() => onUploadClick()}>
              Upload File
            </button>
            <input type="file" ref={fileinputRef} className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Share;