import React from 'react';
import { Link } from 'react-router-dom';
import Urls from '../../pages/router/Urls';
import { Row, Col } from 'react-bootstrap';

const CategoriesMenuLinks = () => {
  return (
    <Row>
      <Col>
        <ul className="d-inline-block">
          <li>Μπλούζες</li>
          <li>Πουκάμισα</li>
          <li>Παντελόνια</li>
        </ul>
      </Col>
      <Col>
        <ul className="d-inline-block">
          <li>Φορέματα</li>
          <li>Μπουφάν</li>
          <li>Ζακέτες</li>
        </ul>
      </Col>
      <Col>
        <ul className="d-inline-block">
          <li>Φούστες</li>
          <li>Παπούτσια</li>
          <li>Εσώρουχα</li>
        </ul>
      </Col>
    </Row>
  );
};

export default CategoriesMenuLinks;
