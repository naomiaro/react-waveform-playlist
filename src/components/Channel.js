import React, { Component } from 'react';
import styled from 'styled-components';

const Waveform = styled.canvas`
  width: ${props => props.cssWidth}px;
  height: ${props => props.cssHeight}px;
`;

class Channel extends Component {
  constructor(props) {
    super(props);

    this.setCanvasRef = canvas => {
      if (canvas) {
        const scale = window.devicePixelRatio;
        // Normalize coordinate system to use css pixels.
        const cc = canvas.getContext('2d');
        cc.scale(scale, scale);
      }

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
    const { peaks, bits, length } = this.props;
    const scale = window.devicePixelRatio;
    const canvas = this.canvas;
    const height = canvas.height / scale;
    const width = canvas.width;
    const cc = canvas.getContext('2d');
    const h2 = height / 2;
    const maxValue = 2 ** (bits - 1);
    const offset = 0;

    cc.clearRect(0, 0, width, height);
    cc.fillStyle = '#000';

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
    const { length } = this.props;
    const height = 80;
    const scale = window.devicePixelRatio;

    return <Waveform
      cssWidth={ length }
      cssHeight={ height }
      width={ length * scale }
      height={ height * scale }
      ref={ this.setCanvasRef } />;
  }
}

export default Channel;
