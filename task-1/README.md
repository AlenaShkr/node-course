##Running application##
 
In terminal should write 
$ node my_caeser -a xxx -s xx -i xxx -o xxxx, 

where
-s, --shift: a shift
-i, --input: an input file
-o, --output: an output file
-a, --action: an action encode/decode

For example:

$ node my_caeser -a encode -s 7 -i "./input.txt" -o "./output.txt"
