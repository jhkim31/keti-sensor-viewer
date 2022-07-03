from flask_restx import Resource, Api
from flask_cors import CORS
from flask import Flask, request, jsonify, send_file

import json
import requests
import os
import pandas as pd

sensor_position = pd.read_csv('sensor_position.csv')
f = open('sensor_data.json', 'r')
json_data = json.load(f)
f.close()

app = Flask(__name__)
CORS(app)
@app.route('/get_image')
def get_image():
    root_path = './factory'
    factory = request.args.get("factory")
    floor = request.args.get("floor")
    image_path = f'{root_path}/{factory}/{floor}.png'
    if os.path.exists(image_path):
        return send_file(image_path, mimetype='image/png')
    else:
        return 0
    
    

@app.route('/test')
def test():
    param = request.args.get("id")
    print(param)
    return "hello world!"

@app.route('/map-list')
def get_map_list():
    factory = request.args.get("factory")
    return_data = {}
    return_data[factory] = {}
    return_data[factory]['map_list'] = ["red", "yellow", "orange", "blue", "green"]
    return_data[factory]['min_floor'] = 1
    return_data[factory]['max_floor'] = 5
    return jsonify(return_data)
@app.route('/all-sensor-data')
def get_all_sensor_data():
    res = requests.get('http://europa.energyiotlab.com:30101/v1/sensors')
    return res.text
    #return json.dumps(json_data, indent=4)

@app.route('/sensor-position-data')
def get_sensor_data():
    factory = request.args.get("factory")
    if request.args.get("floor") == None:
        data = sensor_position.loc[sensor_position['factory'] == factory]
    else:
        floor = int(request.args.get("floor"))
        data = sensor_position.loc[(sensor_position['factory'] == factory) & (sensor_position['floor'] == floor)]
    
    return_data = {}
    return_data['sensor_position'] = {}
    return_data['factory_info'] = {}
    for i in data.itertuples():
        return_data['sensor_position'][i[2]] = {'x' : i[3], 'y' : i[4], 'floor' : i[5]}

    with open(f'factory_info/{factory}.json', 'r') as f:
        json_data = json.load(f)
    return_data['factory_info'] = json_data
    return jsonify(return_data)

@app.route('/sensor-position', methods=['POST'])
def handle_post():
    global sensor_position
    params = json.loads(request.get_data(), encoding='utf-8')
    if len(params) == 0:
        return 'No parameter'
    factory = params['factory']
    sensor_id = params['sensor_id']
    x = params['x']
    y = params['y']
    floor = params['floor']

    sensor_position.loc[(sensor_position['sensor_id'] == sensor_id) & (sensor_position['factory'] == factory), 'x'] = x
    sensor_position.loc[(sensor_position['sensor_id'] == sensor_id) & (sensor_position['factory'] == factory), 'y'] = y
    sensor_position.loc[(sensor_position['sensor_id'] == sensor_id) & (sensor_position['factory'] == factory), 'floor'] = floor
    sensor_position.to_csv('sensor_position.csv', index=False)    
    
    data = sensor_position.loc[(sensor_position['factory'] == factory) & (sensor_position['floor'] == floor)]
    print(data)
    return_data = {}
    return_data['sensor_position'] = {}
    for i in data.itertuples():
        return_data['sensor_position'][i[2]] = {'x' : i[3], 'y' : i[4], 'floor' : i[5]}
    return jsonify(return_data)

@app.route('/add-floor', methods=['POST'])
def add_floor():
    params = json.loads(request.get_data(), encoding='utf-8')
    if len(params) == 0:
        return 'No parameter'
    factory = params['factory']  
    with open(f'factory_info/{factory}.json', 'r') as f:
        json_data = json.load(f)
    json_data['max_floor'] += 1
    with open(f'factory_info/{factory}.json', 'w') as f:
        json.dump(json_data, f, indent=4)
    return json_data

@app.route('/delete-floor', methods=['POST'])
def delete_floor():
    params = json.loads(request.get_data(), encoding='utf-8')
    if len(params) == 0:
        return 'No parameter'
    factory = params['factory']  
    with open(f'factory_info/{factory}.json', 'r') as f:
        json_data = json.load(f)
    json_data['max_floor'] -= 1
    with open(f'factory_info/{factory}.json', 'w') as f:
        json.dump(json_data, f, indent=4)
    return json_data
    
@app.route('/add_node_position', methods=['POST'])
def add_node():
    global sensor_position
    params = json.loads(request.get_data(), encoding='utf-8')
    if len(params) == 0:
        return 'No parameter'
    factory = params['factory']
    sensor_id = params['sensor_id']
    sensor_position = sensor_position.append({'factory':factory, 'sensor_id':sensor_id, 'x' : 0.1, 'y' : 0.1, 'floor':1}, ignore_index=True)
    sensor_position.to_csv('sensor_position.csv', index=False)
    return_data = {}
    return_data['sensor_position'] = {}
    data = sensor_position.loc[sensor_position['factory'] == factory]
    for i in data.itertuples():
        return_data['sensor_position'][i[2]] = {'x' : i[3], 'y' : i[4], 'floor' : i[5]}
    return return_data

@app.route('/delete_node_position', methods=['POST'])
def delete_node():
    global sensor_position
    params = json.loads(request.get_data(), encoding='utf-8')
    if len(params) == 0:
        return 'No parameter'
    factory = params['factory']
    sensor_id = params['sensor_id']
    data_index = sensor_position[(sensor_position['sensor_id'] == sensor_id) & (sensor_position['factory'] == factory)].index
    print(data_index)
    sensor_position = sensor_position.drop(data_index)
    sensor_position.to_csv('sensor_position.csv', index=False)
    return_data = {}
    return_data['sensor_position'] = {}
    data = sensor_position.loc[sensor_position['factory'] == factory]
    for i in data.itertuples():
        return_data['sensor_position'][i[2]] = {'x' : i[3], 'y' : i[4], 'floor' : i[5]}
    print(return_data)
    return return_data

@app.route('/uploader', methods=['POST'])
def file_upload():
    file = request.files['file']    
    factory, floor = file.filename.split(',')
    dir_path = f'./factory/{factory}'
    file_path = os.path.join(dir_path, f'{floor}.png')
    if not os.path.exists(dir_path):
        os.mkdir(dir_path)

    
    print(file_path)
    file.save(file_path)
    return 'OK'
app.run(host="0.0.0.0")

