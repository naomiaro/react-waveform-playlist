import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import Channel, { ChannelContainer } from "../src/components/Channel";
import TimeScale from "../src/components/TimeScale";
import {
  Controls,
  Header,
  ButtonGroup,
  Button,
  VolumeSliderWrapper,
  VolumeDownIcon,
  VolumeSlider,
  VolumeUpIcon
} from "../src/components/TrackControls";
import Track from "../src/components/Track";
import Playlist, { ScrollContainer } from "../src/components/Playlist";
import BBCWaveformData from "./test.json";

const {
  sample_rate: sampleRate,
  samples_per_pixel: samplesPerPixel,
  bits,
  length,
  data
} = BBCWaveformData;

const theme = {
  waveOutlineColor: "white",
  waveFillColor: "green",
  waveProgressColor: "orange",
  timeColor: "grey"
};

const scale = window.devicePixelRatio;

class App extends Component {
  state = {
    sampleRate,
    samplesPerPixel,
    bits,
    length,
    data,
    waveHeight: 100,
    controlWidth: 200,
    controlHeight: 100,
    progress: 0
  };

  componentDidMount() {
    requestAnimationFrame(this.tick);
  }

  tick = () => {
    const progress = this.state.progress + 1;

    if (progress < this.state.length) {
      this.setState({ progress });
      requestAnimationFrame(this.tick);
    }
  };

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Playlist>
            <ScrollContainer>
              <TimeScale
                duration={
                  (this.state.samplesPerPixel * this.state.length) /
                  this.state.sampleRate
                }
                samplesPerPixel={this.state.samplesPerPixel}
                sampleRate={this.state.sampleRate}
                scale={scale}
                controlWidth={this.state.controlWidth}
              />
              <Track waveHeight={this.state.waveHeight}>
                <Controls
                  controlWidth={this.state.controlWidth}
                  controlHeight={this.state.controlHeight}
                >
                  <Header>Track 1</Header>
                  <ButtonGroup>
                    <Button>Mute</Button>
                    <Button>Solo</Button>
                  </ButtonGroup>
                  <VolumeSliderWrapper>
                    <VolumeDownIcon />
                    <VolumeSlider />
                    <VolumeUpIcon />
                  </VolumeSliderWrapper>
                </Controls>
                <ChannelContainer>
                  <Channel
                    peaks={this.state.data}
                    length={this.state.length}
                    bits={this.state.bits}
                    scale={scale}
                    progress={this.state.progress}
                    waveHeight={this.state.waveHeight}
                  />
                </ChannelContainer>
              </Track>
            </ScrollContainer>
          </Playlist>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
