import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

const Waveform = styled.canvas`
  width: ${props => props.cssWidth}px;
  height: ${props => props.theme.waveHeight}px;
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
    const { peaks, bits, length, theme, scale } = this.props;
    const canvas = this.canvas;
    const height = theme.waveHeight;
    const width = length;
    const cc = canvas.getContext('2d');
    const h2 = height / 2;
    const maxValue = 2 ** (bits - 1);
    const offset = 0;

    cc.clearRect(0, 0, width, height);
    cc.fillStyle = theme.waveOutlineColor;
    cc.scale(scale, scale);

    for (let i = 0; i < width; i += 1) {
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
    const { length, theme, scale } = this.props;
    const height = theme.waveHeight;

    return <Waveform
      cssWidth={ length }
      width={ length * scale }
      height={ height * scale }
      ref={ this.setCanvasRef } />;
  }
}

Channel.defaultProps = {
  theme: {
    // color of the waveform outline
    waveOutlineColor: 'black',
    // height in CSS pixels of each canvas element a waveform is on.
    waveHeight: 80,
  },
  // checking `window.devicePixelRatio` when drawing to canvas.
  scale: 1,
};

export default withTheme(Channel);
