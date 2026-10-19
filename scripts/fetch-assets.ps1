$ErrorActionPreference = "Stop"
$base = "https://proximatechsolutions.com/wp-content/uploads"
$root = Join-Path $PSScriptRoot "..\public\images"

foreach ($dir in @("products", "services", "gallery", "events")) {
    New-Item -ItemType Directory -Force -Path (Join-Path $root $dir) | Out-Null
}

$jobs = @(
    @{ url = "$base/2025/12/snapedit_1765246313064.png"; out = "logo.png" }
    @{ url = "$base/2025/12/1.avif"; out = "products/product-1.avif" }
    @{ url = "$base/2025/12/2.avif"; out = "products/product-2.avif" }
    @{ url = "$base/2025/12/3.avif"; out = "products/product-3.avif" }
    @{ url = "$base/2025/12/4.avif"; out = "products/product-4.avif" }
    @{ url = "$base/2025/12/5.avif"; out = "products/product-5.avif" }
    @{ url = "$base/2025/12/6.avif"; out = "products/product-6.avif" }
    @{ url = "$base/2025/12/7.avif"; out = "products/product-7.avif" }
    @{ url = "$base/2025/12/8.avif"; out = "products/product-8.avif" }
    @{ url = "$base/2025/12/9.avif"; out = "products/product-9.avif" }
    @{ url = "$base/2025/12/11.avif"; out = "products/product-11.avif" }
    @{ url = "$base/2025/12/13.avif"; out = "products/product-13.avif" }
    @{ url = "$base/2025/12/14.avif"; out = "products/product-14.avif" }
    @{ url = "$base/2025/12/15.avif"; out = "products/product-15.avif" }
    @{ url = "$base/2025/12/16.avif"; out = "products/product-16.avif" }
    @{ url = "$base/2025/12/17.avif"; out = "products/product-17.avif" }
    @{ url = "$base/2025/12/18.avif"; out = "products/product-18.avif" }
    @{ url = "$base/2025/12/RFID-Solutions.avif"; out = "services/rfid-solutions.avif" }
    @{ url = "$base/2025/12/Barcode-Solutions.avif"; out = "services/barcode-solutions.avif" }
    @{ url = "$base/2025/12/Customized-Apps.avif"; out = "services/customized-apps.avif" }
    @{ url = "$base/2025/12/Event-Registration-System.avif"; out = "services/event-registration-system.avif" }
    @{ url = "$base/2025/12/Warehouse-Management-System.avif"; out = "services/warehouse-management-system.avif" }
    @{ url = "$base/2025/12/Fixed-Asset-Management-System.avif"; out = "services/fixed-asset-management-system.avif" }
    @{ url = "$base/2025/12/Structured-Cabling.avif"; out = "services/structured-cabling.avif" }
    @{ url = "$base/2026/05/website_development_590x646.png"; out = "services/website-development.png" }
    @{ url = "$base/2025/12/freepik__candid-image-photography-natural-textures-highly-r__30560-1.jpeg"; out = "gallery/gallery-vision-1.jpg" }
    @{ url = "$base/2025/12/2150152266.avif"; out = "gallery/gallery-vision-2.avif" }
    @{ url = "$base/2025/12/2150062338.avif"; out = "gallery/gallery-vision-3.avif" }
    @{ url = "$base/2025/12/42947.avif"; out = "gallery/gallery-values.avif" }
    @{ url = "$base/2026/05/blurred_faces_image_1.jpg"; out = "gallery/team-1.jpg" }
    @{ url = "$base/2026/05/blurred_faces_image_2.jpg"; out = "gallery/team-2.jpg" }
    @{ url = "$base/2026/05/blurred_faces_image_3.jpg"; out = "gallery/team-3.jpg" }
    @{ url = "$base/2026/05/blurred_faces_image_4.jpg"; out = "gallery/team-4.jpg" }
    @{ url = "$base/2026/05/blurred_faces_image_5.jpg"; out = "gallery/team-5.jpg" }
    @{ url = "$base/2026/05/blurred_faces_image_6.jpg"; out = "gallery/team-6.jpg" }
    @{ url = "$base/2026/03/Screenshot-2026-03-14-211009.webp"; out = "events/fasava-2027.webp" }
)

foreach ($job in $jobs) {
    $dest = Join-Path $root $job.out
    if (Test-Path $dest) {
        Write-Host ("skip " + $job.out)
        continue
    }
    Invoke-WebRequest -Uri $job.url -OutFile $dest -UseBasicParsing
    $size = (Get-Item $dest).Length
    Write-Host ("ok   " + $job.out + " (" + [Math]::Round($size / 1KB, 1) + " KB)")
}

Write-Host "done"
