from http.server import HTTPServer, BaseHTTPRequestHandler
import envInfo
import json
import urllib


class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Respond to a GET request."""
        path = self.path.split('?')[0]
        params = urllib.parse.parse_qs(self.path.split('?')[1])
        if path == "/AirQuality":
            self.send_response(200)
            self.send_header("Content-type", "text/json")
            self.end_headers()
            self.path
            print(params)
            self.wfile.write(json.dumps(
                envInfo.get_air_quality(50.857456, 2.354611)).encode('utf-8'))


def run(server_class=HTTPServer, handler_class=BaseHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()


# GET http://localhost:8000/AirQuality?lon=23.23432&lat=34.23232
# https://www.programcreek.com/python/example/103649/http.server.BaseHTTPRequestHandler

run(handler_class=MyHandler)
