import { Link , useNavigate} from "react-router-dom"

export default function BottomWarning({label,buttonText,to}){
    const navigate = useNavigate();
    return(
        <div className="py-2 text-sm flex justify-center">
            <h3>{label}</h3>
            <button className="pointer underline pl-1 cursor-pointer" onClick={()=>{navigate(to)}}>{buttonText}</button>
        </div>
    )
}