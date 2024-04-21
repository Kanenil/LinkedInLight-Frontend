import useRecommendation from "../../../hooks/useRecommendation";
import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import RecommendationsList from "../items/RecommendationsList";

const RecommendationSection = ({isOwner, user}) => {
    const {isLoading, ...rest} = useRecommendation(user, isOwner);

    if (isLoading)
        return;

    return (
        <ConditionalWrapper
            condition={rest.receivedRecommendations.length > 0 || rest.givenRecommendations.length > 0 || rest.pendingRecommendations.length > 0}>
            <div id="recommendations" className="rounded-lg bg-white py-8 px-6 md:px-10">
                <SectionHeaderBlock
                    title="Recommendations"
                    onPencilClickTo="details/recommendations"
                    isOwner={isOwner}
                />

                <RecommendationsList data={rest}/>
            </div>
        </ConditionalWrapper>
    )
}
export default RecommendationSection;