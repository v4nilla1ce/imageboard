brew install exiftool

nano ~/pic_data.sh

#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: pic_data <path_to_picture>"
    exit 1
fi

file_path="$1"

if [ -f "$file_path" ]; then
    exiftool "$file_path"
else
    echo "Error: File not found at path '$file_path'"
    exit 1
fi

chmod +x ~/pic_data.sh

mv ~/pic_data.sh /usr/local/bin/pic_data

pic_data "/path/to/your/image.jpg"
