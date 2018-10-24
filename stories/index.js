import React from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Channel from '../src/components/Channel';
import TimeScale from '../src/components/TimeScale';
import BBCWaveformData from '../media/json/vocals.json';

const {
  sample_rate: sampleRate,
  samples_per_pixel: samplesPerPixel,
  bits,
  length,
  data
} = BBCWaveformData;

const theme = {
  waveOutlineColor: 'green',
  waveFillColor: 'white',
  waveProgressColor: 'yellow',
  timeColor: 'red',
};

const scale = window.devicePixelRatio;

storiesOf('Channel', module)
  .add('Default Values.', () => (
    <Channel></Channel>
  ))
  .add('BBC Waveform Peaks.', () => (
    <Channel peaks={data} length={length} bits={bits}></Channel>
  ))
  .add('BBC Waveform Peaks & devicePixelRatio.', () => (
    <Channel peaks={data} length={length} bits={bits} scale={scale}></Channel>
  ))
  .add('BBC Waveform Peaks & devicePixelRatio & progress.', () => (
    <Channel peaks={data} length={length} bits={bits} scale={scale} progress={100}></Channel>
  ))
  .add('BBC Waveform Peaks & devicePixelRatio & theming.', () => (
    <ThemeProvider theme={theme}>
      <Channel peaks={data} length={length} bits={bits} scale={scale}></Channel>
    </ThemeProvider>
  ))
  .add('BBC Waveform Peaks & devicePixelRatio & theming & progress.', () => (
    <ThemeProvider theme={theme}>
      <Channel peaks={data} length={length} bits={bits} scale={scale} progress={100}></Channel>
    </ThemeProvider>
  ))
  .add('BBC Waveform Peaks & devicePixelRatio & theming & custom waveform height.', () => (
    <ThemeProvider theme={theme}>
      <Channel peaks={data} length={length} bits={bits} scale={scale} waveHeight={65}></Channel>
    </ThemeProvider>
  ));

storiesOf('TimeScale', module)
  .add('Default Values.', () => (
    <TimeScale></TimeScale>
  ))
  .add('30s duration + device scale.', () => (
    <TimeScale duration={30} scale={scale}></TimeScale>
  ))
  .add('60s duration + 100 controlWidth + device scale.', () => (
    <TimeScale duration={30} controlWidth={100} scale={scale}></TimeScale>
  ))
  .add('60s duration at 3000 samplesPerPixel, 48000 sampleRate, 0 controlWidth + device scale.', () => (
    <TimeScale duration={60} samplesPerPixel={3000} scale={scale}></TimeScale>
  ))
  .add('30s duration + theme + device scale.', () => (
    <ThemeProvider theme={theme}>
      <TimeScale duration={30} scale={scale}></TimeScale>
    </ThemeProvider>
  ));
