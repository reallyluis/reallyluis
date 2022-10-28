"""bump_package printing new package.json version."""
import json
import os
import sys

def main():
    """Update package.json and print new version number."""
    try:
        with open("./package.json", "r+", encoding="utf-8") as json_file:
            # Release types major / minor / patch
            release = sys.argv[1]
            data = json.load(json_file)

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

            json_file.seek(0)
            json.dump(data, json_file, indent=2, sort_keys=True)
            json_file.truncate()

        print(data["version"])
        sys.exit(os.EX_OK)
    except OSError:
        print("")
        sys.exit(os.EX_OSERR, "Could not update package json version.")

if __name__ == "__main__":
    main()
