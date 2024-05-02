import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
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

                <button className=' text-sm font-bold text-blue-600'>Log In</button>

            </div>
        </div>
    )
}
