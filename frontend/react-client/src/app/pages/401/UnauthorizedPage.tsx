import UnauthorizedAlert from "../../shared/ui/alerts/UnauthorizedAlert.tsx";

export function UnauthorizedPage(){
    return(
        <div className="flex h-full justify-center flex-col">
            <UnauthorizedAlert/>
        </div>
        )
}