import React from "react";
import { ThemeProvider } from "styled-components";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
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
import BBCWaveformData from "../media/json/vocals.json";

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

storiesOf("Channel", module)
  .add("Default Values.", () => <Channel />)
  .add("BBC Waveform Peaks.", () => (
    <Channel peaks={data} length={length} bits={bits} />
  ))
  .add("BBC Waveform Peaks & devicePixelRatio.", () => (
    <Channel peaks={data} length={length} bits={bits} scale={scale} />
  ))
  .add("BBC Waveform Peaks & devicePixelRatio & progress.", () => (
    <Channel
      peaks={data}
      length={length}
      bits={bits}
      scale={scale}
      progress={100}
    />
  ))
  .add("BBC Waveform Peaks & devicePixelRatio & theming.", () => (
    <ThemeProvider theme={theme}>
      <Channel peaks={data} length={length} bits={bits} scale={scale} />
    </ThemeProvider>
  ))
  .add("BBC Waveform Peaks & devicePixelRatio & theming & progress.", () => (
    <ThemeProvider theme={theme}>
      <Channel
        peaks={data}
        length={length}
        bits={bits}
        scale={scale}
        progress={100}
      />
    </ThemeProvider>
  ))
  .add(
    "BBC Waveform Peaks & devicePixelRatio & theming & custom waveform height.",
    () => (
      <ThemeProvider theme={theme}>
        <Channel
          peaks={data}
          length={length}
          bits={bits}
          scale={scale}
          waveHeight={65}
        />
      </ThemeProvider>
    )
  );

storiesOf("TimeScale", module)
  .add("Default Values.", () => <TimeScale />)
  .add("30s duration + device scale.", () => (
    <TimeScale duration={30} scale={scale} />
  ))
  .add("60s duration + 100 controlWidth + device scale.", () => (
    <TimeScale duration={30} controlWidth={100} scale={scale} />
  ))
  .add(
    "60s duration at 3000 samplesPerPixel, 48000 sampleRate, 0 controlWidth + device scale.",
    () => <TimeScale duration={60} samplesPerPixel={3000} scale={scale} />
  )
  .add("30s duration + theme + device scale.", () => (
    <ThemeProvider theme={theme}>
      <TimeScale duration={30} scale={scale} />
    </ThemeProvider>
  ));

storiesOf("TrackControls", module).add("Basic Controls.", () => (
  <Controls controlWidth={200} controlHeight={160}>
    <Header>Track 1</Header>
    <ButtonGroup>
      <Button onClick={action("mute-click")}>Mute</Button>
      <Button onClick={action("solo-click")}>Solo</Button>
    </ButtonGroup>
    <VolumeSliderWrapper>
      <VolumeDownIcon />
      <VolumeSlider onChange={action("volume-change")} />
      <VolumeUpIcon />
    </VolumeSliderWrapper>
  </Controls>
));

storiesOf("Track", module)
  .add("Mono Track.", () => (
    <ThemeProvider theme={theme}>
      <Playlist>
        <ScrollContainer>
          <Track waveHeight={100}>
            <Controls controlWidth={200} controlHeight={100}>
              <Header>Track 1</Header>
              <ButtonGroup>
                <Button onClick={action("mute-click")}>Mute</Button>
                <Button onClick={action("solo-click")}>Solo</Button>
              </ButtonGroup>
              <VolumeSliderWrapper>
                <VolumeDownIcon />
                <VolumeSlider onChange={action("volume-change")} />
                <VolumeUpIcon />
              </VolumeSliderWrapper>
            </Controls>
            <ChannelContainer>
              <Channel
                peaks={data}
                length={length}
                bits={bits}
                scale={scale}
                progress={100}
                waveHeight={100}
              />
            </ChannelContainer>
          </Track>
        </ScrollContainer>
      </Playlist>
    </ThemeProvider>
  ))
  .add("Stereo Track.", () => (
    <ThemeProvider theme={theme}>
      <Playlist>
        <ScrollContainer>
          <Track numChannels={2}>
            <Controls controlWidth={200} controlHeight={160}>
              <Header>Track 1</Header>
              <ButtonGroup>
                <Button onClick={action("mute-click")}>Mute</Button>
                <Button onClick={action("solo-click")}>Solo</Button>
              </ButtonGroup>
              <VolumeSliderWrapper>
                <VolumeDownIcon />
                <VolumeSlider onChange={action("volume-change")} />
                <VolumeUpIcon />
              </VolumeSliderWrapper>
            </Controls>
            <ChannelContainer>
              <Channel
                peaks={data}
                length={length}
                bits={bits}
                scale={scale}
                progress={100}
                index={0}
              />
              <Channel
                peaks={data}
                length={length}
                bits={bits}
                scale={scale}
                progress={100}
                index={1}
              />
            </ChannelContainer>
          </Track>
        </ScrollContainer>
      </Playlist>
    </ThemeProvider>
  ))
  .add("Mono Track with Timescale.", () => (
    <ThemeProvider theme={theme}>
      <Playlist>
        <ScrollContainer>
          <TimeScale
            duration={(samplesPerPixel * length) / sampleRate}
            samplesPerPixel={samplesPerPixel}
            sampleRate={sampleRate}
            scale={scale}
            controlWidth={200}
          />
          <Track waveHeight={100}>
            <Controls controlWidth={200} controlHeight={100}>
              <Header>Track 1</Header>
              <ButtonGroup>
                <Button onClick={action("mute-click")}>Mute</Button>
                <Button onClick={action("solo-click")}>Solo</Button>
              </ButtonGroup>
              <VolumeSliderWrapper>
                <VolumeDownIcon />
                <VolumeSlider onChange={action("volume-change")} />
                <VolumeUpIcon />
              </VolumeSliderWrapper>
            </Controls>
            <ChannelContainer>
              <Channel
                peaks={data}
                length={length}
                bits={bits}
                scale={scale}
                progress={100}
                waveHeight={100}
              />
            </ChannelContainer>
          </Track>
        </ScrollContainer>
      </Playlist>
    </ThemeProvider>
  ));
