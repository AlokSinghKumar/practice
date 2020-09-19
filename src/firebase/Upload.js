
import React, {useState} from "react";
import { storage } from "./index";


const Upload = () => {
    const [video, setvideo] = useState(null);
    const [progress, setProgress] = useState(0);
    const [download, setDownload] = useState(null);

    const handleChange = e => {
        if(e.target.files[0]){
          setvideo(e.target.files[0]);
        }
      };
    
      const handleUpload = () => {
        const uploadTask  = storage.ref(`videos/${video.name}`).put(video);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress= Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
    
            if(snapshot.bytesTransferred === snapshot.totalBytes)
            {
              setDownload(video);
            }
          },
          error => {
            console.log(error);
          },
          () => {
            storage.ref("videos")
            .child(video.name)
            .getDownloadURL()
            .then(url => {
              console.log(url)
            });
          }
        );
      };

    const download_link = () => {

    if(download != null){
        return(
        <button><a href={download}>Download</a></button>
        )
    }

    }
    
    return (
    <div>
        <progress value={progress} max="100" />
        <br />
        <br />
        <input type="file" onChange={handleChange} />
        <button onClick = {handleUpload}>Upload</button> 
        {download_link()}
        
    </div>
    );
}

export default Upload;