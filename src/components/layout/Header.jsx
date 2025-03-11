import React, { useState } from 'react';
import SearchModal from './SearchModal';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const onSearch = () => {
    setIsSearch(!isSearch);
  };
  return (
    <header className="w-full p-330 h-20 flex items-center justify-between fixed bg-gray-0 z-[1000]">
      <div className="left flex items-center gap-[55px]">
        <Link href="/home">
          <h1>
            <img
              src="/icons/logo.svg"
              alt="Van Cleef & Arpels"
              className="w-[340px]"
            />
          </h1>
        </Link>
        <nav>
          <ul>
            <Link href="#">
              <li className="font-secondary text-heading-m font-bold">SHOP</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="util flex gap-[30px] items-center">
        <button onClick={onSearch} className=" cursor-pointer">
          <img src="/icons/search.svg" alt="검색" className="w-8 h-8" />
        </button>
        <Link href="#">
          <span className="font-secondary text-heading-m font-bold">LOGIN</span>
        </Link>
      </div>
      {isSearch && <SearchModal onSearch={onSearch} />}
    </header>
  );
};

export default Header;
