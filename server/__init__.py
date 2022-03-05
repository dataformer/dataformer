__version__ = '0.1.0'

from flask import Flask, escape, request
from flask_restful import Api

def init_api(app):
    api = Api(app)

def create_app():
    app = Flask(__name__)

    init_api(app)

    @app.route("/status")
    def status():
        return {"status": "OK"}

    @app.route("/hello")
    def echo():
        name = request.args.get("name", "World")
        return f"Hello {escape(name)}!"
    
    return app