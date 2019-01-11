import React from "react";
import { ThemeProvider } from "styled-components";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Channel from "../src/components/Channel";
import TimeScale from "../src/components/TimeScale";
import TrackControls from "../src/components/TrackControls";
import BBCWaveformData from "../media/json/vocals.json";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeDown } from "@fortawesome/free-solid-svg-icons";

library.add(faVolumeUp);
library.add(faVolumeDown);

const {
  sample_rate: sampleRate,
  samples_per_pixel: samplesPerPixel,
  bits,
  length,
  data
} = BBCWaveformData;

const theme = {
  waveOutlineColor: "green",
  waveFillColor: "white",
  waveProgressColor: "yellow",
  timeColor: "red"
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
  <TrackControls
    onMuteClick={action("mute-click")}
    onSoloClick={action("solo-click")}
    onVolumeChange={action("volume-change")}
  />
));
