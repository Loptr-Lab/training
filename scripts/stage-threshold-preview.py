"""Build a local-only review fixture, including the rendered reading-circle handbook.

This does not deploy or upload anything. The production Pages source is docs/.
"""
from pathlib import Path
import shutil
import sys

repo = Path(__file__).resolve().parent.parent
destination = Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/threshold-preview').resolve()
if destination == repo or repo in destination.parents or destination == Path('/'):
    raise SystemExit('Choose a separate temporary fixture directory, outside this repository.')
shutil.copytree(repo / 'docs', destination, dirs_exist_ok=True)
print(f'Local review fixture: {destination}')
print(f'Run: python3 -m http.server 4203 --bind 127.0.0.1 --directory {destination}')
