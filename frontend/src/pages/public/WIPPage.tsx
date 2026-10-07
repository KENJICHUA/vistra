import { Construction } from "lucide-react";

import Card from "/@/components/Card";

export default function WIPPage() {
    return (
        <div className="space-y-6">
            <Card
                title="Coming Soon"
                description="This feature is currently under development."
                icon={Construction}
            >
                <div className="flex min-h-[240px] items-center justify-center">
                    <div className="text-center">
                        <p className="text-sm text-textMuted">
                            Please check back later.
                        </p>

                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-textMuted">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            Work in Progress
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
