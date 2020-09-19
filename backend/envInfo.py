# r = requests.get(
#     'https://api.breezometer.com/air-quality/v2/current-conditions?lat=48.857456&lon=2.354611&key=bf934542b3cd4f549443eb89128c6d38&features=breezometer_aqi,local_aqi,sources_and_effects,pollutants_aqi_information,health_recommendations')

import json
import os
import requests
# import folium


def parse_json(json_loaded):

    baqi = json_loaded['data']['indexes']['baqi']
    baqi.pop('display_name')
    health = json_loaded['data']['health_recommendations']['general_population']

    pols = json_loaded['data']['pollutants']
    pols_dict = {}
    for item in pols:
        new_dict = {}
        new_dict['display_name'] = pols[item]['display_name']
        new_dict['full_name'] = pols[item]['full_name']
        new_dict['aqi'] = pols[item]['aqi_information']['baqi']['aqi']
        new_dict['color'] = pols[item]['aqi_information']['baqi']['color']
        new_dict['effects'] = pols[item]['sources_and_effects']['effects']
        new_dict['sources'] = pols[item]['sources_and_effects']['sources']
        pols_dict[item] = new_dict

    result = {}
    result['baqi'] = baqi
    result['health'] = health
    result['pollutants'] = pols_dict
    return result


def get_air_quality(lat, lon):
    api_url = 'https://api.breezometer.com/air-quality/v2/current-conditions?lat={}&lon={}&key=bf934542b3cd4f549443eb89128c6d38&features=breezometer_aqi,local_aqi,sources_and_effects,pollutants_aqi_information,health_recommendations'.format(
        str(lat), str(lon))
    path = os.path.join('cache', str(lat) + '-' + str(lon) + '.txt')
    if not os.path.exists(path):
        with open(path, 'w') as f:
            r = requests.get(api_url)
            f.write(r.text)

    with open(path, 'r') as f:
        return parse_json(json.load(f))


# parse_json(get_air_quality(48.857456, 2.354611))

# def map_output(lat, lon, radius):
#     min_lat = lat - radius
#     max_lat = lat + radius
#     min_lon = lat - radius
#     max_lon = lat + radius
# folium.folium.Map(location=[lat, lon])


# print(json.dumps(get_air_quality(50.857456, 2.354611), indent=2, sort_keys=True))
