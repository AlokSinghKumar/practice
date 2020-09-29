import os
import sys
import argparse
import cv2
import time
import h5py
import tensorflow as tf
from config_reader import config_reader

from processing import extract_parts, draw

from model.cmu_model import get_testing_model

currentDT = time.localtime()
start_datetime = time.strftime("-%m-%d-%H-%M-%S", currentDT)


if __name__ == '__main__':  

    keras_weights_file = "model/keras/model.h5"
    frame_rate_ratio = 1
    process_speed = 4 #Int 1-4 (Fast to slow, low quality to high quality)
    ending_frame = None #Last video frame to analyze

    print('start processing...')

    # Video input
    video = 'test.mp4'
    video_path = 'C:/Users/Hari/Desktop/'
    video_file = video_path + video

    # Output location
    output_path = 'C:/Users/Hari/Desktop/'
    output_format = '.mp4'
    video_output = output_path + video + str(start_datetime) + output_format

    # load model
    # authors of original model don't use
    # vgg normalization (subtracting mean) on input images
    model = get_testing_model()
    model.load_weights(keras_weights_file)

    # load config
    params, model_params = config_reader()

    # Video reader
    cam = cv2.VideoCapture(video_file)
    input_fps = cam.get(cv2.CAP_PROP_FPS)
    ret_val, orig_image = cam.read()
    video_length = int(cam.get(cv2.CAP_PROP_FRAME_COUNT))

    if ending_frame is None:
        ending_frame = video_length

    # Video writer
    output_fps = input_fps / frame_rate_ratio
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(video_output, fourcc, output_fps, (orig_image.shape[1], orig_image.shape[0]))

    scale_search = [1, .5, 1.5, 2]  # [.5, 1, 1.5, 2]
    scale_search = scale_search[0:process_speed]

    params['scale_search'] = scale_search

    i = 0  # default is 0
    while(cam.isOpened()) and ret_val is True and i < ending_frame:
        if i % frame_rate_ratio == 0:

            input_image = cv2.cvtColor(orig_image, cv2.COLOR_RGB2BGR)

            tic = time.time()

            # generate image with body parts
            body_parts, all_peaks, subset, candidate = extract_parts(input_image, params, model, model_params)
            canvas = draw(orig_image, all_peaks, subset, candidate)

            print('Processing frame: ', i)
            toc = time.time()
            print('processing time is %.5f' % (toc - tic))

            out.write(canvas)

        ret_val, orig_image = cam.read()

        i += 1
