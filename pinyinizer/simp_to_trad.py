# build translation table

cedict = open("/tmp/cedict_1_0.txt")

transl = {}

for line in cedict:
    tokens = line.split(' ')

    # transl[simplified] = traditional
    transl[tokens[1]] = tokens[0]

# load input and write to output

infile = "/tmp/HSK_level6.txt"
outfile = "/tmp/HSK_level6_trad.txt"

inhandle = open(infile)
outhandle = open(outfile, 'w')

for line in inhandle:
    simp = line.split(',')[1]
    try:
        print(line.replace(simp, transl[simp]), file=outhandle, end="")
    except KeyError:
        print("Could not find replacement for " + simp)

inhandle.close()
outhandle.close()
