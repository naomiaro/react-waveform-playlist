import React, { Component } from 'react';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { peaks, bits, length } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
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
    return <canvas width={length} height="80" ref={this.canvas} />;
  }
}

export default Channel;
