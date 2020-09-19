import pprint
import requests
from geopy.geocoders import Nominatim
from census import Census
import json
import re

# https://www.zipcodeapi.com/rest/<api_key>/radius.<format>/<zip_code>/<distance>/mi?minimal

census_codes = {
  "B01003_001E": "total_population",
  "B06011_001E" : "median_income",
  "B07002_001E" : "median_age",
  "B02001_003E": "race_total_black",
  "B02001_002E": "race_total_white",
  "B02001_004E": "race_total_native",
  "B02001_005E": "race_total_asian",
  "B02001_006E": "race_total_pacific_islander",
  # "B26106_002E" : "less_than_high_school",
  # "B26106_003E" : "high_school_graduate",
  # "B26106_004E" : "some_college_or_associates",
  # "B26106_005E" : "bachelors_or_higher"  
}

def main():
  pp = pprint.PrettyPrinter(indent=4)
  # zip_codes = addressToZipCodes("28449 W Harvest Glen Cir", "12")
  # print(zip_codes)
  #pp.print(zip_codes)

  # TODO make this an env variable. DO NOT PUSH CODE YET!!!!
  # c = Census("756543c3b2a18464d619945fafe8ef5a6db89267")
  # test = c.acs5.get(('NAME', 'B25034_010E'), {'for': 'state:{}'.format(states.MD.fips)})
  # print(test)
  zipcodes = addressToZipCodes("904 Ash CT Snohomish", "5")
  pp.pprint(aggregateAllData(zipcodes))

  # ans = getCensusDataDict("60039")
  # pp.pprint(ans)

# fetches all census data
def getCensusDataDict(zipcode):
  censusDict = {}
  for census_code, description in census_codes.items():
    censusDict[description] = getCensusData(zipcode, census_code)
  return censusDict


# communicates with census API
def getCensusData(zip_code, census_variable):
  url="https://api.census.gov/data/2017/acs/acs5?key="+census_api_key+"&get="+census_variable+"&for=zip%20code%20tabulation%20area:"+zip_code
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
def addressToZipCodes(input_address, radius):
    geolocator = Nominatim(user_agent="sucky_triangles")
    location = geolocator.geocode(input_address, exactly_one=True)
    zip_code_regex = re.compile(r"\s\b(\d{5})(?:-\d{4})?,")
    zip_code = zip_code_regex.findall(location.address)[0]
    print(zip_code)
    url = "https://www.zipcodeapi.com/rest/q9diw5gxk8r7YuGVrwfEmoyfcq0B1asM6Em3yzQs81Cv4EjTTrSToFD5ubo0Jg6V/radius.json/" + zip_code + "/" + radius + "/mile?minimal"
    payload = ""
    headers = {'content-type': 'application/json'}
    response = requests.request("GET", url, data=payload, headers=headers)
    response_dict = json.loads(response.text)
    print(response_dict)
    return response_dict['zip_codes']


def aggregateAllData(zip_codes):
  big_dict = {census_codes[censusCode]: 0 for censusCode in census_codes.keys()}
  total_counter = 0
  for zip_code in zip_codes:
    little_dict = getCensusDataDict(zip_code)
    if little_dict is not None:
      total_counter += 1
      for demographic, value in little_dict.items():
        big_dict[demographic] += 0 if value is None else int(float(value))

  big_dict["median_age"] /= total_counter
  big_dict["median_income"] /= total_counter
  big_dict["median_age"] = int(big_dict["median_age"])
  big_dict["median_income"] = int(big_dict["median_income"])

  return big_dict

if __name__ == "__main__":
  main()