#!/usr/bin/env python3
"""99names · Noor · The Passage · the injector

Every page in the world carries one line before </body>:
    <script src="/hub/back.js" defer></script>
    python3 hub/passage.py            # add it everywhere it belongs
    python3 hub/passage.py --check    # say what is missing, change nothing
    python3 hub/passage.py --remove   # take it out again
"""
import re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
TAG = '<script src="/hub/back.js" defer></script>'
MARK = "hub/back.js"
INCLUDE = ["directions", "world", "logo", "social", "app-design"]
SKIP = re.compile(r"/kit/|/vendor/|/node_modules/|/_|/reel\.html$")

def pages():
    out = []
    for top in INCLUDE:
        base = ROOT / top
        if base.is_dir():
            for p in sorted(base.rglob("*.html")):
                if not SKIP.search(p.relative_to(ROOT).as_posix()):
                    out.append(p)
    return out

def add(text):
    if MARK in text: return None
    m = None
    for m in re.finditer(r"</body\s*>", text, re.IGNORECASE): pass
    if m is None: return text.rstrip() + "\n" + TAG + "\n"
    return text[: m.start()] + TAG + "\n" + text[m.start():]

def remove(text):
    out = re.sub(r"[ \t]*<script[^>]*hub/back\.js[^>]*>\s*</script>\s*\n?", "", text)
    return None if out == text else out

def main():
    check, strip = "--check" in sys.argv, "--remove" in sys.argv
    touched, missing = [], []
    for p in pages():
        text = p.read_text(encoding="utf-8")
        out = remove(text) if strip else add(text)
        rel = p.relative_to(ROOT).as_posix()
        if out is None: continue
        if check: missing.append(rel); continue
        p.write_text(out, encoding="utf-8"); touched.append(rel)
    if check:
        for rel in missing: print(f"  missing  {rel}")
        print(f"{len(missing)} page(s) without the return, {len(pages()) - len(missing)} with it")
        return 1 if missing else 0
    print(f"{len(touched)} page(s) {'cleared' if strip else 'carry the return'}, {len(pages())} in the world")
    return 0

if __name__ == "__main__": raise SystemExit(main())
