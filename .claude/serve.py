import os
import http.server
import socketserver

ROOT = "/Users/2angels/Desktop/Azumaya資料/Claude Code/サイト制作20260604"
PORT = 8123

os.chdir(ROOT)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)


with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    httpd.serve_forever()
