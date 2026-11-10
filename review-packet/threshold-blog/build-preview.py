"""Render this controlled editorial draft without a site/runtime dependency."""
from pathlib import Path
import html
import re

root = Path(__file__).resolve().parent

def inline(text):
    text = html.escape(text)
    text = re.sub(r'\[([^\]]+)\]\((https://[^\s)]+)\)', lambda m: '<a href="' + m[2] + '">' + m[1] + '</a>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    return re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', text)

blocks = root.joinpath('post.md').read_text().strip().split('\n\n')
title = blocks.pop(0).removeprefix('# ')
body = []
for block in blocks:
    image = re.fullmatch(r'!\[(.*)\]\(([^)]+)\)', block)
    if image:
        body.append('<figure><img src="' + html.escape(image[2]) + '" alt="' + html.escape(image[1], quote=True) + '" width="1800" height="1170"><figcaption>Original mathematical illustration. Text explanation and the OpenStax reference appear above.</figcaption></figure>')
    elif block.startswith('- '):
        body.append('<ul>' + ''.join('<li>' + inline(line[2:]) + '</li>' for line in block.splitlines()) + '</ul>')
    else:
        body.append('<p>' + inline(block.replace('\n', ' ')) + '</p>')
body_html = '\n'.join(body).replace('href="https://loptr-lab.github.io/training/threshold.html"', 'href="./threshold.html"')
root.joinpath('preview.html').write_text('''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Draft · ''' + html.escape(title) + ''' · PIXIE</title><link rel="stylesheet" href="./training.css?v=threshold-rollout"><script src="./training-display.js?v=20261105-brand"></script></head><body><a class="skip-link" href="#main">Skip to draft</a><header class="masthead"><p class="serial">PIXIE / EDITORIAL DRAFT / NOT PUBLISHED ON PCKT</p><h1>''' + html.escape(title) + '''</h1><nav class="actions" aria-label="Draft navigation"><a class="button" href="./threshold.html">Open the Threshold reader</a><a class="button" href="./threshold-blog.md" download>Download the blog draft</a><a class="button" href="./threshold-nonlinearity.png" download>Download the graphic</a></nav></header><main id="main" tabindex="-1"><article class="guide">''' + body_html + '''</article></main><footer><p>Review copy for Dominique. This preview links to the matching reader preview; the Markdown uses the intended stable Training URL. Publication through pckt is a separate editorial action.</p></footer></body></html>''')
