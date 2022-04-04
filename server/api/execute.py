import subprocess

from flask import request, make_response
from flask_restful import Resource


class ExecuteResource(Resource):
    def post(self, command):
        output = subprocess.run(
            command.split(" "), stdout=subprocess.PIPE
        ).stdout.decode("utf-8")
        response = make_response(output, 200)
        response.mimetype = "text/plain"
        return response
