"""update_lastmod update sitemap-file.xml with current date."""
from datetime import datetime
import os
import sys
import xml.dom.minidom as md

def main():
    """Update sitemap-file.xml."""
    try:
        doc = md.parse("./public/sitemap-file.xml")

        current_date = doc.getElementsByTagName("lastmod")[0].firstChild.nodeValue
        new_date = datetime.today().strftime('%Y-%m-%d')

        if current_date != new_date:
            doc.getElementsByTagName("lastmod")[0].firstChild.nodeValue = new_date

        with open("./public/sitemap-file.xml", "w", encoding="utf-8") as file:
            file.write(doc.toxml())
            file.close()

        sys.exit(os.EX_OK)
    except OSError:
        sys.exit(os.EX_OSERR, "Could not update sitemap's lastmod date.")

if __name__ == "__main__":
    main()
