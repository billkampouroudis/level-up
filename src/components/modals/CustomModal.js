import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import keepProps from '../../utils/props/keepProps';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

const CustomModal = (props) => {
  const onConfirm = () => {
    props.onConfirm();

    if (!props.stayAfterAction) {
      props.onClose();
    }
  };

  const renderCancel = () => {
    return props.onCancel ? (
      <Button onClick={props.onClose} className="custom secondary">
        {props.cancelMessage || 'Άκυρο'}
      </Button>
    ) : null;
  };

  const renderConfirm = () => {
    return props.onConfirm ? (
      <Button positive onClick={onConfirm} className="custom primary">
        {props.confirmMessage || 'Αποθήκευση'}
      </Button>
    ) : null;
  };

  return (
    <Modal {...keepProps(['onOpen', 'onClose', 'open', 'trigger'], props)}>
      <Container className="p-3 p-sm-4 p-md-5">
        <Row>
          <Col className="mb-4">
            <h1 className="h2">{props.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col>{props.children}</Col>
        </Row>
        {props.onCancel || props.onConfirm ? (
          <Row>
            <Col>
              <Modal.Actions className="text-right p-0 mt-4">
                {renderCancel()}
                {renderConfirm()}
              </Modal.Actions>
            </Col>
          </Row>
        ) : null}
      </Container>
    </Modal>
  );
};

CustomModal.propTypes = {
  title: PropTypes.string.isRequired,
  cancelMessage: PropTypes.string,
  onCancel: PropTypes.func,
  confirmMessage: PropTypes.string,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  stayAfterAction: PropTypes.bool
};

export default CustomModal;
