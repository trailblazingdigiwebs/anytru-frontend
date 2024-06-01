'use client'
import React, { useState, useEffect, useRef  } from 'react';
import Post from '../components/post';
import VendorDetails from '../components/vendorDetail';
import PostTempOne from '../components/post-temp1';
import PostTempThree from '../components/post-temp3';
import Header from '../components/header';

const ProductApproval = () => {

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
            <div className='approvalProduct w-2/4'>
                <div className='flex gap-8 approvalProductContainer'>
                    <div className='add-rectangles'>
                        <div className='add-rect flex items-center justify-center'><img src="/images/add.png"/></div>
                        <div className='add-rect flex items-center justify-center'><img src="/images/add.png"/></div>
                        <div className='add-rect flex items-center justify-center'><img src="/images/add.png"/></div>
                        <div className='add-rect flex items-center justify-center'><img src="/images/add.png"/></div>
                        <div className='add-rect flex items-center justify-center'><img src="/images/add.png"/></div>
                    </div>
                        <div className='approval-post-details'>
                            <div className='approval-post-wrapper'>
                                <div className='approval-post-title-wrapper'><h2>Modern Chair</h2></div>
                                <div className='approval-post-details-wrapper'>
                                <form>
                                    <label className="block text-sm font-medium text-gray-700">
                                    Price Per Piece For Buyers
                                    </label>
                                    <input type="text" 
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Mention an average price per item"
                                    />

                                    <label className="block text-sm font-medium text-gray-700">
                                    Materials To Be Used
                                    </label>
                                    <input type="text" 
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Mention Details on material to be used"
                                    />

                                    <label className="block text-sm font-medium text-gray-700">
                                    Complete Description
                                    </label>
                                    <input type="text" 
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Mention in details, how the final product would look"
                                    />

                                    <label className="block text-sm font-medium text-gray-700">
                                    In How many days can you dispatch / delivery the project to user 
                                    </label>
                                    <input type="text" 
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Mention Number of days."
                                    />

                                    <label className="block text-sm font-medium text-gray-700">
                                    Other remarks
                                    </label>
                                    <input type="text" 
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    // placeholder=""
                                    />

                                    <div className="approval-button-wrapper flex gap-12 items-center">
                                        <p className='read-accept'>Read & accept T&C</p>
                                        <button className="approve-button">
                                            <span>Approve This Project</span>
                                        </button>    
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='approval-similar-products'>
                    <a href="#"><p className='see'>See Similar Products</p></a>
                    <div className='flex gap-8 justify-center mt-5' >
                    <PostTempOne/>
                    <PostTempThree/>
                    </div>
                </div>                </div>
            <div className='approvalSimilar w-1/4'>
                <a href="#"><p className='see'>More Sellers For Same Project..</p></a>
                <div className='similarProductPosts'>
                    <VendorDetails/>
                    <VendorDetails/>
                </div>
            </div>        
        </div>
    </div>
    </div>
    )
};

export default ProductApproval;
