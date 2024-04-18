import {useAlertContext} from "../../providers/AlertProvider";
import Show from "../../elements/shared/Show";
import CheckIcon from "../../elements/icons/CheckIcon";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const Alert = () => {
    const {alerts, clear} = useAlertContext();
    const [parent] = useAutoAnimate({
        easing: 'ease-in-out'
    });

    return (
        <div ref={parent} className="fixed bottom-[80vh] md:bottom-3 left-4 flex flex-col gap-4">
            {
                [...alerts].reverse().map(({id, status, message}) => (
                    <div key={`alert-${id}`} style={{boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.25)"}}
                         onClick={() => clear(id)}
                         className="flex flex-row items-center gap-3 rounded-lg bg-white/50 hover:bg-gray-200 cursor-pointer px-4 py-1">
                        <Show>
                            <Show.When isTrue={status === 'success'}>
                                <CheckIcon className="fill-[#24459A] w-5 h-5"/>
                            </Show.When>
                        </Show>

                        <h1 className="text-[#2D2A33] font-jost font-light text-lg">{message}</h1>
                    </div>
                ))
            }
        </div>
    )
}
export default Alert;