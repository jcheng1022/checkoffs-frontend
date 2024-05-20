import React from 'react';
import {Steps} from "antd";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";
import ArrowScrollContainer from "@/components/ArrowScrollContainer";

function ViewCollectionList({collections =[]}) {
    const router = useRouter();


    const renderItem = ({item}) => {

        const mostRecentPosts = item?.posts?.map(o => {
                        return {
                            title: <div className={'font-semibold text-white'}> {o.description} </div>,
                            description: <div className={'text-sm text-gray-400'}> {dayjs(o.date).format('MM/DD/YY')} </div>
                        }
                    })
        return (
            <div  key={item.id} className={'min-h-60 max-h-60 min-w-60 max-w-60 border rounded-lg p-3.5 hover:cursor-pointer hover:scale-105  '} onClick={() => router.push(`/group/${item.id}`)}>
                                <div  >
                                   {item.name}
                                 </div>

                                 <div >

                                     {item?.posts?.length > 0 ? (
                                         <Steps
                                             direction="vertical"
                                             size="small"
                                             progressDot
                                             current={4}
                                             items={mostRecentPosts}
                                         />
                                     ): <div className={'text-sm text-gray-500'}> No activity yet </div>}

                                </div>
                            </div>
        )
    }
    return (
        <ArrowScrollContainer list={collections} item={renderItem}  />
        // <div className={'flex justify-start w-full gap-4'}>
        //     {collections.map(collection => {
        //
        //         const mostRecentPosts = collection?.posts?.map(o => {
        //             return {
        //                 title: <div className={'font-semibold text-white'}> {o.description} </div>,
        //                 description: <div className={'text-sm text-gray-400'}> {dayjs(o.date).format('MM/DD/YY')} </div>
        //             }
        //         })
        //         return (
        //             <div  key={collection.id} className={' min-w-80 border p-3.5 '} onClick={() => router.push(`/group/${collection.id}`)}>
        //                 <div  >
        //                     {collection.name}
        //                 </div>
        //
        //                 <div className={'pt-2'}>
        //
        //                     <Steps
        //                         direction="vertical"
        //                         size="small"
        //                         progressDot
        //                         current={4}
        //                         items={mostRecentPosts}
        //                     />
        //
        //                 </div>
        //             </div>
        //         )
        //     })}
        // </div>
    );
}

export default ViewCollectionList;
