import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import { secondsToPixels } from "../utils/conversions";

const TIME_INFO = {
  20000: {
    marker: 30000,
    bigStep: 10000,
    smallStep: 5000,
    secondStep: 5
  },
  12000: {
    marker: 15000,
    bigStep: 5000,
    smallStep: 1000,
    secondStep: 1
  },
  10000: {
    marker: 10000,
    bigStep: 5000,
    smallStep: 1000,
    secondStep: 1
  },
  5000: {
    marker: 5000,
    bigStep: 1000,
    smallStep: 500,
    secondStep: 1 / 2
  },
  2500: {
    marker: 2000,
    bigStep: 1000,
    smallStep: 500,
    secondStep: 1 / 2
  },
  1500: {
    marker: 2000,
    bigStep: 1000,
    smallStep: 200,
    secondStep: 1 / 5
  },
  700: {
    marker: 1000,
    bigStep: 500,
    smallStep: 100,
    secondStep: 1 / 10
  }
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

const PlaylistTimeScaleScroll = styled.div`
  position: relative;
  width: ${props => props.cssWidth}px;
  margin-left: ${props => props.controlWidth}px;
  height: 30px;
`;

const TimeTicks = styled.canvas`
  position: absolute;
  width: ${props => props.cssWidth}px;
  height: ${props => props.timeScaleHeight}px;
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

    this.setCanvasRef = canvas => {
      this.canvas = canvas;
    };
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    const canvas = this.canvas;
    const ctx = canvas.getContext("2d");
    const { theme, scale, timeScaleHeight } = this.props;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = theme.timeColor;
    ctx.scale(scale, scale);

    Object.keys(this.canvasInfo).forEach(x => {
      const scaleHeight = this.canvasInfo[x];
      const scaleY = timeScaleHeight - scaleHeight;
      ctx.fillRect(x, scaleY, 1, scaleHeight);
    });
  }

  // duration, samplesPerPixel, sampleRate, controlWidth, color
  render() {
    const {
      duration,
      samplesPerPixel,
      sampleRate,
      controlWidth,
      scale,
      timeScaleHeight
    } = this.props;
    const widthX = secondsToPixels(duration, samplesPerPixel, sampleRate);
    const pixPerSec = sampleRate / samplesPerPixel;
    const scaleInfo = getScaleInfo(samplesPerPixel);
    const canvasInfo = {};
    const timeMarkers = [];
    let counter = 0;

    for (let i = 0; i < widthX; i += pixPerSec * scaleInfo.secondStep) {
      const pix = Math.floor(i);

      // put a timestamp every 30 seconds.
      if (scaleInfo.marker && counter % scaleInfo.marker === 0) {
        const timestamp = formatTime(counter);
        timeMarkers.push(
          <TimeStamp key={timestamp} pix={pix}>
            {timestamp}
          </TimeStamp>
        );
        canvasInfo[pix] = timeScaleHeight;
      } else if (scaleInfo.bigStep && counter % scaleInfo.bigStep === 0) {
        canvasInfo[pix] = Math.floor(timeScaleHeight / 2);
      } else if (scaleInfo.smallStep && counter % scaleInfo.smallStep === 0) {
        canvasInfo[pix] = Math.floor(timeScaleHeight / 5);
      }

      counter += 1000 * scaleInfo.secondStep;
    }

    this.canvasInfo = canvasInfo;
    this.width = widthX;

    return (
      <PlaylistTimeScaleScroll controlWidth={controlWidth} cssWidth={widthX}>
        {timeMarkers}
        <TimeTicks
          cssWidth={widthX}
          width={widthX * scale}
          height={timeScaleHeight * scale}
          ref={this.setCanvasRef}
        />
      </PlaylistTimeScaleScroll>
    );
  }
}

TimeScale.defaultProps = {
  theme: {
    // color of the time ticks on the canvas
    timeColor: "grey"
  },
  // checking `window.devicePixelRatio` when drawing to canvas.
  scale: 1,
  // time length in seconds
  duration: 0,
  samplesPerPixel: 1000,
  sampleRate: 48000,
  controlWidth: 0,
  timeScaleHeight: 10
};

export default withTheme(TimeScale);
