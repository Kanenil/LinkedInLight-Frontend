import React from 'react'
import LanguageDetails from "./details/LanguageDetails";

const DetailsPage = ({user, detail, onSaveCallback}) => {
    const modals = [
        {
            route: ["languages"],
            children: <LanguageDetails/>,
            props: {
                user
            }
        }
    ]

    return (
        <React.Fragment>
            {
                modals
                    .filter(modal => modal.route.includes(detail))
                    .map(modal =>
                        React.cloneElement(modal.children, {
                            key: `details-${modal.route[0]}`,
                            ...modal.props
                        })
                    )
            }
        </React.Fragment>
    )
}
export default DetailsPage;