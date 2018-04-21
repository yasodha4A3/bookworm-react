import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  // Modal,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import isEmail from 'validator/lib/isEmail';
import Button from 'react-bootstrap-button-loader';
import InlineError from '../messages/InlineError';

class SignupForm extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = 'Invalid Email';
    if (!data.password) errors.password = "can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup
          controlId="email"
          validationState={errors.email ? 'error' : null}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            name="email"
            placeholder="email@email.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </FormGroup>
        <FormGroup
          controlId="password"
          validationState={errors.password ? 'error' : null}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </FormGroup>

        <Button bsStyle="primary" type="submit">
          {loading ? 'Loading....' : 'Sign Up'}
        </Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};
export default SignupForm;
