$ErrorActionPreference = "Stop"

$source = "D:\OneDrive - thetruecircle\OneDrive - thetruecircle.com\Downloads - Nick Main PC\ClickMe Dashboard"
$dest = "D:\OneDrive - thetruecircle\OneDrive - thetruecircle.com\Downloads - Nick Main PC\Davis and Garnett"

Write-Host "Copying app/clickme-dashboard to src/app/clickme..."
if (Test-Path "$source\app\clickme-dashboard") {
    Copy-Item -Path "$source\app\clickme-dashboard" -Destination "$dest\src\app\clickme" -Recurse -Force
}

Write-Host "Copying components/clickme-dashboard to src/components/clickme-dashboard..."
if (Test-Path "$source\components\clickme-dashboard") {
    Copy-Item -Path "$source\components\clickme-dashboard" -Destination "$dest\src\components\clickme-dashboard" -Recurse -Force
}

Write-Host "Copying DashboardSidebar.tsx..."
if (Test-Path "$source\components\DashboardSidebar.tsx") {
    Copy-Item -Path "$source\components\DashboardSidebar.tsx" -Destination "$dest\src\components\DashboardSidebar.tsx" -Force
}

Write-Host "Copying clickme login page to src/app/login..."
if (-not (Test-Path "$dest\src\app\login")) {
    New-Item -ItemType Directory -Force -Path "$dest\src\app\login" | Out-Null
}
if (Test-Path "$source\app\clickme\page.tsx") {
    Copy-Item -Path "$source\app\clickme\page.tsx" -Destination "$dest\src\app\login\page.tsx" -Force
}

Write-Host "Copying public assets..."
$assets = @("clickme-life-logo-medium.png", "clickme-life-logo-small.png")
foreach ($asset in $assets) {
    if (Test-Path "$source\public\$asset") {
        Copy-Item -Path "$source\public\$asset" -Destination "$dest\public\$asset" -Force
    }
}

Write-Host "Replacing '/clickme-dashboard' with '/clickme' in src/app/clickme..."
Get-ChildItem -Path "$dest\src\app\clickme" -Recurse -File | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match '/clickme-dashboard') {
        $newContent = $content -replace '/clickme-dashboard', '/clickme'
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
    }
}

Write-Host "Replacing '/clickme-dashboard' with '/clickme' in components..."
if (Test-Path "$dest\src\components\DashboardSidebar.tsx") {
    $content = Get-Content "$dest\src\components\DashboardSidebar.tsx" -Raw
    $newContent = $content -replace '/clickme-dashboard', '/clickme'
    Set-Content -Path "$dest\src\components\DashboardSidebar.tsx" -Value $newContent -NoNewline
}
Get-ChildItem -Path "$dest\src\components\clickme-dashboard" -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match '/clickme-dashboard') {
        $newContent = $content -replace '/clickme-dashboard', '/clickme'
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
    }
}

Write-Host "Done!"
