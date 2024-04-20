import CompanyNavButton from "./CompanyNavButton";
import Show from "../../elements/shared/Show";
import CompanyPostsSection from "./posts/CompanyPostsSection";
import React, {useState} from "react";
import CompanyFollowersSection from "./CompanyFollowersSection";

const links = [
    'Posts',
    'Followers'
]

const CompanySectionNavigation = ({company, isAdmin, searchParams}) => {
    const [selected, setSelected] = useState(links[0]);

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                {links.map(link => (
                    <CompanyNavButton
                        key={`companyNavButton-${link}`}
                        onClick={() => setSelected(link)}
                        isActive={selected === link}
                    >
                        {link}
                    </CompanyNavButton>
                ))}
            </div>

            <Show>
                <Show.When isTrue={selected === links[0]}>
                    <CompanyPostsSection isAdmin={isAdmin} company={company} searchParams={searchParams}/>
                </Show.When>

                <Show.When isTrue={selected === links[1]}>
                    <CompanyFollowersSection company={company}/>
                </Show.When>
            </Show>
        </>
    )
}
export default CompanySectionNavigation;