#!/usr/bin/env bash

# 指定需要检测的目录
TARGET_DIR="./content/posts"

# 遍历目标目录的所有子目录
for SUBDIR in "$TARGET_DIR"/*; do
    if [ -d "$SUBDIR" ]; then
        # 遍历子目录中的所有文件
        for FILE in "$SUBDIR"/*; do
            # 获取文件名
            FILENAME=$(basename "$FILE")
            EXTENSION="${FILENAME##*.}"

            if [[ "$EXTENSION" == "md" && "$FILENAME" != "index.md" ]]; then
                NEWFILE="$SUBDIR/index.md"
                echo "Renaming $FILE to $NEWFILE"
                mv "$FILE" "$NEWFILE"
            fi
        done
    fi
done

echo "Completed."
