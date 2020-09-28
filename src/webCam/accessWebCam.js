import React from "react"
import Webcam from "react-webcam";

const accessWebCam = () => {
    // const webcamRef = React.useRef(null);

    return(
        <div>
            <Webcam
                // ref={webcamRef}
                audio={false}
                mirrored = {true}
                height= {100 + '%'}
                width={100 + '%'}
            />
        </div>
    )
}

export default accessWebCam;
