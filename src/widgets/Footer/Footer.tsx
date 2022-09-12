import { Col, Layout, Row } from 'antd';
import { LocaleSelector } from 'entities/locale/ui/LocaleSelector';
import React, { FC } from 'react';
import { Container } from 'widgets/Container';
import './Footer.scss';

export const Footer: FC = () => (
  <Layout.Footer className="Footer">
    <Container>
      <Row>
        <Col flex="auto">
          &nbsp;
        </Col>
        <Col />
        <Col>
          <LocaleSelector />
        </Col>
      </Row>
    </Container>
  </Layout.Footer>
);
