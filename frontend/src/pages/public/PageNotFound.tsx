import { Link } from "react-router-dom";
import {ROUTES} from "../../config/RoutePaths";


export default function NotFoundPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Error 404
                </p>

                <h1 className="mt-4 text-7xl font-bold tracking-tight text-gray-900">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    Page not found
                </h2>

                <p className="mx-auto mt-3 max-w-md text-gray-500">
                    Sorry, we couldn't find the page you're looking for.
                    It may have been moved, deleted, or the URL may be incorrect.
                </p>

                <div className="mt-8 flex justify-center gap-3">
                    <Link
                        to={ROUTES.public.home}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        Go to Dashboard
                    </Link>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </main>
    );
}
