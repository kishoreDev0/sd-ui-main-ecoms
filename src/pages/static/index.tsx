import { AppDispatch, useAppSelector } from "@/store";
import { fetchAllStatics } from "@/store/action/static";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const StaticPages: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { statics } = useAppSelector((state) => state.staticSelector);
    const id = useParams();
    const staticPage = statics.find((s) => s.id === Number(id.id));
    useEffect(()=>{
        dispatch(fetchAllStatics());
    },[dispatch]);

    return (
        <div className="">
            <div className="">
                <div className=" py-12 w-full bg-blue-600 px-5">
                    <h1 className="text-5xl font-bold mb-4 text-white">{staticPage?.title}</h1>
                </div>
            </div>

            <div className="w-[96%] py-8 mx-auto">
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: staticPage?.description || "" }}
                />
            </div>
        </div>
    )
}