#!/bin/sh

me=`basename "$0"`

#$1 is the number to open :)
# from ... http://stackoverflow.com/a/6482403

if [ -z "$1" ]
then
    echo "Usage: ./${me} <number of day to open files for (can be multiple)>"
    exit 1
fi

# --- Okay, it's safe to proceed -----

for var in "$@"
do
    file_md="content/day${var}.md"
    file_js="static/js/day${var}.js"

    for file in $file_md $file_js
    do
        if [ -f "$file" ]
        then
            echo "$file found."
        else
            echo "$file not found, make it? [y | n]"
            read answer
            if [ "y" == $answer ]
            then
                echo "Making it ..."
                touch $file
            else
                echo "Nah, exiting"
                exit 1
            fi
        fi
    done
    vim $file_md $file_js
done

