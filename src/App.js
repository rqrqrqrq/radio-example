import React, { Component } from 'react';
import RadioGroup from './RadioGroup';

class App extends Component {
  state = {
    v: '10',
    controlledInputValue: 'default input value',
  }

  handleChange = e => {
    const newVal = Number(e.target.value) + 10;
    this.setState({ v: newVal.toString() })
  }

  render() {
    return (
      <div>
        <h1>uncontrolled</h1>
        <RadioGroup
          name="radio"
          options={[
            { label: 'yoba', value: '10' },
            { label: 'peka', value: '20' },
          ]}
          onChange={e => console.log(e.target.value + 1)}
        />
        <h1>uncontrolled with default value</h1>
        <RadioGroup
          defaultValue="20"
          name="radio1"
          options={[
            { label: 'yoba', value: '10' },
            { label: 'peka', value: '20' },
          ]}
          onChange={e => console.log(e.target.value + 2)}
        />
        <h1>controlled with value</h1>
        <RadioGroup
          value={this.state.v}
          name="radio2"
          options={[
            { label: 'yoba', value: '10' },
            { label: 'peka', value: '20' },
            { label: 'peka1', value: '30' },
            { label: 'peka2', value: '40' },
            { label: 'peka3', value: '50' },
          ]}
          onChange={this.handleChange}
        />
        <h1>full custom radio components</h1>
        <RadioGroup
          name="yoba"
          options={[
            { renderer: ({ value, checked, ...props }) =>
              <input
                {...props}
                style={{ color: checked ? 'red' : 'blue'}}
                defaultValue={value} type="text"
              />
              , value: 'complex stuff'
            },
            { label: 'custom', value: 'simple'}
          ]}
          onChange={e => console.log(e.target.value)}
        />
        <h1>another custom example</h1>
        <RadioGroup
          name="input"
          options={[
            { label: 'stupid1', value: 'stupid1' },
            { label: 'stupid2', value: 'stupid2' },
            { renderer: ({ key, onChange, value, ...props }) => (
              <div key={key}>
                <label>
                  <input
                    type="radio"
                    onChange={onChange}
                    value={value}
                    {...props}
                  />
                    radio Label
                  </label>
                <input
                  type="text"
                  onChange={e => this.setState({ controlledInputValue: e.target.value })}
                  value={this.state.controlledInputValue}
                  onFocus={() => onChange({  target: { value } })}
                />
              </div>
            ),
              value: '__CUSTOM_VALUE__',
            }
          ]}
          onChange={e => {
            const output = { checked: e.target.value };

            if (e.target.value === '__CUSTOM_VALUE__') {
              output.value = this.state.controlledInputValue;
            }

            console.log(output);
          }}
        />
      </div>
    );
  }
}

export default App;
