import React from 'react';

import css from './money-input.module.css';

interface PropTypes {
  value: string;
  autoFocus?: boolean;
  onFocus: () => void;
  onChange: (value: string) => void;
  onBlur: () => void;
}

interface SelectableTarget {
  target: {
    value: string;
    selectionStart: number;
    selectionEnd: number;
  };
}

export class MoneyInput extends React.Component<PropTypes> {
  ref: any = null;
  selectionFromEnd: number = -1;

  render() {
    const { value, onBlur, onFocus } = this.props;
    return (
      <input
        ref={ref => (this.ref = ref)}
        value={value}
        className={css.input}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        style={{
          width: '100%'
        }}
      />
    );
  }

  componentDidMount() {
    if (this.props.autoFocus && this.ref) {
      this.ref.focus();
    }
  }

  componentDidUpdate() {
    if (this.ref && this.selectionFromEnd !== -1) {
      const pos = this.props.value.length - this.selectionFromEnd;
      this.ref.selectionStart = pos < 0 ? 0 : pos;
      this.ref.selectionEnd = this.ref.selectionStart;
      this.ref = null;
      this.selectionFromEnd = -1;
    }
  }

  private onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> & SelectableTarget
  ) => {
    const { target } = e;
    const { value } = target;
    if (target.selectionStart !== target.selectionEnd) {
      return;
    }
    if (e.key === 'Backspace') {
      const previousChar = value[target.selectionStart - 1];
      if (previousChar && !isDigit(previousChar)) {
        target.selectionStart--;
        target.selectionEnd = target.selectionStart;
        if (previousChar === '.') {
          target.selectionEnd++;
        }
      }
    }
    if (e.key === 'Delete') {
      const nextChar = value[target.selectionStart];
      if (nextChar && !isDigit(nextChar)) {
        target.selectionStart++;
        target.selectionEnd = target.selectionStart + 1;
        if (nextChar === '.') {
          target.selectionStart--;
        }
      }
    }
  };

  private onChange = (
    e: React.ChangeEvent<HTMLInputElement> & SelectableTarget
  ) => {
    this.ref = e.target;
    this.selectionFromEnd = e.target.value.length - e.target.selectionStart;
    this.props.onChange(e.target.value);
  };
}

function isDigit(value: string): boolean {
  return /[0-9]/.test(value);
}
