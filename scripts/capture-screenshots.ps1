# Launch a packaged game windowed, capture a few frames of its window, then close it.
# Also works as a smoke test: it fails if the game never opens a window.
# The game window pops up on screen while this runs; don't click into it.
#
#   .\scripts\capture-screenshots.ps1 -Exe C:\workspace\ObstacleAssault\Packaged\v0.2.0\Windows\ObstacleAssault.exe `
#       -OutDir .\shots -ProcessName ObstacleAssault
param(
  [Parameter(Mandatory)][string]$Exe,
  [Parameter(Mandatory)][string]$OutDir,
  [Parameter(Mandatory)][string]$ProcessName,
  [int]$Wait = 30,
  [int]$Count = 3
)

Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class W {
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int L, T, R, B; }
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
}
'@
[W]::SetProcessDPIAware() | Out-Null
New-Item -ItemType Directory -Force $OutDir | Out-Null

Start-Process $Exe -ArgumentList '-windowed', '-ResX=1600', '-ResY=900', '-nosplash' | Out-Null
Start-Sleep -Seconds $Wait

# UE's launcher exe spawns the real game process; find the one that owns a window.
$game = Get-Process | Where-Object { $_.Name -like "$ProcessName*" -and $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if (-not $game) {
  Get-Process | Where-Object Name -like "$ProcessName*" | Stop-Process -Force
  throw "Game never opened a window within $Wait s"
}

[W]::SetForegroundWindow($game.MainWindowHandle) | Out-Null
Start-Sleep -Seconds 2
for ($i = 1; $i -le $Count; $i++) {
  $r = New-Object W+RECT
  [W]::GetWindowRect($game.MainWindowHandle, [ref]$r) | Out-Null
  # trim the title bar and borders
  $x = $r.L + 8; $y = $r.T + 31; $w = $r.R - $r.L - 16; $h = $r.B - $r.T - 39
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.CopyFromScreen($x, $y, 0, 0, $bmp.Size)
  $file = Join-Path $OutDir "shot-$i.png"
  $bmp.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  "captured $file (${w}x${h})"
  Start-Sleep -Seconds 3
}

Get-Process | Where-Object Name -like "$ProcessName*" | Stop-Process -Force
"closed"
