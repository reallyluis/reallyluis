import sys, os
import json

def main():
  with open("./package.json", "r+") as jsonFile:
    # Release types major / minor / patch
    release = sys.argv[1]
    data = json.load(jsonFile)

    version = data["version"].split(".")
    version = [int(i) for i in version]

    if release == "major":
      version[0] += 1
      version[1] = 0
      version[2] = 0
    elif release == "minor":
      version[1] += 1
      version[2] = 0
    elif release == "patch":
      version[2] += 1

    data["version"] = ".".join(map(str, version))

    jsonFile.seek(0)  # rewind
    json.dump(data, jsonFile, indent=2, sort_keys=True)
    jsonFile.truncate()

  sys.exit(os.EX_OK)

if __name__ == "__main__":
  main()