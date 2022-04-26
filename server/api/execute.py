import subprocess

from flask import request, make_response
from flask_restful import Resource


class ExecuteResource(Resource):
    def post(self, command):
        command_output = subprocess.run(
            command.split(" "), stdout=subprocess.PIPE
        ).stdout.decode("utf-8")
        output = "TODO: Execute \'" + command + "\' in backend correctly"
        output += "\nCurrent output: \'" + command_output + "\'"
        response = make_response(output, 200)
        response.mimetype = "text/plain"
        return response
