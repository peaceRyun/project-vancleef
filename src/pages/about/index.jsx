import React from 'react';
import ImgMotionSec from './components/ImgMotionSec';

const AboutPage = () => {
    return (
        <div className='pt-[80px]'>
            <div className='pt-[220px] mb-[80px]'>
                <img src='/icons/logo.svg' alt='Van Cleef & Arpels' className='w-[640px] mx-auto' />
            </div>
            <div className='mb-16 w-full h-[50vh] m-auto'>
                <div className='mx-auto text-center text-[35px] font-secondary'>새로운 날의 여명</div>
            </div>

            {/* 이미지 모션 섹션 추가 */}
            <ImgMotionSec />
        </div>
    );
};

export default AboutPage;
