import {Plus} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "/@/config/RoutePaths.js";

export const LinkButton = ({
                                title,
                                route,
                                disabled = false,
                            }) => {
    return (
        <Link
            to={route}
            aria-disabled={disabled}
            onClick={(event) => {
                if (disabled) {
                    event.preventDefault();
                }
            }}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 ${
                disabled
                    ? "cursor-not-allowed bg-primary/50"
                    : "bg-primary hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-md active:translate-y-0"
            }`}
        >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            {title}
        </Link>
    );
};

export function LogoClickable({className = "h-10", navigateTo = ROUTES.public.home}) {
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