import {useNavigate} from "react-router-dom";
import {ROUTES} from "../config/RoutePaths.js";

export function LogoClickable({ className = "h-10", navigateTo = ROUTES.public.home }) {
    const navigate = useNavigate();

    return (
        <img
            src="/Vistralogo.png"
            alt="Vistra Logo"
            className={`${className} w-auto object-contain cursor-pointer`}
            onClick={() => navigate(navigateTo)}
        />
    );
}