# DataPath – One-click Start Script
# Double-click this file to start the server!

$env:PATH = $env:PATH + ";C:\Program Files\nodejs"

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  DataPath – Starting Server...      " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$nodePath = "C:\Program Files\nodejs\node.exe"
if (-not (Test-Path $nodePath)) {
    Write-Host "❌ Node.js not found. Install from: https://nodejs.org" -ForegroundColor Red
    pause; exit
}

Write-Host "✅ Node.js found!" -ForegroundColor Green

$serverDir = "$PSScriptRoot\server"

if (-not (Test-Path "$serverDir\node_modules")) {
    Write-Host "📦 Installing packages (first time only)..." -ForegroundColor Yellow
    Set-Location $serverDir
    & $nodePath "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install
    Write-Host "✅ Packages installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🌐 Open in your browser: http://localhost:3001" -ForegroundColor Green
Write-Host "   Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

Set-Location $serverDir
& $nodePath server.js
