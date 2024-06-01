'use client'
import React, { useState, useEffect, useRef  } from 'react';
import Post from '../components/post';
import VendorDetails from '../components/vendorDetail';
import PostTempTwo from '../components/post-temp2';
import Header from '../components/header';

const ProductList = () => {

    return (
        <div>
        <Header/>
    <div className='pageWrapperTwo'>
        <div className="flex">
            <div className='mainProduct w-1/4'>
                <div className='mainProductWrapper'>
                    <Post/>
                    <div className='mainProductDescription'>
                        <h2>Modern Chair</h2>

                        <p className='mainProdTitle'>Title</p>
                        <p className='mainProdDesciption'>Modern Chair</p>
                        
                        <p className='mainProdTitle'>Description</p>
                        <p className='mainProdDesciption'>Brown material for seat, handles made same in saagun wood. Need in 4 piece in 2 weeks</p>

                        <p className='mainProdTitle'>Required In :</p>
                        <p className='mainProdDesciption'>10 Days</p>

                        <p className='mainProdTitle'>Links :</p>
                        <p className='mainProdDesciption'>Modern Chair</p>
                    </div>
                </div>
            </div>
            <div className='vendorsList w-2/4'>
                <div className="vendorCount flex "><p className='vendorNum'>Vendors (8)</p> <p className="flex items-center">Filter <img src="/images/filter.png"/></p></div>
                <div className='vendorsListWrapper'>
                    <VendorDetails/>
                    <VendorDetails/>
                </div>
            </div>    
            <div className='similarProduct w-1/4'>
                <a href="#"><p className='see'>See Similar</p></a>
                <div className='similarProductPosts'>
                    <Post/>
                    <PostTempTwo/>
                </div>
            </div>        
        </div>
    </div>
    </div>
    )
};

export default ProductList;
