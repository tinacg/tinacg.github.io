# collect a set of single characters found in a file (HSK_level6_trad)

charinfile = "/tmp/HSK_level6_trad.txt"

charset = set()

charinhandle = open(charinfile)

for line in charinhandle:
    tokens = line.split(',')
    word = tokens[1]
    for char in word:
        charset.add(char)

charinhandle.close()
