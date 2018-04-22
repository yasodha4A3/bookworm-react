import React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div>
        <Modal show={loading}>
          <Modal.Body>
            <h1>Validating your email...</h1>
          </Modal.Body>
        </Modal>

        {!loading &&
          success && (
            <Alert bsStyle="success">
              <strong>Thank you your account has been verified!</strong>
              <Link to="/dashboard">Go to your dashboard</Link>
            </Alert>
          )}

        {!loading &&
          !success && (
            <Alert bsStyle="danger">
              <strong>Ooops. Invalid token it seems!</strong>
            </Alert>
          )}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);
