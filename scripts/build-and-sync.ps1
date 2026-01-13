# Build frontend and sync to Django static folder
# Usage: Run from PowerShell as administrator if needed
#   ./scripts/build-and-sync.ps1

# Determine script and project roots robustly
$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Definition }
$projectRoot = Split-Path -Parent $scriptDir
# Adjust paths if you run the script from a different location
$frontendDir = Join-Path $projectRoot "dashborad"
$backendStaticDir = Join-Path $projectRoot "backend\static\dashboard"
$distDir = Join-Path $frontendDir "dist"

Write-Host "Frontend dir: $frontendDir"
Write-Host "Dist dir: $distDir"
Write-Host "Backend static dir: $backendStaticDir"

if (-not (Test-Path $frontendDir)) {
  Write-Error "Frontend directory not found: $frontendDir"
  exit 1
}

Push-Location $frontendDir
try {
  Write-Host "Installing frontend dependencies (npm ci)..."
  npm ci

  Write-Host "Building frontend (npm run build)..."
  npm run build
} catch {
  Write-Error "Frontend build failed: $_"
  Pop-Location
  exit 1
} finally {
  Pop-Location
}

if (-not (Test-Path $distDir)) {
  Write-Error "Build output not found: $distDir"
  exit 1
}

# Ensure backend static folder exists
if (-not (Test-Path $backendStaticDir)) {
  Write-Host "Creating backend static folder: $backendStaticDir"
  New-Item -ItemType Directory -Path $backendStaticDir -Force | Out-Null
}

# Remove existing files in backend static dashboard
Write-Host "Removing old static files..."
Get-ChildItem -Path $backendStaticDir -Force -Recurse | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Copy new build
Write-Host "Copying new build to backend static folder..."
Copy-Item -Path (Join-Path $distDir "*") -Destination $backendStaticDir -Recurse -Force

# Show recent files
Write-Host "Newest files in backend static dashboard:";
Get-ChildItem -Path $backendStaticDir -File -Recurse | Sort-Object LastWriteTime -Descending | Select-Object FullName, LastWriteTime -First 20 | Format-Table -AutoSize

Write-Host "Done. Now restart Django (if running) and hard-refresh the browser (Ctrl+F5)."
