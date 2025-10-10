# Simple script to update template-1.html
$file = "d:\LD - Wedding Site\wedding-site\public\templates\template-1.html"
$content = Get-Content $file -Raw

# Backup original
Copy-Item $file "$file.backup"

# Replace navigation
$content = $content.Replace(
    '    <header class="transparent">' + "`r`n" + '        <nav>' + "`r`n" + '            <a href="#gallery">Our Story</a>',
    '    <header class="transparent">' + "`r`n" + '        <div class="hamburger">' + "`r`n" + '            <span></span>' + "`r`n" + '            <span></span>' + "`r`n" + '            <span></span>' + "`r`n" + '        </div>' + "`r`n" + '        <nav>' + "`r`n" + '            <a href="#gallery">Our Story</a>'
)

$content = $content.Replace(
    '            <a href="#program">Schedule</a>' + "`r`n" + '            <a href="#contact">Contact</a>',
    '            <a href="#countdown">Countdown</a>' + "`r`n" + '            <a href="#program">Schedule</a>' + "`r`n" + '            <a href="#faqs">FAQs</a>' + "`r`n" + '            <a href="#contact">Contact</a>'
)

# Save
Set-Content $file $content -NoNewline

Write-Host "Step 1 complete - Navigation updated" -ForegroundColor Green
