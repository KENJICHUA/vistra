export const CardList = ({
                      items,
                      renderItem,
                      emptyState,
                      keyExtractor = (item) => item.id,
                  }) => {
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
function CardListItem({ children, isLast }) {
    return (
        <div className={`flex gap-3 ${isLast ? "" : "pb-3"}`}>
            <div className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-3 transition-colors hover:border-primary/30 sm:px-4">
                {children}
            </div>
        </div>
    );
}