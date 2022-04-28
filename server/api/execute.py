import subprocess

from flask import request, make_response
from flask_restful import Resource


class ExecuteResource(Resource):
    def post(self, command):
        print()
        print("[DEBUG] Executing command:")
        print(command)
        print()
        command_output = subprocess.run(
            command, stdout=subprocess.PIPE, shell=True
        ).stdout.decode("utf-8")
        response = make_response(command_output, 200)
        response.mimetype = "text/plain"
        return response
