import { Component } from 'react';
import style from './ErrorButton.module.scss';

interface ErrorButtonState {
  error: Error | null;
}

class ErrorButton extends Component<unknown, ErrorButtonState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleCustomError = () => {
    this.setState({ error: new Error('Custom error triggered') });
  };

  componentDidUpdate(
    _prevProps: unknown,
    prevState: Readonly<ErrorButtonState>
  ): void {
    if (prevState.error !== this.state.error) {
      throw this.state.error;
    }
  }

  render() {
    return (
      <button className={style.error_btn} onClick={this.handleCustomError}>
        Error
      </button>
    );
  }
}

export { ErrorButton };
