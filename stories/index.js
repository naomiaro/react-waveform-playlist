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
};

const scale = window.devicePixelRatio;

storiesOf('Channel', module)
  .add('BBC Waveform Peaks', () => (
    <Channel peaks={data} length={length} bits={bits}></Channel>
  ))
  .add('BBC Waveform Peaks & devicePixelRatio', () => (
    <Channel peaks={data} length={length} bits={bits} scale={scale}></Channel>
  ))
  .add('BBC Waveform Peaks & devicePixelRatio & theming', () => (
    <ThemeProvider theme={theme}>
      <Channel peaks={data} length={length} bits={bits} scale={scale}></Channel>
    </ThemeProvider>
  ));

storiesOf('TimeScale', module)
  .add('With 30 second duration at 1500 samplesPerPixel, 0 controlWidth.', () => (
    <TimeScale duration={30} samplesPerPixel={1500} sampleRate={48000} controlWidth={0}></TimeScale>
  ))
  .add('With 30 second duration at 1500 samplesPerPixel, 100 controlWidth.', () => (
    <TimeScale duration={30} samplesPerPixel={1500} sampleRate={48000} controlWidth={100}></TimeScale>
  ))
  .add('With 60 second duration at 10000 samplesPerPixel, 0 controlWidth.', () => (
    <TimeScale duration={60} samplesPerPixel={10000} sampleRate={48000} controlWidth={0}></TimeScale>
  ));
