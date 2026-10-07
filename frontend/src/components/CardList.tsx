import { ReactNode } from "react";

interface CardListProps<T> {
    items: T[];
    renderItem: (item: T) => ReactNode;
    emptyState: ReactNode;
    keyExtractor: (item: T) => string | number;
}

export function CardList<T>({
                                items,
                                renderItem,
                                emptyState,
                                keyExtractor,
                            }: CardListProps<T>) {
    if (items.length === 0) {
        return emptyState;
    }

    return (
        <div className="flex flex-col">
            {items.map((item, index) => (
                <CardListItem
                    key={keyExtractor(item)}
                    isLast={index === items.length - 1}
                >
                    {renderItem(item)}
                </CardListItem>
            ))}
        </div>
    );
}

interface CardListItemProps {
    children: ReactNode;
    isLast?: boolean;
}

function CardListItem({
                          children,
                          isLast = false,
                      }: CardListItemProps) {
    return (
        <div className={`flex gap-3 ${isLast ? "" : "pb-3"}`}>
            <div
                className="
                    min-w-0 flex-1
                    rounded-xl
                    border border-border
                    bg-background
                    px-3 py-3
                    transition-colors
                    hover:border-primary/30
                    sm:px-4
                "
            >
                {children}
            </div>
        </div>
    );
}