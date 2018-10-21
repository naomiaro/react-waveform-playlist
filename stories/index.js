import React from 'react';
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

storiesOf('Channel', module)
  .add('With BBC Waveform Peaks', () => (
    <Channel peaks={data} length={length} bits={bits}></Channel>
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
