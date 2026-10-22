#!/usr/bin/env python3
"""Leave the PDF handouts out of a PR preview render.

The LaTeX handouts take a large share of the preview build's render time, and
only the push to `main` has to produce them.
Quarto cannot drop a declared format from a profile, and every page declares
`pdf` in its own front matter as well as the project file, so this `pre-render`
script removes the `pdf:` blocks from the working copy before Quarto reads them.

On a pull request's build it does so unless the PR carries the `preview:pdf`
label; anywhere else (a push to `main`, a local render) it does nothing.
This mirrors `tools/skip-pdf-in-previews.py` in Morrison-Lab/lds, without that
script's two-pass split of the PDF render, which only lds needs.

Set `SDS_SKIP_PDF=0` to force the handouts on, or `SDS_SKIP_PDF=1` to force
them off (for testing).
Rewriting `pdf:` blocks modifies the working copy, so run the override only in
a throwaway checkout.
"""

import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LABEL = "preview:pdf"
# A `pdf:` key at the two-space indent of a `format:` map, and the lines that
# belong to it: blank lines, and anything indented deeper (comments included).
EMPTY_FORMAT = re.compile(r"^format:[ \t]*\n(?=\S|\Z)", re.M)
PDF_BLOCK = re.compile(r"^  pdf:[^\n]*\n(?:(?:[ \t]*\n)|(?:    [^\n]*\n))*", re.M)


def skip_requested() -> bool:
    forced = os.environ.get("SDS_SKIP_PDF")
    if forced in ("0", "1"):
        return forced == "1"
    if os.environ.get("GITHUB_EVENT_NAME") != "pull_request":
        return False
    path = os.environ.get("GITHUB_EVENT_PATH")
    if not path or not Path(path).is_file():
        return False
    event = json.loads(Path(path).read_text(encoding="utf-8"))
    labels = {x["name"] for x in event.get("pull_request", {}).get("labels", [])}
    return LABEL not in labels


def strip_pdf(text: str, front_matter_only: bool) -> str:
    if not front_matter_only:
        # Drop a `format:` key left with no children, which Quarto would read as null.
        return EMPTY_FORMAT.sub("", PDF_BLOCK.sub("", text))
    if not text.startswith("---\n"):
        return text
    end = text.find("\n---\n", 4)
    if end == -1:
        return text
    head, rest = text[: end + 1], text[end + 1 :]
    return PDF_BLOCK.sub("", head) + rest


def main() -> int:
    if not skip_requested():
        return 0
    pages = sorted(ROOT.glob("*.qmd")) + sorted((ROOT / "chapters").glob("*.qmd"))
    targets = [(ROOT / "_quarto.yml", False)] + [(p, True) for p in pages]
    changed = []
    for path, front in targets:
        if not path.is_file():
            continue
        old = path.read_text(encoding="utf-8")
        new = strip_pdf(old, front)
        if new != old:
            st = path.stat()
            path.write_text(new, encoding="utf-8")
            # Keep the mtime, so `date: last-modified` is not today's date.
            os.utime(path, (st.st_atime, st.st_mtime))
            changed.append(path.name)
    if not changed:
        print(
            "skip-pdf-in-previews: warning: found no pdf format to remove",
            file=sys.stderr,
        )
        return 0
    print(
        f"skip-pdf-in-previews: removed the pdf format from {len(changed)} files",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
