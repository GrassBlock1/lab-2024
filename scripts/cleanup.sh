#!/usr/bin/env bash

# 指定需要检测的目录
TARGET_DIR="./content/posts"
#DEST_DIR="./micro/content/posts"

# Iterate over all files in subdirectories of TARGET_DIR
find "$TARGET_DIR" -type f -name "*.md" | while read -r FILE; do
    # Check if the 3rd line contains 'is_microblog: true'
    #if sed -n '3p' "$FILE" | grep -q 'is_microblog: true'; then
    #    # Construct the destination path, preserving the subdirectory structure
    #    DEST_PATH="$DEST_DIR${FILE#"$TARGET_DIR"}"
    #    # Move the file
    #    mv "$FILE" "$DEST_PATH"
    #    echo "Moved $FILE to $DEST_PATH"
    #fi
    TARGET_SUBDIR=$(dirname "$FILE")
    NEW_FILE="$TARGET_SUBDIR/index.md"
    #INDEX_FILE="$TARGET_SUBDIR/_index.md"
    #INDEX_EN_FILE="$TARGET_SUBDIR/_index.en.md"
    if ! grep -m 1 -q index "$FILE" ; then
        echo "$FILE already moved correctly. Skipping."
        continue
    else
        echo "Renaming $FILE to $NEW_FILE"
        mv "$FILE" "$NEW_FILE"
    fi
done

echo "Completed."
