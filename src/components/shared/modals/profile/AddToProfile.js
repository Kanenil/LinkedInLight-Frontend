import React, {useState} from "react";
import XMarkIcon from "../../../../elements/icons/XMarkIcon";
import ChevronDownIcon from "../../../../elements/icons/ChevronDownIcon";
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper";
import UnderlinedLink from "../../../../elements/links/UnderlinedLink";

const AddToProfile = ({onClose}) => {
    const [selected, setSelected] = useState(-1);

    const blocks = [
        {
            id: 0, title: 'Main information', content: [
                {title: 'Add profile image', to: 'edit/image'},
                {title: 'Add general information', to: 'edit/general-information'},
                {title: 'Add education', to: '/in'},
                {title: 'Add experience', to: '/in'},
                {title: 'Add services', to: ''},
                {title: 'Add skills', to: 'edit/general-information'},
            ]
        },
        {
            id: 1, title: 'Recommended', content: [
                {title: 'Add achievements', to: '/in'},
                {title: 'Add certificates', to: '/in'},
                {title: 'Add projects', to: '/in'},
                {title: 'Add courses', to: '/in'},
                {title: 'Add recommendations', to: ''},
            ]
        },
        {
            id: 2, title: 'Additional information', content: [
                {title: 'Add volunteer experience', to: '/in'},
                {title: 'Add patents', to: '/in'},
                {title: 'Add honors and awards', to: '/in'},
                {title: 'Add publications', to: '/in'},
                {title: 'Add languages', to: 'edit/language'},
                {title: 'Add organizations', to: '/in'},
                {title: 'Add contact information', to: '/in'},
            ]
        },
    ]

    const SectionItem = ({title, content, isOpened, onClickHandler, onLinkClick}) => {
        return (
            <React.Fragment>
                <button onClick={onClickHandler}
                        className="flex flex-row items-center pt-2.5 pb-1 border-t-[0.5px] border-[#24459A80]">
                    <h1 className="font-jost text-[#2D2A33] text-lg">{title}</h1>

                    <ChevronDownIcon className="ml-auto fill-[#2D2A33] w-3.5"
                                     style={{transform: `rotate(${isOpened ? 180 : 0}deg)`}}/>
                </button>
                <ConditionalWrapper condition={isOpened}>
                    {content.map((data, index) =>
                        <UnderlinedLink key={`${title}-content-${index}`} to={data.to} onClick={onLinkClick}
                                        className="mb-2">
                            {data.title}
                        </UnderlinedLink>
                    )}
                </ConditionalWrapper>
            </React.Fragment>
        )
    }

    const onChangeSelected = (id) => {
        setSelected((val) => val === id ? -1 : id);
    }

    return (
        <div className="flex flex-col gap-2 p-5 w-[500px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <div className="flex flex-row py-2.5">
                <h1 className="font-jost font-semibold text-[#2D2A33] text-xl">Add to profile</h1>

                <button onClick={onClose} className="ml-auto">
                    <XMarkIcon className="fill-[#7D7D7D] h-4"/>
                </button>
            </div>

            {blocks.map((block, index) =>
                <SectionItem onClickHandler={() => onChangeSelected(block.id)}
                             isOpened={selected === block.id}
                             key={`blockSectionItem-${index}`}
                             onLinkClick={onClose}
                             {...block}
                />
            )}
        </div>
    )
}
export default AddToProfile;