"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import datetime


api = Blueprint('api', __name__)


@api.route('/login', methods=['POST'])
def login():

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not (email and password):
        return jsonify({'message': 'Data not provided'}), 400

    # traer de mi base de datos un usuario por su email
    user = User.query.filter_by(email=email).one_or_none()

    if not user:
        return jsonify({'message': 'Email is not valid'}), 404

    # comprobar si la contraseña es correcta
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Your pass doesn"t match'}), 500

    token = create_access_token(identity=user.id)
    return jsonify({'token': token}), 200

@api.route('/signup', methods=["POST"])
def sign_Up():


    email = request.json.get('email', None)
    password = request.json.get('password', None)
    repeatpassword = request.json.get('repeatpassword', None)


    if not (email and password and repeatpassword):
        return jsonify({'message': 'Data not provided'}), 400

    passe = generate_password_hash(password)
    user = User(email=email, password=passe)

    try:

        db.session.add(user)
        userCreated = db.session.commit()
        token = create_access_token(identity=userCreated.id)
        return jsonify({'token': token}), 201


    except Exception as err:
        return jsonify({'message': str(err)}), 500


@api.route('/infouser', methods=['GET'])
@jwt_required()
def get_user_info():
   
    userId = get_jwt_identity()
    user = User.query.filter_by(id=userId)
   
    userInfo_serialized = []
    for x in user:
        userInfo_serialized.append(x.serialize())
    return jsonify({"user": userInfo_serialized}), 200