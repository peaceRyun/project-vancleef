import React, { useEffect, useState, useRef } from 'react';
import Input from '../input';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SearchModal = ({ onSearch }) => {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // 모달이 열릴 때 GSAP 애니메이션 적용
        if (modalRef.current) {
            gsap.set(modalRef.current, {
                y: '-100%',
                opacity: 0,
            });

            gsap.to(modalRef.current, {
                y: '0%',
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out',
            });
        }

        return () => {
            document.body.style.overflow = originalStyle;
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const closeModal = () => {
        if (modalRef.current) {
            gsap.to(modalRef.current, {
                y: '-100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: onSearch,
            });
        } else {
            onSearch();
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search/${search}`);
        }
        closeModal();
    };

    const keyword = (keywordText) => {
        navigate(`/search/${keywordText}`);
        closeModal();
    };

    return (
        <div
            className='fixed w-full h-[100vh] bg-[rgba(0,0,0,0.5)] flex justify-center left-0 top-0'
            style={{ zIndex: 9999 }}
        >
            <div ref={modalRef} className='wrap bg-gray-0 p-[50px] w-full h-fit z-[1000] fixed'>
                <div className='header relative mb-5'>
                    <h2 className='text-[25px] font-secondary font-bold'>검색</h2>
                    <button className='close absolute right-0 top-0' onClick={closeModal}>
                        <img src='/icons/close.svg' alt='close' />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input
                        placeholder='검색어를 입력한 후 엔터를 누르세요.'
                        className='w-[calc(100%_-_180px)] h-[55px] mb-12'
                        value={search}
                        onChange={handleSearch}
                    />
                </form>
                <div className='popural flex flex-col gap-5'>
                    <h3 className='font-bold font-secondary text-[16px]'>인기 키워드</h3>
                    <ul className='flex gap-[9px] mb-22'>
                        <li
                            className='py-2 px-7 flex items-center justify-center bg-primary-40 rounded-[10px] cursor-pointer'
                            onClick={() => keyword('다이아몬드')}
                        >
                            다이아몬드
                        </li>
                        <li
                            className='py-2 px-7 flex items-center justify-center bg-primary-40 rounded-[10px] cursor-pointer'
                            onClick={() => keyword('루비')}
                        >
                            루비
                        </li>
                        <li
                            className='py-2 px-7 flex items-center justify-center bg-primary-40 rounded-[10px] cursor-pointer'
                            onClick={() => keyword('알함브라')}
                        >
                            알함브라
                        </li>
                    </ul>
                </div>
                <div className='concept flex flex-col gap-[18px]'>
                    <h3 className='font-bold font-secondary text-[16px]'>전시회</h3>
                    <ul className='flex gap-[18px]'>
                        <li className='flex-1 flex flex-col items-center gap-4 '>
                            <Link
                                className='flex-1 flex flex-col items-center gap-4 justify-between '
                                to='/kbrand'
                                onClick={closeModal}
                            >
                                <img
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/van-cleef-arpels-news-shakudo-2880-1620-V03.jpg.transform.vca-w2560-1x.jpg'
                                    className='object-cover w-full h-full'
                                />
                                <p className='text-4'>Shakudō</p>
                            </Link>
                        </li>
                        <Link
                            className='flex-1 flex flex-col items-center gap-4 justify-between '
                            to='/kbrand'
                            onClick={closeModal}
                        >
                            <li className='flex-1 flex flex-col items-center gap-4 '>
                                <img
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/the-art-of-movement-exhibition---wuhan/COVER-PAGE_AOMDesktop.jpg.transform.vca-w2560-1x.jpg'
                                    className='object-cover w-full h-full'
                                />
                                <p className='text-4'>움직임의 미학</p>
                            </li>
                        </Link>
                        <Link
                            className='flex-1 flex flex-col items-center gap-4 ustify-between '
                            to='/kbrand'
                            onClick={closeModal}
                        >
                            <li className='flex-1 flex flex-col items-center gap-4 '>
                                <img
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/an-eye-for-beauty-exhibition-hk/cover-desktop-4000-2500.jpg.transform.vca-w2560-1x.jpg'
                                    className='object-cover w-full'
                                />
                                <p className='text-4'>일루미나타 주얼린</p>
                            </li>
                        </Link>
                        <Link className='flex-1 flex flex-col items-center gap-4 ' to='/kbrand' onClick={closeModal}>
                            <li className='flex-1 flex flex-col items-center gap-4 '>
                                <img
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/pot-london-2024/van-cleef-arpels-poetry-of-time-exhibition-page-cover-4000-2500-lt%20(2).jpg.transform.vca-w2560-1x.jpg'
                                    className='object-cover w-full'
                                />
                                <p className='text-4'>서정의 여정</p>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
