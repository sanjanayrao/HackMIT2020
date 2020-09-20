import pprint
import requests
from geopy.geocoders import Nominatim
from census import Census
import json
import re
import os

# https://www.zipcodeapi.com/rest/<api_key>/radius.<format>/<zip_code>/<distance>/mi?minimal

census_codes = {
    "B01003_001E": "total_population",
    "B06011_001E": "median_income",
    "B07002_001E": "median_age",
    "B02001_003E": "race_total_black",
    "B02001_002E": "race_total_white",
    "B02001_004E": "race_total_native",
    "B02001_005E": "race_total_asian",
    "B02001_006E": "race_total_pacific_islander",
    "B03001_003E": "race_total_hispanic",
    "B15003_002E": "education_none",
    "B15003_017E": "education_highschool",
    "B15003_021E": "education_associate",
    "B15003_022E": "education_bachelor",
    "B15003_023E": "education_master",
    "B15003_025E": "education_doctorate"
}


def main():
    pp = pprint.PrettyPrinter(indent=2)
    # zip_codes = addressToZipCodes("1036 Heather LN Hartford Wisconsin", "5")
    zip_codes = zipCodeToZipCodes("02114", "1")
    pp.pprint(aggregateAllData(zip_codes))


# fetches all census data
def getCensusDataDict(zipcode):
    path = os.path.join('censusCache', 'a' + str(zipcode))
    if not os.path.exists(path):
        censusDict = {}
        for census_code, description in census_codes.items():
            censusDict[description] = getCensusData(zipcode, census_code)
        with open(path, 'w') as f:
            json.dump(censusDict, f)
        return censusDict
    
    with open(path, 'r') as f:
        result = json.load(f)
        return result

    # path = os.path.join('cache', str(lat) + '-' + str(lon) + '.txt')
    # if not os.path.exists(path):
    #     with open(path, 'w') as f:
    #         r = requests.get(api_url)
    #         f.write(r.text)

    # with open(path, 'r') as f:
    #     return parse_json(json.load(f))

# communicates with census API
def getCensusData(zip_code, census_variable):
    census_api_key = "756543c3b2a18464d619945fafe8ef5a6db89267"
    url = "https://api.census.gov/data/2017/acs/acs5?key="+census_api_key + \
        "&get="+census_variable+"&for=zip%20code%20tabulation%20area:"+zip_code
    payload = ""
    headers = {'content-type': 'application/json'}
    response = requests.request("GET", url, data=payload, headers=headers)
    if response.status_code == 200:
        response_dict = json.loads(response.text)
        total = response_dict[1][0]
        return total
    else:
        return None


# return a tuple of coordinates given an address
def addressToCoordinates(input_address):
    geolocator = Nominatim(user_agent="sucky_triangles")
    location = geolocator.geocode(input_address, exactly_one=True)
    return (location.latitude, location.longitude)


# return a list of zip codes given an address and a radius surrounding it
def zipCodeToZipCodes(zip_code, radius):
    path = os.path.join('censusCache', 'b' + str(zip_code) + '-' + str(radius))
    if not os.path.exists(path):
        # zip_code_api_key = "vCcE49wpZQzAbQaXsSoUFF13AFX1u9qdqj3DmQ98n9RGKVdleh0Uu85BX6FnlYdp"
        # zip_code_api_key = "Eg7UvM8pgDDE450RNlrPhbeQoP5eMUsMKSTbm6TYYyj5yYQnB9lCfQAN6PbNIN8p"
        zip_code_api_key = "08pr53EdfrdFXj3GPxomPnOPH8dtIf85EtdUyP2JB85jwh9xYoaMdedSkSD0xdEg"
        url = "https://www.zipcodeapi.com/rest/"+zip_code_api_key + \
            "/radius.json/" + zip_code + "/" + radius + "/mile?minimal"
        payload = ""
        headers = {'content-type': 'application/json'}
        response = requests.request("GET", url, data=payload, headers=headers)
        response_dict = json.loads(response.text)
        with open(path, 'w') as f:
            json.dump(response_dict, f)
        print(response_dict)
        return response_dict['zip_codes']

    with open(path, 'r') as f:
        result = json.load(f)
        print(result)
        return result['zip_codes']


# return a list of zip codes given an address and a radius surrounding it
def addressToZipCodes(input_address, radius):
    geolocator = Nominatim(user_agent="sucky_triangles")
    location = geolocator.geocode(input_address, exactly_one=True, countries=["USA"])
    zip_code_regex = re.compile(r"\s\b(\d{5})(?:-\d{4})?,")
    zip_code = zip_code_regex.findall(location.address)[0]
    return zipCodeToZipCodes(zip_code, radius)


def aggregateAllData(zip_codes):
    big_dict = {census_codes[censusCode]: 0 for censusCode in census_codes.keys()}
    total_counter = 0
    for zip_code in zip_codes:
        little_dict = getCensusDataDict(zip_code)
        if little_dict is not None:
            total_counter += 1
            for demographic, value in little_dict.items():
                # compute weighted average for these fields
                if demographic == "median_age" or demographic == "median_income":
                    big_dict[demographic] += 0 if(value is None or float(value) < 0.0) else int(
                    float(value) * float(little_dict["total_population"]))
                # sum the count of all other fields
                else:
                    big_dict[demographic] += 0 if (value is None or float(value) < 0.0) else int(
                    float(value))

    big_dict["median_age"] /= big_dict["total_population"]
    big_dict["median_income"] /= big_dict["total_population"]
    big_dict["median_age"] = int(big_dict["median_age"])
    big_dict["median_income"] = int(big_dict["median_income"])

    return big_dict


if __name__ == "__main__":
    main()
