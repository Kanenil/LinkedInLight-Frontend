import XMarkIcon from "../../../../elements/icons/XMarkIcon";
import React, {useEffect, useState} from "react";
import PlusIcon from "../../../../elements/icons/PlusIcon";
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper";
import PrimaryButton from "../../../../elements/buttons/PrimaryButton";
import TextDown from "../../../../elements/shared/TextDown";
import useOverflow from "../../../../hooks/overflow";
import {profileService} from "../../../../services/profileService";
import ModalHeader from "../ModalHeader";

const SKILLS_STORE = "SAVED-SKILLS"

const EditGeneralInformation = ({onClose, onSave, onChange}) => {
    const initValues = JSON.parse(localStorage.getItem(SKILLS_STORE) || '[]');

    const { isOverflow, containerRef, contentRef } = useOverflow();
    const [about, setAbout] = useState("");
    const [isAddSkill, setIsAddSkill] = useState(false);
    const [options, setOptions] = useState(initValues)
    const [skills, setSkills] = useState([]);
    const [userSkills, setUserSkills] = useState([]);
    const [userAbout, setUserAbout] = useState("");

    useEffect(() => {
        profileService.getAbout()
            .then(({data}) => {
                setAbout(data);
                setUserAbout(data);
            })

        profileService.getSkills()
            .then(({data}) => {
                setUserSkills(data);
                setSkills(data.map(skill => skill.name))
                setOptions([...options.filter(opt => !data.map(v => v.name).includes(opt.label))])
            })
    }, [])

    const handleChangeSelect = (e) => {
        if(skills.map(skill => skill.toLowerCase()).indexOf(e.label.toLowerCase()) === -1) {
            const newArray = [...skills, e.label];

            setSkills(newArray);
            setIsAddSkill(false);
            setOptions([...initValues.filter(opt => !newArray.includes(opt.label))])

            onChange();
        }

        const saveInStorage = (arr) => {
            localStorage.setItem(SKILLS_STORE, JSON.stringify(arr));
        }

        if(options.length === 0) {
            saveInStorage([e]);
        }

        if (initValues.length > 0 && initValues.filter(
            (option) =>
                option.label.toLowerCase() === e.label.toLowerCase()).length === 0) {
            saveInStorage([...initValues, e]);
        }
    }

    const onRemoveItem = (skill) => {
        const newArray = skills.filter(val => val !== skill);

        setSkills(newArray)
        setOptions(initValues.filter(opt => !newArray.includes(opt.label)))

        onChange();
    }

    const onSaveClick = async () => {
        if(userAbout !== about)
            await profileService.editAbout(about.toString());

        for (const skill of skills) {
            if(userSkills.filter(userSkill => userSkill.name === skill).length === 0)
                await profileService.addSkill(skill);
        }

        for (const userSkill of userSkills) {
            if(skills.filter(skill => skill === userSkill.name).length === 0)
                await profileService.removeSkill(userSkill.id);
        }

        onSave();
    }

    return (
        <div className="flex flex-col gap-2.5 py-5 px-8 w-[750px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <ModalHeader title="Edit general information" onClose={onClose}/>

            <div id="container" ref={containerRef} className={`max-h-[456px] overflow-x-hidden overflow-y-${isOverflow ? 'scroll' : 'hidden'}`}>
                <div ref={contentRef}>
                    <div className="flex flex-col pt-[5px] pl-[20px] pr-[15px] pb-[10px] gap-2.5">
                        <h1 className="font-jost font-light text-sm text-[#2D2A33]">
                            On <span className="font-medium">Job for You</span>, you can share your years of experience, choose
                            your industry and specify your skills.
                            Describe your accomplishments and previous work experience to create a complete picture of your
                            career
                        </h1>

                        <textarea
                            className="mt-[15px] resize-none border-[0.5px] border-[#556DA9] rounded-lg text-sm font-jost font-light"
                            placeholder="Description..."
                            onChange={(e) => {onChange(); setAbout(e.target.value);}}
                            value={about}
                            rows={7}
                        />
                    </div>

                    <div className="flex flex-col pt-[5px] pl-[20px] pr-[15px] pb-[10px] gap-[5px]">
                        <h1 className="font-jost text-[#2D2A33] font-semibold">Skills</h1>

                        <h3 className="font-jost text-sm text-[#2D2A33] font-light">
                            Show your strengths - add up to 5 key skills that you would like to be recognized for. They will
                            automatically appear in your "Skills" section on <span className="font-medium">Job for You</span>
                        </h3>

                        {
                            skills.map((val, index) =>
                                <div key={`skill-${index}`}
                                     className="flex flex-row items-center gap-2.5 pl-2.5 pr-[5px]"
                                >
                                    <button onClick={() => onRemoveItem(val)}>
                                        <XMarkIcon className="fill-[#7D7D7D] h-3"/>
                                    </button>


                                    <h1 className="font-jost text-lg font-medium text-[#556DA9]">{val}</h1>
                                </div>
                            )
                        }

                        <ConditionalWrapper condition={isAddSkill}>
                            <TextDown
                                options={options}
                                placeHolder='Skill (ex: Project management)'
                                onChange={(e) => handleChangeSelect(e)}
                            />
                        </ConditionalWrapper>
                        <ConditionalWrapper condition={!isAddSkill && skills.length !== 5}>
                            <button onClick={() => setIsAddSkill(true)}
                                    className="group flex flex-row gap-2.5 items-center mt-2.5 w-fit px-2.5 py-[5px] text-sm rounded-full border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:text-[#556DA9] active:text-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF]">
                                <PlusIcon
                                    className="fill-[#7D88A4] group-hover:fill-[#556DA9] group-active:fill-[#24459A] h-3"/>
                                Add skill
                            </button>
                        </ConditionalWrapper>
                        <ConditionalWrapper condition={skills.length === 5}>
                            <h3 className="text-[#2D2A33] font-light font-sm">You reached maximum of 5 skills</h3>
                        </ConditionalWrapper>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-2.5 pb-1 gap-5 border-t-[0.5px] border-[#24459A80]">
                <PrimaryButton onClick={onSaveClick}>
                    Save
                </PrimaryButton>
            </div>
        </div>
    )
}
export default EditGeneralInformation;