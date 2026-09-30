class SupabaseQueryBuilder:

    def __init__(
        self,
        supabase,
        table: str,
        columns: str = "*",
        count: str | None = None,
    ):
        self.query = (
            supabase
            .table(table)
            .select(columns, count=count)
        )

    def eq(self, column: str, value):
        if value is not None:
            self.query = self.query.eq(column, value)

        return self

    def neq(self, column: str, value):
        if value is not None:
            self.query = self.query.neq(column, value)

        return self

    def gt(self, column: str, value):
        if value is not None:
            self.query = self.query.gt(column, value)

        return self

    def gte(self, column: str, value):
        if value is not None:
            self.query = self.query.gte(column, value)

        return self

    def lt(self, column: str, value):
        if value is not None:
            self.query = self.query.lt(column, value)

        return self

    def lte(self, column: str, value):
        if value is not None:
            self.query = self.query.lte(column, value)

        return self

    def ilike(self, column: str, value: str):
        if value:
            self.query = self.query.ilike(column, value)

        return self

    def or_(self, filters: str):
        if filters:
            self.query = self.query.or_(filters)

        return self

    def order(self, column: str, desc: bool = False):
        self.query = self.query.order(
            column,
            desc=desc
        )

        return self

    def range(self, start: int, end: int):
        self.query = self.query.range(start, end)

        return self

    def paginate(self, page: int, page_size: int):
        start = (page - 1) * page_size
        end = start + page_size - 1

        return self.range(start, end)

    def build(self):
        return self.query