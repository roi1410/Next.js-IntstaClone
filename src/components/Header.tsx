"use client"
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoIosAddCircleOutline, IoMdLogOut } from "react-icons/io";
import { HiCamera } from 'react-icons/hi';
import { AiOutlineAim, AiOutlineClose } from 'react-icons/ai';
import { File } from 'buffer';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase"
import { error } from 'console';
export default function Header() {
    const { data: session } = useSession()
    const defaultImg = "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
    const [isOpen, setIsOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | undefined | null>(null)
    const [selectedImageObj, setSelectedImageObj] = useState<globalThis.File | null>(null)
    const [ImageLoadingUpload, setImageLoadingUpload] = useState(false)
    function addImagePost(e: React.ChangeEvent<HTMLInputElement> | undefined) {
        if (e !== undefined) {
            const file = e.target.files?.[0]
            if (file) {
                setSelectedImage(URL.createObjectURL(file))
                setSelectedImageObj(file)
            }
        }
    }
    async function addImageToStorage() {
        if (selectedImageObj) {

            setImageLoadingUpload(true)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + "_" + selectedImageObj.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, selectedImageObj)
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(progress + "%");
            }, (error) => {
                console.log(error);

                setSelectedImage(null)
                setImageLoadingUpload(false)
                setSelectedImage(null)

            }, () => {
                

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {


                    setSelectedImage(downloadURL)
                    setImageLoadingUpload(false)

                })
            }

            )
        }



    }

    return (
        <div className=' shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
            <div className=' flex justify-between items-center max-w-6xl mx-auto' >

                <Link href={'/'}>
                    <Image
                        className='hidden lg:inline-flex'
                        src="/Instagram_logo_black.webp"
                        width={96}
                        height={96}
                        alt='Ops' />
                </Link>
                <Link href={'/'}>
                    <Image
                        className='inline-flex lg:hidden '
                        src="/800px-Instagram_logo_2016.webp"
                        width={40}
                        height={40}
                        alt='Ops' />
                </Link>
                <input type="text"
                    placeholder='Search'
                    className='bg-gray-50 border border-gray-200 rounded text-sm-full py-2 px-4 max-w-[210px]' />


                {session ? (
                    <div className='flex items-center '>


                        <IoIosAddCircleOutline className='text-3xl cursor-pointer hover:scale-125 transition duration-300  ' onClick={() => setIsOpen(true)} />
                        <img className='bg-contain h-12 w-12 rounded-full  ' src={session?.user?.image ? session.user.image : defaultImg} alt="" />
                        <button onClick={() => signOut()} className='ml-5 scale-150'><IoMdLogOut /></button>

                    </div>

                ) : (

                    <button onClick={() => signIn()} className=' text-sm font-bold text-blue-600'>Log In</button>
                )}

                {isOpen && (
                    <Modal isOpen={isOpen} ariaHideApp={false} onRequestClose={() => setIsOpen(false)} className=' flex flex-col items-center  max-lg-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md'>
                        {selectedImage ? <img onClick={() => setSelectedImage(null)} className={`max-h-[250px] w-full object-cover cursor-pointer${ImageLoadingUpload&&'animate-pulse'}`} src={selectedImage} alt="" /> : (
                            <label>
                                <HiCamera className='text-4xl text-gray-400 cursor-pointer' />
                                <input type="file" className='hidden' accept='image/*' onChange={(e) => addImagePost(e)} />
                            </label>
                        )
                        }
                        <input type="text" maxLength={150} placeholder='Please enter your caption ...' className='m-4 border-none text-center w-full focus:ring-0 outline-none ' />
                        <button onClick={() => addImageToStorage()} className='w-full bg-red-500 text-white p-2 shadow-md  rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'> Upload Post</button>
                        <AiOutlineClose className=' cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300' onClick={() => setIsOpen(false)} />



                    </Modal>
                )}







            </div>
        </div>
    )
}
