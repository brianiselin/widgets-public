import os
import glob

# Configuration
REPO_ROOT = "https://brianiselin.github.io/widgets-public/"
README_FILE = "README.md"

# Find all HTML files in current directory
html_files = sorted([f for f in glob.glob("*.html")])

if not html_files:
    print("No HTML files found in current directory.")
    exit()

# Generate markdown table rows
table_rows = []
for filename in html_files:
    url = REPO_ROOT + filename
    # Create a simple description or leave blank
    description = f"Widget: {filename.replace('.html', '').replace('-', ' ').title()}"
    table_rows.append(f"| `{filename}` | `{url}` | {description} |")

# Build the table
table_header = "| File | Live URL | What it does |\n|---|---|---|\n"
table_content = table_header + "\n".join(table_rows)

print("Generated table:\n")
print(table_content)
print("\n" + "="*60)
print("Table copied to clipboard (if possible) or paste manually into README.md")

# Optionally write to a file
with open("widget_table.txt", "w", encoding="utf-8") as f:
    f.write(table_content)

print("\nTable also saved to 'widget_table.txt' for easy copy-paste.")
