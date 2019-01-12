import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Controls = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  background: white;
  text-align: center;
  width: ${props => props.controlWidth}px;
  height: ${props => props.controlHeight}px;
`;

const Header = styled.header`
  overflow: hidden;
  color: white;
  background-color: blueviolet;
  margin-bottom: 1em;
  height: 20px;
`;

const ButtonGroup = styled.div`
  button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const Button = styled.button.attrs({
  type: "button"
})`
  border: 1px solid black;
  padding: 5px;

  :focus {
    outline: none;
    background-color: #bbb;
  }
`;

const VolumeSliderWrapper = styled.label`
  margin: 1em auto;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

const VolumeSlider = styled.input.attrs({
  type: "range"
})`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::-webkit-slider-runnable-track {
    height: 8px;
    background: #ddd;
    border: none;
    border-radius: 3px;
    padding: 1px;
  }

  &::-moz-range-track {
    height: 8px;
    background: #ddd;
    border: none;
    border-radius: 3px;
    padding: 1px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: goldenrod;
    margin-top: -5px;
    cursor: ew-resize;
  }

  &::-moz-range-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: goldenrod;
    margin-top: -5px;
    cursor: ew-resize;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #bbb;
  }

  &:focus::-moz-range-track {
    background: #bbb;
  }
`;

const VolumeDownIcon = styled(FontAwesomeIcon).attrs({
  icon: "volume-down"
})``;

const VolumeUpIcon = styled(FontAwesomeIcon).attrs({
  icon: "volume-up"
})``;

export {
  Controls,
  Header,
  ButtonGroup,
  Button,
  VolumeSliderWrapper,
  VolumeDownIcon,
  VolumeSlider,
  VolumeUpIcon
};
