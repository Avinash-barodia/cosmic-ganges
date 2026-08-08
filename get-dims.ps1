Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('d:\Cosmic\assets\hero_editorial.png')
Write-Output "Width: $($img.Width)"
Write-Output "Height: $($img.Height)"
