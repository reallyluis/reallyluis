from datetime import datetime
import sys, os
import xml.dom.minidom as md

def main():
  doc = md.parse("./public/sitemap-file.xml")

  currentDate = doc.getElementsByTagName("lastmod")[0].firstChild.nodeValue
  newDate = datetime.today().strftime('%Y-%m-%d')

  if currentDate != newDate:
    doc.getElementsByTagName("lastmod")[0].firstChild.nodeValue = newDate

    with open("./public/sitemap-file.xml", "w") as fs:
        fs.write(doc.toxml())
        fs.close()

  sys.exit(os.EX_OK)

if __name__ == "__main__":
  main()
