import React, { Component } from "react";
import styled, { withTheme } from "styled-components";

const TrackContainer = styled.div`
	overflow: auto;
`;

const ChannelContainer = styled.div`
	height: ${props => props.waveHeight * props.numChannels}px;
	margin-left: ${props => props.controlWidth}px;
`;

class Track extends Component {
	render() {
		const { children } = this.props;
		return <ChannelContainer {...this.props}>{children}</ChannelContainer>;
	}
}

Track.defaultProps = {
	// height in CSS pixels of each canvas element a waveform is on.
	waveHeight: 80,
	// width in CSS pixels of the controls.
	controlWidth: 200,
	numChannels: 1
};

export default withTheme(Track);
export { TrackContainer };
