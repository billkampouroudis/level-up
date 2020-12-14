import React from 'react';
import { Link } from 'react-router-dom';
import Urls from '../../pages/router/urls';
import { Row, Col } from 'react-bootstrap';

const CategoriesMenuLinks = () => {
  return (
    <Row>
      <Col>
        <ul className="d-inline-block">
          <li>
            <Link to={`${Urls.PRODUCTS}tops`}>Μπλούζες</Link>
          </li>
          <li>
            <Link to={`${Urls.PRODUCTS}shirts`}>Πουκάμισα</Link>
          </li>
          <li>
            <Link to={`${Urls.PRODUCTS}trousers`}>Παντελόνια</Link>
          </li>
        </ul>
      </Col>
      <Col>
        <ul className="d-inline-block">
          <li>
            <Link to={`${Urls.PRODUCTS}dresses`}>Φορέματα</Link>
          </li>
          <li>
            <Link to={`${Urls.PRODUCTS}jackets`}>Μπουφάν</Link>
          </li>
          <li>
            <Link to={`${Urls.PRODUCTS}cardigans`}>Ζακέτες</Link>
          </li>
        </ul>
      </Col>
      <Col>
        <ul className="d-inline-block">
          <li>
            <Link to={`${Urls.PRODUCTS}skirts`}>Φούστες</Link>
          </li>
          <li>
            <Link to={`${Urls.PRODUCTS}shoes`}>Παπούτσια</Link>
          </li>
          <li>
            <Link to={`${Urls.PRODUCTS}underwares`}>Εσώρουχα</Link>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default CategoriesMenuLinks;
