'use client';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from '../components/header';
import Image from 'next/image';
import '../styles/dragAndDropUploader.css';

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        isActive: false,
        tags: '',
        category: '',
        quantity: '',
        price: ''
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleFileSelected = (selectedFile, url) => {
        setFile(selectedFile);
        setPreviewUrl(url);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (file) {
            const data = new FormData();
            data.append('image', file);
            data.append('sku', formData.sku);
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('isActive', formData.isActive);
            data.append('tags', formData.tags);
            data.append('category', formData.category);
            data.append('quantity', formData.quantity);
            data.append('price', formData.price);

            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:5000/product/add', {
                    method: 'POST',
                    headers: {
                        'authorization': `${token}`,
                    },
                    body: data
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Product added successfully:', result);
                    // Reset the form fields
                    setFormData({
                        sku: '',
                        name: '',
                        description: '',
                        isActive: false,
                        tags: '',
                        category: '',
                        quantity: '',
                        price: ''
                    });
                    setFile(null);
                    setPreviewUrl(null);
                    // Show success message
                    setShowSuccessMessage(true);
                    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
                } else {
                    console.error('Failed to add product');
                    // Handle error response
                }
            } catch (error) {
                console.error('Error while adding product:', error);
                // Handle error
            }
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            console.log('image added successfully:', previewUrl);
            console.log('file added successfully:', file);
            setPreviewUrl(previewUrl);
            handleFileSelected(file, previewUrl);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <Header />
            <div className='pageWrapper'>
                <div className="flex justify-evenly">
                    <div className='create-options'>
                        <div className='create-option-name'>
                            <p className='create-new'>Create New</p>
                        </div>
                        <div className='create-option-name'>
                            <p>Drafts (1)</p>
                        </div>
                        <div className='create-option-name'>
                            <p><strong>Top AI Image Generators</strong></p>
                        </div>
                        <div className='ai-tools'>
                            <div className="ai-tool-wrapper flex items-center">
                                <div className='ai-tool-logo'>
                                    <img src="/images/Aitools/ideogram.jpg" alt="Ideogram" />
                                </div>
                                <div className='ai-tool-name'>
                                    <p>Ideogram</p>
                                </div>
                            </div>
                            <div className="ai-tool-wrapper flex items-center">
                                <div className='ai-tool-logo'>
                                    <img src="/images/Aitools/midjourney.png" alt="Midjourney" />
                                </div>
                                <div className='ai-tool-name'>
                                    <p>Midjourney</p>
                                </div>
                            </div>
                            <div className="ai-tool-wrapper flex items-center">
                                <div className='ai-tool-logo'>
                                    <img src="/images/Aitools/adobe-firefly.png" alt="Adobe Firefly" />
                                </div>
                                <div className='ai-tool-name'>
                                    <p>Adobe Firefly</p>
                                </div>
                            </div>
                            <div className="ai-tool-wrapper flex items-center">
                                <div className='ai-tool-logo'>
                                    <img src="/images/Aitools/nightcafe.png" alt="NightCafe" />
                                </div>
                                <div className='ai-tool-name'>
                                    <p>NightCafe</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex justify-evenly w-2/3">
                        <div className="drag-and-drop">
                            {!previewUrl && (
                                <div className="upload grid items-center justify-center" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="uploadimg">
                                        <Image src="/images/upload-cloud.png" alt="Upload Image" width={64} height={64} />
                                        <h2>Drag & Drop</h2>
                                    </div>
                                    <div className="uploadtext">
                                        <p>or select files from device</p>
                                        <p className="uploadlimit">Max. 50MB</p>
                                    </div>
                                </div>
                            )}
                            <div>
                                {previewUrl && <img src={previewUrl} alt="Preview" className="preview" />}
                            </div>
                            <p className="uploadHelpText">For best results, use high-quality images on a solid color background.</p>
                        </div>

                        <div className='post-details w-1/3'>
                            <label className="block text-sm font-medium text-gray-700">
                                Product SKU
                            </label>
                            <input
                                type="text"
                                name="sku"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Please Enter SKU"
                                onChange={handleChange}
                                value={formData.sku}
                            />

                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Short & Crisp  (Wooden Chair, Printer Pants, Pearl Earrings)"
                                onChange={handleChange}
                                value={formData.name}
                            />

                            <label className="block text-sm font-medium text-gray-700">
                                Requirement Description
                            </label>
                            <textarea
                                name="description"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Add a description in details. (Material, look and feel)"
                                onChange={handleChange}
                                value={formData.description}
                            />

                            <label className="block text-sm font-medium text-gray-700">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                name="price"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Please enter product price"
                                onChange={handleChange}
                                value={formData.price}
                            />

                            {/* <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={handleChange}
                                value={formData.category}
                            >
                                <option value="">Select Category</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Clothing">Clothing</option>
                                <option value="PrintsGraphics">Prints & Graphics</option>
                                <option value="HomeDecor">Home Decor</option>
                                <option value="Jewellery">Jewellery</option>
                                <option value="EventSetups">Event Setups</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Others">Others</option>
                            </select> */}
                            
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder=""
                                onChange={handleChange}
                                value={formData.category}
                            />



                            <label className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Please enter product quantity"
                                onChange={handleChange}
                                value={formData.quantity}
                            />

                            <label className="block text-sm font-medium text-gray-700">
                                Tags
                            </label>
                            <input
                                type="text"
                                name="tags"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter tags"
                                onChange={handleChange}
                                value={formData.tags}
                            />

                            <div className='create-post-button'>
                                <button type="submit" className="post-button">
                                    <img src="/images/post-plus.png" alt="Post" />
                                    <span>Post</span>
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            {showSuccessMessage && (
                <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
                    Post Added Successfully!
                </div>
            )}
        </div>
    );
};

export default CreatePost;
