import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Channel from '../src/components/Channel';
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
