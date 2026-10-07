import {Link, useNavigate} from "react-router-dom";
import React, {ComponentType} from "react";
import {ROUTES} from "/@/config/RoutePaths.js";
import type {MouseEvent} from "react";
import {ArrowRight, LoaderCircle} from "lucide-react";
interface LoginButtonProps {
    isLoading: boolean;
}

export function LoginButton({
                                isLoading,
                            }: LoginButtonProps) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-card transition-colors duration-200 hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-60"
        >
            {isLoading ? "Signing in..." : "Sign in"}

            {isLoading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
                <ArrowRight className="h-4 w-4" />
            )}
        </button>
    );
}
export function HyperlinkText({link, title, icon: Icon}: {
    link: string,
    title: string,
    icon?: ComponentType<{ className?: string; strokeWidth?: number }>
}) {
    return (
        <Link
            to={link}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-primary transition-colors duration-150 hover:bg-primary/10 hover:text-primaryDark"
        >
            {title}
            {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2}/>}
        </Link>
    );
}


interface LinkButtonProps {
    title: string;
    route: string;
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
    disabled?: boolean;
}

export function LinkButton({
                               title,
                               route,
                               icon: Icon,
                               disabled = false,
                           }: LinkButtonProps) {
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
            <Icon
                className="h-3.5 w-3.5"
                strokeWidth={2}
            />

            {title}
        </Link>
    );
}

interface LogoClickableProps {
    className?: string;
    navigateTo?: string;
}

export function LogoClickable({
                                  className = "h-10",
                                  navigateTo = ROUTES.public.home,
                              }: LogoClickableProps) {
    const navigate = useNavigate();

    return (
        <img
            src="/Vistralogo.png"
            alt="Vistra Logo"
            className={`${className} w-auto cursor-pointer object-contain`}
            onClick={() => navigate(navigateTo)}
        />
    );
}

interface UserLogoClickableProps {
    className?: string;
    onClick?: () => void;
}

export function UserLogoClickable({className = "h-10", onClick,}: UserLogoClickableProps) {
    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: "smooth",});
        onClick?.();
    }

    return (
        <button type="button" onClick={handleClick} className="cursor-pointer">
            <img
                src="/Vistralogo.png"
                alt="Vistra Logo"
                className={`${className} w-auto object-contain`}
            />
        </button>
    );
}