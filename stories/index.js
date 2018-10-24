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
  waveHeight: 65,
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
  .add('BBC Waveform Peaks & devicePixelRatio & theming.', () => (
    <ThemeProvider theme={theme}>
      <Channel peaks={data} length={length} bits={bits} scale={scale}></Channel>
    </ThemeProvider>
  ));

storiesOf('TimeScale', module)
  .add('Default Values.', () => (
    <TimeScale></TimeScale>
  ))
  .add('Default Values + device scale.', () => (
    <TimeScale scale={scale}></TimeScale>
  ))
  .add('Default Values + 100 controlWidth + device scale.', () => (
    <TimeScale controlWidth={100} scale={scale}></TimeScale>
  ))
  .add('With 60 second duration at 3000 samplesPerPixel, 48000 sampleRate, 0 controlWidth + device scale.', () => (
    <TimeScale duration={60} samplesPerPixel={3000} scale={scale}></TimeScale>
  ))
  .add('With theme + device scale.', () => (
    <ThemeProvider theme={theme}>
      <TimeScale scale={scale}></TimeScale>
    </ThemeProvider>
  ));
