import React from 'react';

import scroolLoading from '~/assets/scroolLoading.gif';

import { Container } from './styles';

export default function ScrollLoading() {
  return (
    <Container>
      <img src={scroolLoading} alt="" />
    </Container>
  );
}
