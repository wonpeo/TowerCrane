import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
      <Link to="/signin">
        <button>로그인</button>
      </Link>
    </div>
  );
}
export {};
