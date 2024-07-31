import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {fetch_hello} from "../state/hello/epics.ts";

export default function HelloPage(){
    const dispatch = useDispatch();

    const msg = useSelector((state: RootState) => state.hello.msg);

    return (
        <>
            <div className="flex justify-center h-dvh items-center  bg-gray-100" >
                <div className="flex flex-col items-start">
                    <div className=" h-32 w-64  mb-4 rounded-md px-3.5 py-2.5 bg-white shadow-md ">
                        {msg}
                    </div>
                    <button
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => dispatch(fetch_hello())}>Fetch hello</button>
                </div>
            </div>
        </>
    )
}