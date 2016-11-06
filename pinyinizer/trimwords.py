import json
import re

# Load CEDICT and remove entries over 4 characters long

dicttree = {}

def parse_line(line):
    tokens = line.split(' ')
    trad = tokens[0]
    simp = tokens[1]
    rest = ' '.join(tokens[2:])
    pyend = rest.index(']')
    py = rest[1:pyend]
    en = rest[pyend+2:]
    return { 'trad': trad,
             'py': py,
             'en': en, }

def add_to_tree(trad, line, tree):
    parts = parse_line(line)
    if trad[0] not in tree:
        tree[trad[0]] = {}
        tree[trad[0]]['py'] = ""
        tree[trad[0]]['en'] = ""
    if len(trad) == 1:
        tree[trad[0]]['py'] += num_to_accent(parts['py']) + " / "
        tree[trad[0]]['en'] += parts['en'] + " / "
    else:
        add_to_tree(trad[1:], line, tree[trad[0]])

def pyvowel_to_accented(v, tone):
    if tone == 5:
        return v
    else:
        accented = {}
        accented['a'] = ' āáǎà'
        accented['e'] = ' ēéěè'
        accented['i'] = ' īíǐì'
        accented['o'] = ' ōóǒò'
        accented['u'] = ' ūúǔù'
        accented['u:'] = ' ǖǘǚǜ'
        return accented[v][tone]
    
def pysyl_to_accented(pystr):
    pystr = pystr[:-3]
    return pystr

def remove_consonants(syl):
    return re.sub(r'[b-df-hj-np-tv-z]', '', syl, flags=re.IGNORECASE)

# http://stackoverflow.com/questions/8200349/convert-numbered-pinyin-to-pinyin-with-tone-marks

PinyinToneMark = {
    0: "aoeiuv\u00fc",
    1: "\u0101\u014d\u0113\u012b\u016b\u01d6\u01d6",
    2: "\u00e1\u00f3\u00e9\u00ed\u00fa\u01d8\u01d8",
    3: "\u01ce\u01d2\u011b\u01d0\u01d4\u01da\u01da",
    4: "\u00e0\u00f2\u00e8\u00ec\u00f9\u01dc\u01dc",
}

def decode_pinyin(s):
    s = s.lower()
    r = ""
    t = ""
    for c in s:
        if c >= 'a' and c <= 'z':
            t += c
        elif c == ':':
            assert t[-1] == 'u'
            t = t[:-1] + "\u00fc"
        else:
            if c >= '0' and c <= '5':
                tone = int(c) % 5
                if tone != 0:
                    m = re.search("[aoeiuv\u00fc]+", t)
                    if m is None:
                        t += c
                    elif len(m.group(0)) == 1:
                        t = t[:m.start(0)] + PinyinToneMark[tone][PinyinToneMark[0].index(m.group(0))] + t[m.end(0):]
                    else:
                        if 'a' in t:
                            t = t.replace("a", PinyinToneMark[tone][0])
                        elif 'o' in t:
                            t = t.replace("o", PinyinToneMark[tone][1])
                        elif 'e' in t:
                            t = t.replace("e", PinyinToneMark[tone][2])
                        elif t.endswith("ui"):
                            t = t.replace("i", PinyinToneMark[tone][3])
                        elif t.endswith("iu"):
                            t = t.replace("u", PinyinToneMark[tone][4])
                        else:
                            t += "!"
            r += t
            t = ""
    r += t
    return r

def num_to_accent(str):
    parts = str.split(' ')
    return ' '.join([decode_pinyin(syl) for syl in parts])

infile = "/tmp/cedict_1_0_firstfew.txt"
outfile = "/tmp/cedict_1_0_4chars.txt"

inhandle = open(infile)
outhandle = open(outfile, "w")

for line in inhandle:
    parts = parse_line(line)
    
    if len(parts['trad']) <= 4:
        add_to_tree(parts['trad'], line, dicttree)
        print("%s %s %s" % (parts['trad'], parts['py'], parts['en']), file=outhandle)

inhandle.close()
outhandle.close()

