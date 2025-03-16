import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../button';
import Pagination from '../pagination';
import ProductInquiryItem from './ProductInquiryItem';
import { useEffect, useMemo } from 'react';
import { paginationActions } from '../../store/modules/paginationSlice';

// 이 컴포넌트의 페이지네이션 ID
const PAGINATION_ID = 'productInquiry';

const ProductInquiryList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams(); // URL에서 productId 추출

    // 리덕스 스토어에서 개별 상태로 가져오기
    const allInquiries = useSelector((state) => state.productInquiryR.inquiries);

    // 현재 상품의 ID 가져오기 (URL 또는 Redux 상태에서)
    const currentProductId = productId || useSelector((state) => state.productR?.currentProduct?.id);

    // 페이지네이션 상태를 개별적으로 가져오기
    const currPage = useSelector((state) =>
        state.paginationR && state.paginationR[PAGINATION_ID] ? state.paginationR[PAGINATION_ID].currPage : 1
    );

    const postsPerPage = useSelector((state) =>
        state.paginationR && state.paginationR[PAGINATION_ID] ? state.paginationR[PAGINATION_ID].postsPerPage : 3
    );

    // 현재 제품에 해당하는 문의만 필터링 및 날짜 기준으로 정렬
    const productInquiries = useMemo(() => {
        if (!Array.isArray(allInquiries)) return [];

        // 현재 제품에 해당하는 문의만 필터링
        const filteredInquiries = currentProductId
            ? allInquiries.filter((inquiry) => inquiry.productId === currentProductId)
            : allInquiries;

        // 날짜 기준으로 정렬
        return [...filteredInquiries].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
    }, [allInquiries, currentProductId]);

    // 문의 데이터가 변경될 때 Redux 페이지네이션 스토어에 데이터 추가
    useEffect(() => {
        if (!Array.isArray(productInquiries)) return;

        dispatch(
            paginationActions.addData({
                pageId: PAGINATION_ID,
                data: productInquiries,
            })
        );
    }, [productInquiries, dispatch]);

    // 현재 페이지에 표시할 문의 목록 계산 - useMemo로 메모이제이션
    const currentInquiries = useMemo(() => {
        const indexOfLastItem = currPage * postsPerPage;
        const indexOfFirstItem = indexOfLastItem - postsPerPage;
        return productInquiries.slice(indexOfFirstItem, indexOfLastItem);
    }, [productInquiries, currPage, postsPerPage]);

    const toInquiry = () => {
        navigate('/productinquiry');
    };

    // 총 문의 개수를 메모이제이션
    const totalInquiries = useMemo(() => productInquiries.length, [productInquiries]);

    return (
        <div className='pt-[200px] px-[330px] flex flex-col gap-[22px]'>
            <div className='w-full flex items-center justify-between'>
                <h2 className='font-secondary text-[32px] font-bold'>상품문의</h2>
                <div className='relative'>
                    <Button
                        className='w-[290px] h-[55px] font-bold text-xl flex items-center !justify-between p-[30px]'
                        onClick={toInquiry}
                    >
                        <span className='whitespace-nowrap'>문의하기</span>
                        <svg width='24' height='24' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M10 24.8784H38'
                                stroke='white'
                                strokeWidth='4'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='M24 10.8784L38 24.8784L24 38.8784'
                                stroke='white'
                                strokeWidth='4'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </Button>
                </div>
            </div>
            <ul className='w-full border-t-2'>
                {currentInquiries.length > 0 ? (
                    currentInquiries.map((inquiry) => <ProductInquiryItem key={inquiry.id} inquiry={inquiry} />)
                ) : (
                    <li className='text-center py-10 border-b'>등록된 문의가 없습니다.</li>
                )}
            </ul>
            {totalInquiries > 0 && (
                <Pagination
                    className='pt-[60px]'
                    postsPerPage={postsPerPage}
                    pageId={PAGINATION_ID}
                    currPage={currPage}
                />
            )}
        </div>
    );
};

export default ProductInquiryList;
