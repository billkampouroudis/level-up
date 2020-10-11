import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Counter from '../components/Counter';

const HomePage = () => {
  return (
    <>
      <Container fluid className="bg-primary mb-5">
        <Row>
          <Col>
            <header>
              <h1 className="text-white">Home</h1>
            </header>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Counter />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              ullamcorper suscipit tellus, quis convallis sapien. Ut sit amet
              odio ex. Ut tellus augue, blandit sed erat ac, dictum hendrerit
              enim. Proin quis lacinia nisi. Vestibulum eu tristique metus. Sed
              ut dui non purus sollicitudin venenatis vitae nec leo. Ut gravida,
              nunc nec accumsan blandit, odio lorem placerat purus, in viverra
              odio lectus sit amet justo. Praesent commodo eu nibh convallis
              placerat. Integer fermentum semper blandit. Mauris cursus nunc
              sem. Pellentesque in congue metus, quis maximus libero. Donec sed
              quam massa. Nulla egestas diam eget eros placerat, quis mattis ex
              fermentum. Vestibulum placerat eros id sapien hendrerit, blandit
              faucibus quam luctus. Etiam in ante ipsum. Proin ac dolor sit amet
              magna congue mollis laoreet eu ipsum. In hac habitasse platea
              dictumst. Quisque ullamcorper elit at congue fringilla. Nullam
              luctus venenatis nisi, condimentum lacinia nunc tristique vel.
              Suspendisse egestas in massa eget iaculis. Cras et arcu sem.
              Mauris id tempus augue.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
