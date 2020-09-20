from http.server import HTTPServer, BaseHTTPRequestHandler
import envInfo
import json
import urllib
import demographics


class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Respond to a GET request."""
        path = self.path.split('?')[0]
        if (path == '/favicon.ico'):
            self.send_response(404)
            return
        params = urllib.parse.parse_qs(self.path.split('?')[1])
        if path == "/AirQuality":
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-type", "text/json")
            self.end_headers()
            coordinates = demographics.zipToCoordinates(params['zip'])
            print(coordinates)
            self.wfile.write(json.dumps(
                envInfo.get_air_quality(coordinates[0], coordinates[1])).encode('utf-8'))
        elif path == "/DemoInfo":
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-type", "text/json")
            self.end_headers()
            zip_codes = demographics.zipCodeToZipCodes(
                params['zip'][0], params['rad'][0])
            self.wfile.write(json.dumps(
                demographics.aggregateAllData(zip_codes)).encode('utf-8'))
        print("Sent Response")


def run(server_class=HTTPServer, handler_class=BaseHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()


run(handler_class=MyHandler)
