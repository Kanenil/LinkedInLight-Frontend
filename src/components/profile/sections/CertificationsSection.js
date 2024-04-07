import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import CertificationItem from "../items/CertificationItem";
import RecommendedProfileService from "../../../services/recommendedProfileService";
import {useQuery} from "@tanstack/react-query";

const CertificationsSection = ({ user, isOwner }) => {
    const {data, isLoading} = useQuery({
        queryFn: ({queryKey}) => RecommendedProfileService.getCertificationsByProfileUrl(queryKey[1]),
        queryKey: ['certification', user.profileUrl],
        select: ({data}) => data,
        enabled: !!user.profileUrl
    })

    if(isLoading)
        return;

    return (
        <ConditionalWrapper condition={data.length > 0}>
            <div id="certifications" className="rounded-lg bg-white py-8 px-10">
                <SectionHeaderBlock
                    title="Certifications"
                    buttonTitle="Add certification"
                    onPencilClickTo="details/certifications"
                    link="edit/certification"
                    isOwner={isOwner}
                />

                {data.map((certificate, index) =>
                    <CertificationItem key={`sectionCertificates-${index}`} {...certificate} />
                )}
            </div>
        </ConditionalWrapper>
    )
}
export default CertificationsSection;