import Link from 'next/link';
import React from 'react';
import * as S from './index.styles';

const Header = () => {
  return (
    <S.Header>
      <li>
        <Link href={'/'}>Home</Link>
      </li>
      <li>
        <Link href={'/movie'}>movie</Link>
      </li>
      <li>
        <Link href={'/movie/spiderman'}>movie - spiderman (SSG)</Link>
      </li>
    </S.Header>
  );
};

export default Header;
