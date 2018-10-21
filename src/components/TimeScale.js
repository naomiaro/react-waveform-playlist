import React, { Component } from 'react';
import styled from 'styled-components';
import { secondsToPixels } from '../utils/conversions';

const TIME_INFO = {
  20000: {
    marker: 30000,
    bigStep: 10000,
    smallStep: 5000,
    secondStep: 5,
  },
  12000: {
    marker: 15000,
    bigStep: 5000,
    smallStep: 1000,
    secondStep: 1,
  },
  10000: {
    marker: 10000,
    bigStep: 5000,
    smallStep: 1000,
    secondStep: 1,
  },
  5000: {
    marker: 5000,
    bigStep: 1000,
    smallStep: 500,
    secondStep: 1 / 2,
  },
  2500: {
    marker: 2000,
    bigStep: 1000,
    smallStep: 500,
    secondStep: 1 / 2,
  },
  1500: {
    marker: 2000,
    bigStep: 1000,
    smallStep: 200,
    secondStep: 1 / 5,
  },
  700: {
    marker: 1000,
    bigStep: 500,
    smallStep: 100,
    secondStep: 1 / 10,
  },
};

function getScaleInfo(resolution) {
  let keys = Object.keys(TIME_INFO).map(item => parseInt(item, 10));

  // make sure keys are numerically sorted.
  keys = keys.sort((a, b) => a - b);

  for (let i = 0; i < keys.length; i += 1) {
    if (resolution <= keys[i]) {
      return TIME_INFO[keys[i]];
    }
  }

  return TIME_INFO[keys[0]];
}

function formatTime(milliseconds) {
  const seconds = milliseconds / 1000;
  let s = seconds % 60;
  const m = (seconds - s) / 60;

  if (s < 10) {
    s = `0${s}`;
  }

  return `${m}:${s}`;
}

const PlaylistTimeScale = styled.div`
  margin-left: ${props => props.controlWidth}px;
  position: relative;
  left: 0;
  right: 0;
  height: 30px;
`;

const PlaylistTimeScaleScroll = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: 100%;
`;

const TimeTicks = styled.canvas`
  position: absolute;
  width: ${props => props.width}px;
  height: 10px;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TimeStamp = styled.div`
  left: ${props => props.pix}px;
  position: absolute;
`;

class TimeScale extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvas.current;
    canvas.height = 10;
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { duration, samplesPerPixel, sampleRate} = this.props;
    const width = secondsToPixels(duration, samplesPerPixel, sampleRate);
    const height = canvas.height;
    canvas.width = width;
    ctx.fillStyle = '#000';

    Object.keys(this.canvasInfo).forEach((x) => {
      const scaleHeight = this.canvasInfo[x];
      const scaleY = height - scaleHeight;
      ctx.fillRect(x, scaleY, 1, scaleHeight);
    });
  }

  // duration, samplesPerPixel, sampleRate, controlWidth, color
  render() {
    const { duration, samplesPerPixel, sampleRate, controlWidth} = this.props;
    const widthX = secondsToPixels(duration, samplesPerPixel, sampleRate);
    const pixPerSec = sampleRate / samplesPerPixel;
    const scaleInfo = getScaleInfo(samplesPerPixel);
    const canvasInfo = {};
    const timeMarkers = [];
    let counter = 0;

    for (let i = 0; i < widthX; i += (pixPerSec * scaleInfo.secondStep)) {
      const pix = Math.floor(i);

      // put a timestamp every 30 seconds.
      if (scaleInfo.marker && (counter % scaleInfo.marker === 0)) {
        const timestamp = formatTime(counter);
        timeMarkers.push(<TimeStamp key={timestamp} pix={pix}>{timestamp}</TimeStamp>);
        canvasInfo[pix] = 10;
      } else if (scaleInfo.bigStep && (counter % scaleInfo.bigStep === 0)) {
        canvasInfo[pix] = 5;
      } else if (scaleInfo.smallStep && (counter % scaleInfo.smallStep === 0)) {
        canvasInfo[pix] = 2;
      }

      counter += (1000 * scaleInfo.secondStep);
    }

    this.canvasInfo = canvasInfo;
    this.width = widthX;

    return (
      <PlaylistTimeScale controlWidth={controlWidth}>
        <PlaylistTimeScaleScroll width={widthX}>
          {timeMarkers}
          <TimeTicks width={widthX} ref={this.canvas}></TimeTicks>
        </PlaylistTimeScaleScroll>
      </PlaylistTimeScale>
    );
  }
}

export default TimeScale;
