import React, { useEffect, useState } from 'react';
import CheckBox from '../checkbox';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartItem, removeCart } from '../../store/modules/cartSlice';
import { purchaseActions } from '@/store/modules/purchaseSlice';

const MypageCartlist = ({ cart, setSelectedItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

	const handleClick = () => {
		if (selectedItems.length > 0) {
			dispatch(purchaseActions.setItem(selectedItems));
			navigate('/purchase');
		} else {
			alert('구매하실 상품을 선택하세요');
		}
	};

  // cart 상태 변경 시 localStorage 업데이트
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      currentUser.cart = cart;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [cart]);

  const directPurchase = item => {
    dispatch(purchaseActions.setItem(item));
    navigate('/purchase');
  };

  useEffect(() => {
    setSelectedItem(cart.filter(item => item.isagree));
  }, [cart, setSelectedItem]);
  return (
    <div className="flex flex-col space-y-4">
      {cart.length > 0 ? (
        cart.map(item => (
          <div
            key={item.productnumber}
            className="flex flex-wrap items-start space-x-4 pt-[25px] pb-[25px] justify-between"
          >
            <div className="flex gap-4">
              <div className="flex gap-3">
                <CheckBox
                  id={`checkbox-${item.productnumber}`}
                  checked={item.isagree}
                  onChange={checked =>
                    dispatch(
                      toggleCartItem({
                        productnumber: item.productnumber,
                        isagree: checked,
                      }),
                    )
                  }
                  className="w-5 h-5"
                >
                  {item.name}
                </CheckBox>

                <div>
                  <img
                    src={
                      Array.isArray(item.objectimage)
                        ? item.objectimage[0]
                        : item.objectimage
                    }
                    alt="상품 이미지"
                    className="w-[100px] h-[100px] object-cover border border-gray-200"
                  />
                </div>
              </div>
              <div className="font-regular text-[12px] max-w-[125px] break-words">
                {item.title}
              </div>
            </div>
            <div className="flex space-x-12">
              <div className="text-[12px] font-regular">
                {item.quantity || 1}
              </div>
              <div className="text-[12px] font-regular">
                {item.price
                  ? `${item.price.toLocaleString()}원`
                  : '가격 정보 없음'}
              </div>
              <div className="text-[12px] font-regular items-center">
                무료배송
              </div>
              <div className="flex-col items-center space-y-[6px]">
                <Button
                  onClick={() => directPurchase(item.productnumber)}
                  variant="secondary"
                  className="text-[12px] w-[89px] h-[29px] border border-[#D9D9D9] flex items-center justify-center"
                >
                  바로주문
                </Button>
                <Button
                  onClick={() => dispatch(removeCart(item.productnumber))}
                  variant="secondary"
                  className="text-[12px] w-[89px] h-[29px] border border-[#D9D9D9] flex items-center justify-center"
                >
                  상품 삭제
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="flex justify-center items-center text-[12px] h-[40px] pt-[55px] pb-[55px]">
          장바구니에 상품이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MypageCartlist;
