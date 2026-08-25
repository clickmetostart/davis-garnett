$ErrorActionPreference = "Stop"

$source = "D:\OneDrive - thetruecircle\OneDrive - thetruecircle.com\Downloads - Nick Main PC\ClickMe Dashboard"
$dest = "D:\OneDrive - thetruecircle\OneDrive - thetruecircle.com\Downloads - Nick Main PC\Davis and Garnett"

Write-Host "Copying missing API routes..."
$apiFolders = @("contact", "email", "gmail", "labels", "leads", "locations", "onboarding", "settings", "upload", "users")
foreach ($folder in $apiFolders) {
    if (Test-Path "$source\app\api\$folder") {
        Copy-Item -Path "$source\app\api\$folder" -Destination "$dest\src\app\api\$folder" -Recurse -Force
    }
}

Write-Host "Copying data, content, lib, and types folders..."
$rootFolders = @("data", "content", "content-documents", "lib", "types")
foreach ($folder in $rootFolders) {
    if (Test-Path "$source\$folder") {
        # Copy to the root of the destination project, since that's where they were in ClickMe Dashboard
        Copy-Item -Path "$source\$folder" -Destination "$dest\$folder" -Recurse -Force
    }
}

Write-Host "Done copying missing dependencies!"
