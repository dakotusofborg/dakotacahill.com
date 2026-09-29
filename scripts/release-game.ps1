# Publish a packaged game build as a GitHub Release.
# Uses git's stored GitHub credential (no gh CLI needed). The token is only held in memory.
#
#   .\scripts\release-game.ps1 -Repo dakotusofborg/ObstacleAssault -Tag v0.2.0 -Branch master `
#       -Zip C:\workspace\ObstacleAssault\Packaged\ObstacleAssault-v0.2.0-Win64.zip -NotesFile notes.md
param(
  [Parameter(Mandatory)][string]$Repo,
  [Parameter(Mandatory)][string]$Tag,
  [Parameter(Mandatory)][string]$Zip,
  [Parameter(Mandatory)][string]$NotesFile,
  [string]$Branch = 'main',
  [string]$Title
)
$ErrorActionPreference = 'Stop'

$cred = "protocol=https`nhost=github.com`n`n" | git credential fill
$token = ($cred | Where-Object { $_ -like 'password=*' }) -replace '^password=', ''
if (-not $token) { throw 'No stored GitHub credential found' }
$h = @{ Authorization = "Bearer $token"; Accept = 'application/vnd.github+json'; 'X-GitHub-Api-Version' = '2022-11-28' }

$me = Invoke-RestMethod -Headers $h https://api.github.com/user
"Authenticated as: $($me.login)"

if (-not $Title) { $Title = "$(($Repo -split '/')[1]) $Tag" }
$body = @{
  tag_name = $Tag
  target_commitish = $Branch
  name = $Title
  body = (Get-Content $NotesFile -Raw)
  make_latest = 'true'
} | ConvertTo-Json
$rel = Invoke-RestMethod -Method Post -Headers $h -Uri "https://api.github.com/repos/$Repo/releases" -Body $body -ContentType 'application/json'
"Release created: $($rel.html_url)"

# GitHub caps a single release asset at 2 GB.
$name = Split-Path $Zip -Leaf
$up = ($rel.upload_url -replace '\{.*\}$', '') + "?name=$name"
$asset = Invoke-RestMethod -Method Post -Headers $h -Uri $up -InFile $Zip -ContentType 'application/zip' -TimeoutSec 7200
"Asset uploaded: $($asset.browser_download_url) ($($asset.size) bytes)"
