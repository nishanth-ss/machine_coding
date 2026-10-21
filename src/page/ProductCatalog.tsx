import React, { useEffect, useState } from 'react';
import ProductCardComponent from '../components/ProductCardComponent';

interface IProductsData {
    total: number;
    limit: number;
    products: IProducts[];
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

interface IProductData {
    product: IProducts;
    setUpdateCardEnable: React.Dispatch<React.SetStateAction<boolean>>;
    updateCardEnable: boolean;
    setSelectedProduct: React.Dispatch<React.SetStateAction<IProducts | null>>
}

const ProductCard = ({ product, setUpdateCardEnable, updateCardEnable, setSelectedProduct }: IProductData) => {
    return (
        <div className='bg-white h-full rounded-md shadow-2xl w-100 p-4' onClick={() => [setUpdateCardEnable(!updateCardEnable), setSelectedProduct(product)]}>
            <img src={product.images?.[0]} className='w-40 h-40 mx-auto' alt={product.title} />
            <h1 className='font-bold text-xl'>{product.title}</h1>
            <h3 className='font-semibold text-md'>{product.description}</h3>
            <h3 className='font-bold'>{product.category}</h3>
            <div className='flex items-center justify-between'>
                <span>Price: $ {product.price}</span>
                <span>Quantity: {product.stock}</span>
                <span>Ratings: {product.rating}</span>
            </div>
        </div>
    )
}

const ProductCatalog = () => {
    const [productsData, setProductsData] = useState<IProductsData | null>(null);
    const [updateCardEnable, setUpdateCardEnable] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(null);
    const totalPages = productsData?.total && Math.ceil(productsData?.total / 10);


    useEffect(() => {
        (async () => {
            await fetch("https://dummyjson.com/products")
                .then(res => res.json())
                .then(finalRes => setProductsData(finalRes))
        })()
    }, []);

    return (
        <div>
            <h1 className='text-2xl font-bold text-center'>Product Catalog</h1>
            <div className='flex flex-wrap gap-5'>
                {
                    productsData?.products?.map((product: IProducts) => (
                        <div key={product.id}>
                            <ProductCard product={product} setUpdateCardEnable={setUpdateCardEnable} updateCardEnable={updateCardEnable}
                                setSelectedProduct={setSelectedProduct}
                            />
                        </div>
                    ))
                }
                {updateCardEnable && <ProductCardComponent selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    setProductsData={setProductsData}
                    setUpdateCardEnable={setUpdateCardEnable}
                />}
            </div>
            {
                Array.from({length:totalPages || 0},(_,i)=>(
                    <button key={i}>{i+1}</button>
                ))
            }
        </div>
    )
}

export default ProductCatalog