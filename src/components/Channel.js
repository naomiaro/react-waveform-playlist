import React, { Component } from "react";
import styled, { withTheme } from "styled-components";

const MAX_CANVAS_WIDTH = 1000;

const ChannelContainer = styled.div`
  position: relative;
`;

const Progress = styled.div`
  position: absolute;
  background: ${props => props.theme.waveProgressColor};
  width: ${props => props.progress}px;
  height: ${props => props.waveHeight}px;
`;

const Waveform = styled.canvas`
  float: left;
  position: relative;
  width: ${props => props.cssWidth}px;
  height: ${props => props.waveHeight}px;
`;

const ChannelWrapper = styled.div`
  position: absolute;
  top: ${props => props.waveHeight * props.index}px;
  background: ${props => props.theme.waveFillColor};
  width: ${props => props.cssWidth}px;
  height: ${props => props.waveHeight}px;
`;

class Channel extends Component {
  constructor(props) {
    super(props);
    this.canvases = [];
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate({ peaks: prevPeaks }) {
    const { peaks: nextPeaks } = this.props;

    if (prevPeaks !== nextPeaks) {
      this.draw();
    }
  }

  draw() {
    const { peaks, bits, waveHeight, theme, scale } = this.props;

    let offset = 0;
    for (let i = 0; i < this.canvases.length; i++) {
      const canvas = this.canvases[i];
      const cc = canvas.getContext("2d");
      const h2 = waveHeight / 2;
      const maxValue = 2 ** (bits - 1);

      cc.clearRect(0, 0, canvas.width, canvas.height);
      cc.fillStyle = theme.waveOutlineColor;
      cc.scale(scale, scale);

      const peakSegmentLength = canvas.width / scale;
      for (let i = 0; i < peakSegmentLength; i += 1) {
        const minPeak = peaks[(i + offset) * 2] / maxValue;
        const maxPeak = peaks[(i + offset) * 2 + 1] / maxValue;

        const min = Math.abs(minPeak * h2);
        const max = Math.abs(maxPeak * h2);

        // draw max
        cc.fillRect(i, 0, 1, h2 - max);
        // draw min
        cc.fillRect(i, h2 + min, 1, h2 - min);
      }

      offset += MAX_CANVAS_WIDTH;
    }
  }

  createCanvasRef(i) {
    return canvas => {
      this.canvases[i] = canvas;
    };
  }

  render() {
    const { length, waveHeight, scale, progress, theme, index } = this.props;

    let totalWidth = length;
    let waveformCount = 0;
    const waveforms = [];
    while (totalWidth > 0) {
      const currentWidth = Math.min(totalWidth, MAX_CANVAS_WIDTH);
      const waveform = (
        <Waveform
          key={`${length}-${waveformCount}`}
          cssWidth={currentWidth}
          width={currentWidth * scale}
          height={waveHeight * scale}
          waveHeight={waveHeight}
          ref={this.createCanvasRef(waveformCount)}
        />
      );

      waveforms.push(waveform);
      totalWidth -= currentWidth;
      waveformCount += 1;
    }

    return (
      <ChannelWrapper
        index={index}
        cssWidth={length}
        theme={theme}
        waveHeight={waveHeight}
      >
        <Progress progress={progress} theme={theme} waveHeight={waveHeight} />
        {waveforms}
      </ChannelWrapper>
    );
  }
}

Channel.defaultProps = {
  theme: {
    // color of the waveform outline
    waveOutlineColor: "black",
    waveFillColor: "grey",
    waveProgressColor: "orange"
  },
  // checking `window.devicePixelRatio` when drawing to canvas.
  scale: 1,
  peaks: [],
  length: 0,
  bits: 0,
  // height in CSS pixels of each canvas element a waveform is on.
  waveHeight: 80,
  index: 0,
  // width in CSS pixels of the progress on the channel.
  progress: 0
};

export default withTheme(Channel);
export { ChannelContainer };
