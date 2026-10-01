$MigrationDir = Join-Path $PSScriptRoot "..\migrations"

$Migration = Get-ChildItem `
    -Path $MigrationDir `
    -Filter "*.sql" |
    Sort-Object Name |
    Select-Object -Last 1

if (-not $Migration) {
    Write-Error "No migration file found."
    exit 1
}

Write-Host "Applying migration:"
Write-Host $Migration.FullName

Get-Content $Migration.FullName -Raw |
    docker exec -i supabase-db psql -U postgres -d postgres

if ($LASTEXITCODE -ne 0) {
    Write-Error "Migration failed."
    exit $LASTEXITCODE
}

Write-Host "Migration completed successfully."