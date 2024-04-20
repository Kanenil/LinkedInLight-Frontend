import React, {useEffect} from "react"
import {useParams} from "react-router"
import {Helmet} from "react-helmet-async"
import {useQueryClient} from "@tanstack/react-query"
import {useSearchParams} from "react-router-dom"
import CompanyPreview from "../../components/company/CompanyPreview"
import Show from "../../elements/shared/Show";
import Loader from "../../components/shared/Loader";
import CompanyIndex from "../../components/company/CompanyIndex";
import ConfirmationModal from "../../components/shared/modals/ConfirmationModal";
import CreatePost from "../../components/shared/modals/company/CreatePost";
import useCompany from "../../hooks/useCompany";

const CompanyPage = () => {
    const {companyId} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const {company, followersCount, isAdmin, isLoading} = useCompany(companyId);

    useEffect(() => {
        const preview = searchParams.get("preview")
        const createPost = searchParams.get("createPost")

        if (preview && !isAdmin && !isLoading) {
            searchParams.delete('preview')
            setSearchParams(searchParams)
        }

        if (createPost && !isAdmin && !isLoading) {
            searchParams.delete('createPost')
            setSearchParams(searchParams)
        }
    }, [searchParams, isAdmin, isLoading])

    const queryClient = useQueryClient();

    if (isLoading)
        return <Loader/>

    return (
        <React.Fragment>
            <Helmet>
                <title>{company.companyName}</title>
            </Helmet>
            <main className='flex-grow bg-[#E7E7E7]'>
                <Show>
                    <Show.When isTrue={(!!searchParams.get('preview') && !isAdmin) || !isAdmin}>
                        <CompanyPreview
                            company={company}
                            isAdminPreview={false}
                            isAdmin={false}
                            searchParams={[searchParams, setSearchParams]}
                        />
                    </Show.When>

                    <Show.When isTrue={!!searchParams.get('preview') && isAdmin}>
                        <CompanyPreview
                            company={company}
                            isAdmin={true}
                            isAdminPreview={true}
                            searchParams={[searchParams, setSearchParams]}
                        />
                    </Show.When>

                    <Show.Else>
                        <CompanyIndex
                            company={company}
                            isAdmin={true}
                            followersCount={followersCount}
                            searchParams={[searchParams, setSearchParams]}
                        />
                    </Show.Else>
                </Show>
                <ConfirmationModal
                    isOpen={searchParams.has('createPost') && isAdmin}
                    onCloseCallback={() => {
                        searchParams.delete('createPost');
                        searchParams.delete('id');
                        setSearchParams(searchParams);
                        document.body.classList.remove('modal-open');
                    }}
                    onSaveCallback={() => {
                        queryClient.invalidateQueries(['posts', company.id])
                    }}
                    position="mx-auto md:mt-16"
                >
                    <CreatePost company={company}/>
                </ConfirmationModal>
            </main>
        </React.Fragment>
    )
}
export default CompanyPage
