import subprocess

from flask import request, make_response
from flask_restful import Resource, abort
import random
import time
import os.path


class ExecuteResource(Resource):
    def post(self):
        python_script = request.form.get('script')

        print()
        print("[DEBUG] Executing Python script:")
        print(python_script)
        print()

        filename = str(time.time()).replace(".", "") \
            + str(random.randint(0, 10000000)) + ".py"

        if not os.path.exists(filename):
            with open(filename, 'w') as f:
                f.write(python_script)
        else:
            return abort(409)


        command_output = subprocess.run(
            f"python3 {filename}", stdout=subprocess.PIPE, shell=True
        ).stdout.decode("utf-8")
        os.remove(filename)
        response = make_response(command_output, 200)
        response.mimetype = "text/plain"
        return response
