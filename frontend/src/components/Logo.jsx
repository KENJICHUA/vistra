export function Logo({ className = "h-8" }) {
    return (
        <img
            src="/Vistralogo.png"
            alt="Vistra Logo"
            className={`${className} w-auto object-contain`}
        />
    );
}
