import React from 'react'

export default function NavBar() {
    const links = [
        {
            name: "Tarp Orders",
            url:"/tarp_orders"
        },
        {
            name: "Products",
            url:"/products"
        }
    ];
  
  
    return (
    <div className=' tw-z-10 tw-max-h-[100px] tw-min-h-[60px] tw-flex tw-items-center tw-justify-center tw-fixed tw-w-[100%] tw-bg-blue-400  tw-text-white tw-p-3'>
       <ul className=' tw-flex tw-justify-center tw-items-center tw-bg-slaste-500 tw-gap-9 tw-font-extrabold'>
        {
            links?.map((e, i) => {
                return (
                    <li className=' hover:tw-border-b-4 tw-border-white   '>
                        <a  href={e.url}>{e.name.toUpperCase()}</a>
                    </li>
                )
            })
        }
       </ul>
    </div>
  )
}
