import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Label = styled.label`
  display: inline-block;
  color: rgb(187, 105, 107);
  margin: 10px;
`;

export const Radio = styled.input`
  outline: 3px dashed red;
  margin-right: 5px;
`;

export default class RadioGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    // TODO: specify required shape
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.isControlled = props.value !== undefined;

    if (!this.isControlled) {
      this.state = {
        value: this.props.defaultValue || null,
      };
    }
  }

  handleChange = e => {
    if (this.isControlled) {
      this.props.onChange(e);
    } else {
      this.setState({ value: e.target.value });
      this.props.onChange && this.props.onChange(e);
    }
  };

  render() {
    const { name, options, onChange, value: valueFromProps, ...props } = this.props;
    const selectedValue = this.isControlled ? valueFromProps : this.state.value;

    const radios = options.map((option, i) => {
      const radioProps = {
        name,
        value: option.value,
        checked: option.value === selectedValue,
        onChange: this.handleChange,
      }

      if (option.renderer) {
        return option.renderer({
          ...radioProps,
          key: i
        });
      }

      return (
        <Label key={i}>
          <Radio
            type="radio"
            {...radioProps}
          />
          {option.label}
        </Label>
      )
    });

    return (
      <div {...props}>
        {radios}
      </div>
    );
  }
}
