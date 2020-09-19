# r = requests.get(
#     'https://api.breezometer.com/air-quality/v2/current-conditions?lat=48.857456&lon=2.354611&key=bf934542b3cd4f549443eb89128c6d38&features=breezometer_aqi,local_aqi,sources_and_effects,pollutants_aqi_information,health_recommendations')

import json
import os
import requests
# import folium


def get_air_quality(lat, lon):
    api_url = 'https://api.breezometer.com/air-quality/v2/current-conditions?lat={}&lon={}&key=bf934542b3cd4f549443eb89128c6d38&features=breezometer_aqi,local_aqi,sources_and_effects,pollutants_aqi_information,health_recommendations'.format(
        str(lat), str(lon))
    path = os.path.join('cache', str(lat) + '-' + str(lon) + '.txt')
    if not os.path.exists(path):
        with open(path, 'w') as f:
            r = requests.get(api_url)
            f.write(r.text)

    with open(path, 'r') as f:
        return json.load(f)


# def map_output(lat, lon, radius):
#     min_lat = lat - radius
#     max_lat = lat + radius
#     min_lon = lat - radius
#     max_lon = lat + radius
    # folium.folium.Map(location=[lat, lon])


# print(json.dumps(get_air_quality(50.857456, 2.354611), indent=2, sort_keys=True))
