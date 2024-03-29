import {useEffect, useState} from "react";
import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import CertificationItem from "../items/CertificationItem";
import {recommendedProfileService} from "../../../services/recommendedProfileService";

const CertificationsSection = ({ user }) => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        recommendedProfileService
            .getCertifications()
            .then(({data}) => setCertificates(data))
    }, [user])

    return (
        <ConditionalWrapper condition={certificates.length > 0}>
            <div id="certifications" className="rounded-lg bg-white py-8 px-10">
                <SectionHeaderBlock
                    title="Certifications"
                    buttonTitle="Add certification"
                    onPencilClickTo="details/certifications"
                    link="edit/certification"
                />

                {certificates.map((certificate, index) =>
                    <CertificationItem key={`sectionCertificates-${index}`} {...certificate} />
                )}
            </div>
        </ConditionalWrapper>
    )
}
export default CertificationsSection;