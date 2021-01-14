import React from 'react';
import { APP_NAME } from '../constants';

// Utils
import { levels } from '../utils/levels/levels';

// Components
import { Table } from 'semantic-ui-react';
import { Container, Row, Col } from 'react-bootstrap';
import SEO from '../components/misc/seo/SEO';
import Illustration from '../components/misc/illustrations/Illustration';

// Images
import SuccessfullPurchaseIl from '../assets/illustrations/undraw_successful_purchase_uyin.svg';
import UpdateIl from '../assets/illustrations/undraw_update_uxn2.svg';
import WebShoppingIl from '../assets/illustrations/undraw_web_shopping_dd4l.svg';
import RatingsIl from '../assets/illustrations/undraw_reviews_lp8w.svg';

const AboutPage = () => {
  return (
    <>
      <SEO title={`Σχετικά με το ${APP_NAME}`} />
      <Container className="pt-6">
        <Row>
          <Col>
            <header className="App-header">
              <h1>Σχετικά με το Levl</h1>
            </header>
          </Col>
        </Row>
      </Container>

      <section>
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={{ span: 4, order: 2 }}>
              <Illustration
                img={SuccessfullPurchaseIl}
                alt="Επιτυχής αγορά"
                imageClassName="w-100 px-8 px-md-2"
              />
            </Col>
            <Col md={{ span: 8, order: 1 }}>
              <h2>Τι είναι το {APP_NAME}</h2>
              <p>
                Το levl είναι μία πλατφόρμας η οποία χρησιμοποιώντας το
                gamification έχει σκοπό κάνει την online αγορά προϊόντων
                ένδυσης/υπόδησης ευκολότερη και πιο διασκεδαστική.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg-background-dark">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={4}>
              <Illustration
                img={UpdateIl}
                imageClassName="w-100 px-8 px-md-2"
              />
            </Col>
            <Col md={8}>
              <h2>Πώς δουλεύει;</h2>
              <p>
                Καθώς κερδίζετε XP από τις αγορές ή τις κριτικές που αφήνετε σε
                προϊόντα, ανεβένετε level ξεκλειδώνοντας νέες προσφορές και
                μεγαλύτερες εκπτώσεις.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={{ span: 4, order: 2 }}>
              <Illustration
                img={WebShoppingIl}
                imageClassName="w-100 px-8 px-md-2"
              />
            </Col>
            <Col md={{ span: 8, order: 1 }}>
              <h2>Καταστήματα</h2>
              <p>
                Κάθε κατάστημα έχει το δικό του χώρο στο levl ενώ οι παραγγελίες
                πραγματοποιούνται με το πάτημα ενός κουμπιού μέσα από το levl!
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg-background-dark">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={4}>
              <Illustration
                img={RatingsIl}
                imageClassName="w-100 px-8 px-md-2"
              />
            </Col>
            <Col md={8}>
              <h2>Κριτικές</h2>
              <p>
                Μετά την αγορά ενός προϊόντος, έχετε τη δυνατότητα να κερδίσετε
                περισσότερα XP αφήνοντας μια κριτική με τις εντυπώσεις σας από
                το συγκεκριμένο προϊόν, έτσι ώστε μελλοντικοί αγοράστές να έχουν
                μια καλύτερη εικόνα του αν το συγκεκριμένο προϊόν καλύπτει τις
                ανάγκες τους.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg-background-dark">
        <Container>
          <Row>
            <Col>
              <h2>Πίνακας level</h2>
              <p className="mb-4">
                Παρακάτω μπορείτε να βρείτε αναλυτικά το ποσοστό έκπτωσης και τα
                XP που χρειάζονται για κάθε level.
              </p>
              <Table celled basic className="bg-white">
                <Table.Body>
                  {levels().map((level) =>
                    level.key ? (
                      <Table.Row key={level.key}>
                        <Table.Cell>Level {level.key}</Table.Cell>
                        <Table.Cell>{level.minXp} XP</Table.Cell>
                        <Table.Cell>-{level.discount * 100}%</Table.Cell>
                      </Table.Row>
                    ) : null
                  )}
                </Table.Body>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutPage;
