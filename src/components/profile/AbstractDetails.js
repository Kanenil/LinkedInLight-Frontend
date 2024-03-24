import React, {useEffect, useState} from "react";
import ArrowRightIcon from "../../elements/icons/ArrowRightIcon";
import {Link} from "react-router-dom";
import PlusIcon from "../../elements/icons/PlusIcon";

const AbstractDetails = ({user, onClickBack, promise, detail, edit, itemComponent}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        promise
            .then(({data}) => {
                if (data.length === 0)
                    onClickBack();

                setData(data)
            })
    }, [user])

    return (
        <div className="flex flex-col gap-2.5 rounded-lg bg-white py-8 px-10">
            <div className="flex flex-row items-center font-jost pb-2.5 border-b-[0.5px] border-[#24459A80]">
                <button onClick={onClickBack}>
                    <ArrowRightIcon className="w-4 mr-3.5 fill-[#24459A]" style={{transform: `rotate(180deg)`}}/>
                </button>

                <h1 className="font-medium text-2xl text-[#2D2A33]">{detail}</h1>

                <Link to={`edit/${edit}`} className="ml-auto">
                    <PlusIcon className="w-4 fill-[#556DA9]"/>
                </Link>
            </div>
            {
                data.map((item, index) =>
                    React.cloneElement(itemComponent, {
                        key: `abstractDetail-${index}`,
                        editPath: `edit/${edit}/${item.id}`,
                        ...item
                    })
                )
            }
        </div>
    )
}
export default AbstractDetails;