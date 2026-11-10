"""Build a local-only review fixture, including the unpublished blog draft.

This does not deploy or upload anything. The production Pages source is docs/.
"""
from pathlib import Path
import shutil
import subprocess
import sys

repo = Path(__file__).resolve().parent.parent
destination = Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/threshold-preview').resolve()
if destination == repo or repo in destination.parents or destination == Path('/'):
    raise SystemExit('Choose a separate temporary fixture directory, outside this repository.')
blog = repo / 'review-packet/threshold-blog'
subprocess.run([sys.executable, str(blog / 'build-preview.py')], check=True)
shutil.copytree(repo / 'docs', destination, dirs_exist_ok=True)
for source, target in [('preview.html', 'threshold-field-notes.html'),
                       ('post.md', 'threshold-blog.md'),
                       ('threshold-nonlinearity.png', 'threshold-nonlinearity.png'),
                       ('threshold-nonlinearity.svg', 'threshold-nonlinearity.svg')]:
    shutil.copy2(blog / source, destination / target)
print(f'Local review fixture: {destination}')
print(f'Run: python3 -m http.server 4203 --bind 127.0.0.1 --directory {destination}')
