import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from '../../pages/router/Urls';
import { Select } from 'semantic-ui-react';
import { Locked32 } from '@carbon/icons-react';

// Component
import ProductCard from './ProductCard';
import Loading from '../Loading';
import Counter from '../misc/Counter';
import Button from '../Ui/Button';

const ProductOptions = (props) => {
  const { product } = props;

  const mapSizes = {
    XXS: 'XX-Small',
    XS: 'X-Small',
    S: 'Small',
    M: 'Medium',
    L: 'Large',
    XL: 'X-Large',
    XXL: 'XX-Large',
    XXXL: 'XXX-Large',
    XXXXL: 'XXXX-Large'
  };

  const sizes = () => {
    if (product.sizes) {
      return product.sizes.map((size) => {
        return { key: size, value: size, text: mapSizes[size] || size };
      });
    }

    return [];
  };

  return (
    <Container fluid className="product-options">
      <Row>
        <Col>
          <Link to={urls.SELLERS + product.seller.id}>
            {product.seller.name}
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="h2 mb-4">{product.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="text-bold mb-1">Μέγεθος</label>
          <Select placeholder="Επέλεξε μέγεθος" options={sizes()} />
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="text-bold mb-1">Ποσότητα</label>
          <Counter />
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="text-bold mb-1 d-block">Τιμή</label>
          <div className="d-flex align-items-center">
            <span className="original-price delete align-items-center mr-2">
              35.00$
            </span>

            <Locked32 />
            <span className="discount-price align-items-center">25.00$</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button text="test" className="custom primary" />
        </Col>
      </Row>
    </Container>
  );
};

ProductOptions.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductOptions;
