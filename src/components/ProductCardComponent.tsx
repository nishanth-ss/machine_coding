import React, { useEffect, useState } from 'react';
import { BiMinus } from 'react-icons/bi';
import { PiPlus } from 'react-icons/pi';
interface IProps {
    selectedProduct: IProducts | null;
    setSelectedProduct: React.Dispatch<React.SetStateAction<IProducts | null>>;
    setProductsData: React.Dispatch<React.SetStateAction<IProductsData | null>>;
    setUpdateCardEnable: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProductsData {
    total: number;
    limit: number;
    products: IProducts[]
}

interface IProducts {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    images: string[];
}

const ProductCardComponent = ({ selectedProduct, setSelectedProduct, setProductsData, setUpdateCardEnable }: IProps) => {
    const [qty, setQty] = useState(0);
    const availableStock = selectedProduct?.stock;

    const handleUpdate = () => {
        if (!selectedProduct) return;
        const updatedStock = selectedProduct?.stock - qty;
        setSelectedProduct((prev) => prev ? { ...prev, stock: prev.stock - qty } : prev);
        setProductsData(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                products: prev.products.map(product =>
                    product.id === selectedProduct.id
                        ? { ...product, stock: updatedStock }
                        : product
                )
            };
        });
        setQty(0);
        setUpdateCardEnable(false);
    }

    return (
        <div className='absolute right-0 top-0 bg-black/90 p-5 w-150! h-full'>
            <div className='bg-white h-full rounded-md shadow-2xl w-full p-4' >
                <img src={selectedProduct?.images?.[0]} className='w-40 h-40 mx-auto' alt={selectedProduct?.title} />
                <h1 className='font-bold text-xl my-2'>{selectedProduct?.title}</h1>
                <h3 className='font-semibold text-md mb-2'>{selectedProduct?.description}</h3>
                <h3 className='font-bold mb-2'>Category: {selectedProduct?.category}</h3>
                <div className='flex items-center justify-between'>
                    <span>Price: $ {selectedProduct?.price}</span>
                    <span>Quantity: {selectedProduct?.stock}</span>
                    <span>Ratings: {selectedProduct?.rating}</span>
                </div>
                <div className='flex items-center gap-4 mt-3'>
                    <button className='flex justify-center items-center' onClick={() => setQty(prev => prev - 1)}
                        disabled={selectedProduct?.stock === 0 || qty === 0}
                    ><BiMinus /></button>
                    <input type="text" value={qty} onChange={(e) => setQty(Number(e.target.value))} className='bg-gray-200 p-2' />
                    <button className='flex justify-center items-center' onClick={() => { setQty(prev => prev + 1) }}
                        disabled={selectedProduct?.stock === qty}
                    ><PiPlus /></button>
                </div>
                <span>Available Quantity: {availableStock && availableStock - qty}</span>
                {selectedProduct?.price && <h1>Amount: $ {qty * selectedProduct?.price}</h1>}

                <button onClick={handleUpdate}>Update</button>
            </div>
        </div>
    )
}

export default ProductCardComponent