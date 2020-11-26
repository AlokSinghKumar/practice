import React from "react";
import Sketch from "react-p5";

export default (props) => {
    let img;
    let img1;
    let poseNet;
    let poseNet1;
    let poses = [];
    let poses1 = [];
    let pose;
    let pose1;
    let skeleton;
    let skeleton1;

    

    return <Sketch setup={setup} draw={draw} />;
}