import UnauthorizedAlert from "../components/alerts/UnauthorizedAlert.tsx";

export default function UnauthorizedPage(){
    return(
        <div className="flex h-full justify-center flex-col">
            <UnauthorizedAlert/>
        </div>
        )
}