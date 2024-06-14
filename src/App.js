import "./App.css";
import right from "../src/images/right-img.png";
import frame from "../src/images/frame.png";
import { useEffect, useRef, useState } from "react";

function App() {

  const videoRef=useRef(null);
  const photoRef=useRef(null);

  const [hasPhoto ,setHasPhoto] =useState(false);

  const getVideo = () =>{
    navigator.mediaDevices
    .getUserMedia({ video :true}) 
    .then((stream) => {
    let video=videoRef.current;
    video.srcObject =stream;
    video.play()
    })
    .catch((err) =>{
      console.log(err)
    })
  };

  useEffect(()=>{
   getVideo();
  },[videoRef])


  const takePicture =() =>{
  let width=500,height=500;
  let photo=photoRef.current;
  let video=videoRef.current;
  photo.width =width;
  photo.height=height;
  let ctx=photo.getContext('2d');

  ctx.drawImage(video,0,0,photo.width,photo.height);
  }

  const reTake = () =>{
    let photo=photoRef.current;

    let ctx=photo.getContext('2d')
   ctx.clearRect(0,0,photo.width,photo.height)
  }

  const SaveImage = () =>{
    let photo=photoRef.current;
    let ctx=photo.getContext('2d');
    ctx.toDataURL("image/jpeg");  
    window.location.href=ctx;
  }
  return (
    <>
      <div className="container">
        <img className="right" src={right} alt="frame" />
        <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePicture}>CAPTURE</button>
        </div>
        <br />
        <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={reTake}>RETAKE</button>
        <br />
        </div>
        <button>POST</button>
        <br />
        <button onClick={SaveImage}>SAVE</button>
        <br />
        <img className="frame" src={frame} alt="camera" />
      </div>
    </>
  );
}

export default App;
