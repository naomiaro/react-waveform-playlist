import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

const Progress = styled.div`
  position: absolute;
  transform: translateZ(0);
  will-change: transform;
  background: ${props => props.theme.waveProgressColor};
  width: ${props => props.progress}px;
  height: ${props => props.waveHeight}px;
`;

const Waveform = styled.canvas`
  float: left;
  position: relative;
  margin: 0;
  padding: 0;
  width: ${props => props.cssWidth}px;
  height: ${props => props.waveHeight}px;
`;

const ChannelWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  background: ${props => props.theme.waveFillColor};
  width: ${props => props.cssWidth}px;
  height: ${props => props.waveHeight}px;
`;

class Channel extends Component {
  constructor(props) {
    super(props);

    this.setCanvasRef = canvas => {
      this.canvas = canvas;
    };
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { peaks, bits, length, waveHeight, theme, scale } = this.props;
    const canvas = this.canvas;
    const cc = canvas.getContext('2d');
    const h2 = waveHeight / 2;
    const maxValue = 2 ** (bits - 1);
    const offset = 0;

    cc.clearRect(0, 0, canvas.width, canvas.height);
    cc.fillStyle = theme.waveOutlineColor;
    cc.scale(scale, scale);

    for (let i = 0; i < length; i += 1) {
      const minPeak = peaks[(i + offset) * 2] / maxValue;
      const maxPeak = peaks[((i + offset) * 2) + 1] / maxValue;
      
      const min = Math.abs(minPeak * h2);
      const max = Math.abs(maxPeak * h2);

      // draw max
      cc.fillRect(i, 0, 1, h2 - max);
      // draw min
      cc.fillRect(i, h2 + min, 1, h2 - min);
    }
  }

  render() {
    const {
      length,
      waveHeight,
      scale,
      progress,
      theme,
    } = this.props;

    return <ChannelWrapper cssWidth={length} theme={theme} waveHeight={waveHeight}>
      <Progress progress={progress} theme={theme} waveHeight={waveHeight} />
      <Waveform
        cssWidth={length}
        width={length * scale}
        height={waveHeight * scale}
        ref={this.setCanvasRef} />
    </ChannelWrapper>;
  }
}

Channel.defaultProps = {
  theme: {
    // color of the waveform outline
    waveOutlineColor: 'black',
    waveFillColor: 'grey',
    waveProgressColor: 'orange',
  },
  // checking `window.devicePixelRatio` when drawing to canvas.
  scale: 1,
  peaks: [],
  length: 0,
  bits: 0,
  // height in CSS pixels of each canvas element a waveform is on.
  waveHeight: 80,
  // width in CSS pixels of the progress on the channel.
  progress: 0,
};

export default withTheme(Channel);
